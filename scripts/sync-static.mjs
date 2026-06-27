import { cp, mkdir, rm, stat } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, "..");
const workspaceRoot = resolve(projectRoot, "..");
const source = resolve(projectRoot, "dist");
const target = resolve(workspaceRoot, "fiducia-backend.rs", "static");
const expectedTarget = resolve(workspaceRoot, "fiducia-backend.rs", "static");

if (target !== expectedTarget) {
  throw new Error(`Refusing to sync to unexpected target: ${target}`);
}

const targetRelative = relative(workspaceRoot, target);
if (targetRelative.startsWith("..") || targetRelative === "" || targetRelative.includes("..")) {
  throw new Error(`Refusing to sync outside the workspace: ${target}`);
}

const sourceStat = await stat(source).catch(() => null);
if (!sourceStat?.isDirectory()) {
  throw new Error(`Build output is missing; run npm run build first: ${source}`);
}

await mkdir(resolve(workspaceRoot, "fiducia-backend.rs"), { recursive: true });
await rm(target, { recursive: true, force: true });
await cp(source, target, { recursive: true });

console.log(`Synced ${source} -> ${target}`);
