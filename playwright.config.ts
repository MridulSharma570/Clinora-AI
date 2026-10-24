import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { chromium as playwrightChromium, defineConfig } from "@playwright/test";
import npmChromium, { inflate, setupLambdaEnvironment } from "@sparticuz/chromium";

const standardBrowserExists = existsSync(playwrightChromium.executablePath());
const fallbackExecutable = standardBrowserExists ? null : await npmChromium.executablePath();
if (fallbackExecutable) {
  await inflate(resolve("node_modules/@sparticuz/chromium/bin/al2023.tar.br"));
  setupLambdaEnvironment(join(tmpdir(), "al2023", "lib"));
}

export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.spec.ts",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 45_000,
  expect: { timeout: 8_000 },
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3210",
    browserName: "chromium",
    headless: true,
    viewport: { width: 1280, height: 900 },
    launchOptions: fallbackExecutable
      ? { executablePath: fallbackExecutable, args: ["--no-sandbox", "--disable-dev-shm-usage"] }
      : {},
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run build && node e2e/server-harness.mjs",
    url: "http://127.0.0.1:3213/ready",
    timeout: 180_000,
    reuseExistingServer: false,
    stdout: "pipe",
    stderr: "pipe",
  },
});
