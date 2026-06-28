import { spawnSync } from "node:child_process";

const result = spawnSync("npm", ["run", "build"], {
  cwd: process.cwd(),
  encoding: "utf8",
  shell: process.platform === "win32"
});

if (result.status !== 0) {
  console.error(result.stdout);
  console.error(result.stderr);
  process.exit(result.status ?? 1);
}

console.log("local smoke passed");

