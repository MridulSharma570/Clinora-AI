// Test-only loopback harness. This file is never imported by application runtime code.
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { resolve } from "node:path";

const root = process.cwd();
const nextBin = resolve(root, "node_modules/next/dist/bin/next");
const children = [];
const servers = [];
let providerRequestCount = 0;

const safeAnswer = `General educational information:
A short written outline can help organize an appointment discussion.

Uncertainty:
This information may be incomplete or incorrect and cannot account for individual circumstances.

Questions for a qualified clinician:
What changed and when? What should I bring or track before the visit?`;

function sendSse(response, content) {
  response.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-store" });
  response.write(`data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`);
  response.end("data: [DONE]\n\n");
}

const provider = createServer((request, response) => {
  if (request.method === "GET" && request.url === "/requests") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ count: providerRequestCount }));
    return;
  }

  if (request.method !== "POST" || request.url !== "/api/v1/chat/completions") {
    response.writeHead(404).end();
    return;
  }

  let body = "";
  request.on("data", (chunk) => { body += chunk; });
  request.on("end", () => {
    providerRequestCount += 1;
    if (body.includes("E2E_PROVIDER_FAILURE")) {
      response.writeHead(500, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ error: "synthetic test failure" }));
    } else if (body.includes("E2E_UNSAFE_OUTPUT")) {
      sendSse(response, "You have a synthetic test condition. Take 5 mg of a test medicine.");
    } else {
      sendSse(response, safeAnswer);
    }
  });
});

function listen(server, port) {
  return new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolveListen());
  });
}

const readiness = createServer((request, response) => {
  if (request.url === "/ready" && readiness.ready) {
    response.writeHead(200).end("ready");
  } else {
    response.writeHead(503).end("starting");
  }
});
readiness.ready = false;

function startApp(port, configured) {
  const env = { ...process.env, NODE_ENV: "production", NEXT_TELEMETRY_DISABLED: "1" };
  delete env.OPENROUTER_API_KEY;
  delete env.OPENROUTER_MODEL;
  delete env.OPENROUTER_BASE_URL;
  if (configured) {
    env.OPENROUTER_API_KEY = "E2E_NOT_A_REAL_KEY";
    env.OPENROUTER_MODEL = "e2e/current-free-model";
    env.OPENROUTER_BASE_URL = "http://127.0.0.1:3212/api/v1";
  }

  const child = spawn(process.execPath, [nextBin, "start", "-H", "127.0.0.1", "-p", String(port)], {
    cwd: root,
    env,
    stdio: ["ignore", "pipe", "pipe"],
  });
  child.stdout.on("data", (chunk) => process.stdout.write(`[app ${port}] ${chunk}`));
  child.stderr.on("data", (chunk) => process.stderr.write(`[app ${port}] ${chunk}`));
  child.once("exit", (code) => {
    if (!shuttingDown && code !== 0) {
      console.error(`Application ${port} exited with ${code}`);
      void shutdown(1);
    }
  });
  children.push(child);
}

async function waitForStatus(port, expected) {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/api/chat/status`);
      const body = await response.json();
      if (response.ok && body.configured === expected) return;
    } catch {
      // Startup retry only; no request content or credentials are logged.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 200));
  }
  throw new Error(`Application ${port} did not become ready`);
}

let shuttingDown = false;
async function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) child.kill("SIGTERM");
  for (const server of servers) server.close();
  setTimeout(() => process.exit(code), 100).unref();
}

process.on("SIGTERM", () => void shutdown());
process.on("SIGINT", () => void shutdown());
process.on("uncaughtException", (error) => {
  console.error(error instanceof Error ? error.message : "Test harness failure");
  void shutdown(1);
});

try {
  await listen(provider, 3212);
  await listen(readiness, 3213);
  servers.push(provider, readiness);
  startApp(3210, false);
  startApp(3211, true);
  await Promise.all([waitForStatus(3210, false), waitForStatus(3211, true)]);
  readiness.ready = true;
  console.log("E2E harness ready on app ports 3210/3211; provider fixture is loopback-only.");
} catch (error) {
  console.error(error instanceof Error ? error.message : "E2E startup failed");
  await shutdown(1);
}
