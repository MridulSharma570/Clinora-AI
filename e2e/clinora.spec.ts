import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const configuredBase = "http://127.0.0.1:3211";
const providerRequests = "http://127.0.0.1:3212/requests";
const consent = { accepted: true, adult: true, acceptedAt: "2026-10-24T12:00:00.000Z" };

async function grantConsent(page: Page) {
  await page.addInitScript((value) => {
    if ((location.protocol === "http:" || location.protocol === "https:") && !sessionStorage.getItem("e2eConsentSeeded")) {
      localStorage.setItem("clinora.consent.v1", JSON.stringify(value));
      sessionStorage.setItem("e2eConsentSeeded", "true");
    }
  }, consent);
}

async function completeGuidedCheck(page: Page) {
  await page.goto("/check/concern");
  await page.getByLabel("Main concern in your own words").fill("A mild change in my daily routine that I want to discuss");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page).toHaveURL(/\/check\/body-area/);
  await page.getByLabel("Sleep, energy, or daily wellbeing").check();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("When did you first notice it?").fill("About two weeks ago");
  await page.getByLabel("Coming and going").check();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel(/Mild — noticeable/).check();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("textbox", { name: /Optional context/ }).fill("It seems more noticeable on busy days.");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel(/What are you worried about or hoping to ask/).fill("What details should I track before the visit?");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page).toHaveURL(/\/check\/review/);
  await expect(page.getByText("A mild change in my daily routine that I want to discuss").first()).toBeVisible();
  await page.getByRole("button", { name: /Create question list/ }).click();
  await expect(page).toHaveURL(/\/summary/);
  await expect(page.getByRole("heading", { name: "A clearer conversation starts here." })).toBeVisible();
}

async function providerCount(request: import("@playwright/test").APIRequestContext): Promise<number> {
  const response = await request.get(providerRequests);
  const body = await response.json() as { count: number };
  return body.count;
}

test.beforeEach(async ({ page }) => {
  await grantConsent(page);
});

test("Check and Ask AI cannot be accessed before adult consent", async ({ browser }) => {
  const context = await browser.newContext({ baseURL: "http://127.0.0.1:3210" });
  const page = await context.newPage();
  for (const route of ["/check", "/assistant"]) {
    await page.goto(`http://127.0.0.1:3210${route}`);
    await expect(page).toHaveURL(/\/consent\?next=/);
    await expect(page.getByRole("heading", { name: "A clear boundary for your care." })).toBeVisible();
  }
  await context.close();
});

test("under-18 selection stops health-check and AI-chat flows", async ({ browser }) => {
  const context = await browser.newContext({ baseURL: "http://127.0.0.1:3210" });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3210/consent");
  await page.getByLabel("I am under 18").check();
  await page.getByRole("button", { name: "Confirm age response" }).click();
  await expect(page.getByRole("heading", { name: "Health details are paused." })).toBeVisible();
  await page.goto("http://127.0.0.1:3210/check/concern");
  await expect(page.getByRole("heading", { name: "Please involve a parent or guardian." })).toBeVisible();
  await expect(page.getByLabel("Main concern in your own words")).toHaveCount(0);
  await context.close();
});

test("a safe Guided Check creates a local Clinician Question List without diagnostic results", async ({ page }) => {
  await completeGuidedCheck(page);
  await expect(page.getByText("Clinician Question List", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("What changed and when, and which parts of my timeline are most useful to review?")).toBeVisible();
  await expect(page.getByText(/likely diagnosis|your chance is|\d+% risk|you have a confirmed condition/i)).toHaveCount(0);
  await expect(page.getByText("Generated locally without AI. Printing uses your browser; saving history happens only when you press Save.")).toBeVisible();
});

test("emergency wording routes directly to emergency and never calls chat or OpenRouter", async ({ page, request }) => {
  const before = await providerCount(request);
  let chatApiCalls = 0;
  page.on("request", (outgoing) => {
    if (outgoing.method() === "POST" && outgoing.url().endsWith("/api/chat")) chatApiCalls += 1;
  });

  await page.goto(`${configuredBase}/assistant`);
  await expect(page.getByText("Educational chat configured")).toBeVisible();
  await page.getByLabel("Your educational question").fill("I have severe chest pain");
  await page.getByRole("button", { name: "Send educational question" }).click();
  await expect(page).toHaveURL(/\/emergency/);
  await expect(page.getByRole("heading", { name: /If you may be experiencing an emergency/ })).toBeVisible();
  expect(chatApiCalls).toBe(0);

  const response = await request.post(`${configuredBase}/api/chat`, {
    data: { message: "I want to kill myself", consentConfirmed: true, adultConfirmed: true },
  });
  expect(response.status()).toBe(422);
  expect(await response.json()).toMatchObject({ kind: "emergency", redirect: "/emergency" });
  expect(await providerCount(request)).toBe(before);
});

test("chat is disabled when OpenRouter configuration is absent", async ({ page }) => {
  await page.goto("/assistant");
  await expect(page.getByText("AI chat is currently unavailable.")).toBeVisible();
  await expect(page.getByLabel("Your educational question")).toBeDisabled();
  await expect(page.getByRole("button", { name: "Send educational question" })).toBeDisabled();
  await expect(page.getByRole("link", { name: "Use Guided Check" })).toBeVisible();
});

test("unsafe model content is discarded and blocked in the browser", async ({ page }) => {
  await page.goto(`${configuredBase}/assistant`);
  await expect(page.getByText("Educational chat configured")).toBeVisible();
  await page.getByLabel("Your educational question").fill("E2E_UNSAFE_OUTPUT");
  await page.getByRole("button", { name: "Send educational question" }).click();
  await expect(page.getByText("I can help you prepare questions for a qualified clinician, but I cannot diagnose, recommend treatment, or provide medication instructions.")).toBeVisible();
  await expect(page.getByText(/You have a synthetic test condition|Take 5 mg/)).toHaveCount(0);
  await expect(page.getByText("Safety boundary · not AI-generated")).toBeVisible();
});

test("safe configured chat streams validated education and verified local resources", async ({ page }) => {
  await page.goto(`${configuredBase}/assistant`);
  await page.getByLabel("Your educational question").fill("E2E_SAFE_OUTPUT How can I prepare for an appointment?");
  await page.getByRole("button", { name: "Send educational question" }).click();
  await expect(page.getByText(/A short written outline can help organize an appointment discussion/)).toBeVisible();
  await expect(page.getByText("Related resources supplied to Clinora AI")).toBeVisible();
  await expect(page.getByText(/External references only. They do not medically validate/)).toBeVisible();
});

test("PII requires editing and does not reach the provider", async ({ page, request }) => {
  const before = await providerCount(request);
  await page.goto(`${configuredBase}/assistant`);
  await page.getByLabel("Your educational question").fill("Email me at person@example.com");
  await page.getByRole("button", { name: "Send educational question" }).click();
  await expect(page.getByText(/Please edit your message to remove an email address/)).toBeVisible();
  await expect(page.getByLabel("Your educational question")).toHaveValue("Email me at person@example.com");
  expect(await providerCount(request)).toBe(before);
});

test("a user can explicitly save and remove local history", async ({ page }) => {
  await completeGuidedCheck(page);
  await page.getByRole("button", { name: "Save to this device" }).click();
  await expect(page.getByRole("button", { name: "Saved locally" })).toBeDisabled();
  await page.goto("/history");
  await expect(page.getByRole("heading", { name: /Visit prep: A mild change/ })).toBeVisible();
  await page.getByRole("button", { name: /Delete saved summary: Visit prep:/ }).click();
  await expect(page.getByRole("heading", { name: "No saved summaries yet" })).toBeVisible();
});

test("Delete All clears local history, consent, and settings", async ({ page }) => {
  await completeGuidedCheck(page);
  await page.getByRole("button", { name: "Save to this device" }).click();
  await page.goto("/settings");
  await page.getByRole("button", { name: "Light" }).click();
  await page.getByLabel("Enable high-contrast mode").check();
  await page.getByLabel(/Emergency call number/).fill("911");
  await page.getByRole("button", { name: "Delete All Local Data" }).click();
  await page.getByRole("button", { name: "Yes, delete all local data" }).click();
  await expect(page.getByText(/Local history, consent, settings, and available Clinora cache data were deleted/)).toBeVisible();

  const storage = await page.evaluate(() => ({
    consent: localStorage.getItem("clinora.consent.v1"),
    settings: localStorage.getItem("clinora.settings.v1"),
    theme: document.documentElement.dataset.theme,
    contrast: document.documentElement.dataset.contrast,
  }));
  expect(storage).toEqual({ consent: null, settings: null, theme: "dark", contrast: "standard" });
  await page.goto("/history");
  await expect(page.getByRole("heading", { name: "No saved summaries yet" })).toBeVisible();
  await page.goto("/check");
  await expect(page).toHaveURL(/\/consent\?next=/);
});

test("bottom navigation works on mobile and More exposes all required links", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(navigation).toBeVisible();
  await navigation.getByRole("link", { name: "Ask AI" }).click();
  await expect(page).toHaveURL(/\/assistant/);
  await navigation.getByRole("link", { name: "More" }).click();
  await expect(page).toHaveURL(/\/more/);
  for (const name of ["Learn", "Emergency", "Settings", "About", "Legal"]) {
    await expect(page.getByRole("link", { name: `Open ${name}` })).toBeVisible();
  }
  const position = await navigation.evaluate((element) => getComputedStyle(element).position);
  expect(position).toBe("fixed");
});

test("high-contrast mode disables glass transparency and blur", async ({ page }) => {
  await page.goto("/settings");
  await page.getByLabel("Enable high-contrast mode").check();
  await expect(page.locator("html")).toHaveAttribute("data-contrast", "high");
  const styles = await page.getByTestId("bottom-navigation").evaluate((element) => {
    const computed = getComputedStyle(element);
    return { filter: computed.backdropFilter, background: computed.backgroundColor, image: computed.backgroundImage };
  });
  expect(styles.filter).toBe("none");
  expect(styles.image).toBe("none");
  expect(styles.background).not.toBe("rgba(0, 0, 0, 0)");
});

test("all legal pages are reachable", async ({ page }) => {
  const routes = ["terms", "privacy", "disclaimer", "medical-safety", "copyright", "licenses", "security", "ai-transparency", "data-governance"];
  await page.goto("/legal");
  await expect(page.getByRole("heading", { name: "Legal, privacy & safety." })).toBeVisible();
  for (const route of routes) {
    await page.goto(`/legal/${route}`);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByText("Student-project template", { exact: true })).toBeVisible();
    await expect(page.getByText("Not legal advice.", { exact: false }).first()).toBeVisible();
  }
});

test("bottom navigation is keyboard operable with visible focus", async ({ page }) => {
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Primary navigation" });
  const home = navigation.getByRole("link", { name: "Home" });
  const check = navigation.getByRole("link", { name: "Check", exact: true });
  await home.focus();
  await expect(home).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(check).toBeFocused();
  const outline = await check.evaluate((element) => getComputedStyle(element).outlineStyle);
  expect(outline).not.toBe("none");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/check$/);
  await expect(page.getByRole("heading", { name: "Make space for what you want to say." })).toBeVisible();
});
