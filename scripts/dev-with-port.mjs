import { spawn } from "node:child_process";

const rawPort = process.argv[2] ?? process.env.PORT ?? "3000";
const port = String(rawPort).trim();

if (!/^\d+$/.test(port)) {
  console.error(
    `Invalid port: ${JSON.stringify(port)}\n` +
      "Usage: npm run dev:port -- <port>\n" +
      "Example: npm run dev:port -- 3001"
  );
  process.exit(1);
}

const nextCmd = process.platform === "win32" ? "next.cmd" : "next";

const child = spawn(nextCmd, ["dev", "--port", port], {
  stdio: "inherit",
  env: process.env,
  shell: true,
});

child.on("exit", (code, signal) => {
  if (typeof code === "number") process.exit(code);
  console.error(`Dev server exited (${signal ?? "unknown"}).`);
  process.exit(1);
});
