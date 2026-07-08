// Repo-local boot recipe for the marketing-site browser E2E.
//
// The genuinely-shared pieces (Chrome discovery + the server lifecycle) come
// from @fiducia/test-config; only the astro-specific boot arguments live here,
// next to the app they boot. Specs stay in this repo's tests/.
import { startServer } from "@fiducia/test-config/harness";

export { chromeExecutablePath, launchOptions } from "@fiducia/test-config/harness";

// Boots `astro preview` on an ephemeral port and waits until it answers.
//
// The marketing site is built with base `/fiducia` (astro.config.mjs:
// `base: process.env.PUBLIC_BASE ?? '/fiducia'`), so `astro preview` serves
// every page under `${url}/fiducia/` — hence the `/fiducia/` readyPath and why
// all page.goto targets in the specs carry the `/fiducia/` prefix. astro/vite
// preview take their port via `--port` (not $PORT), so we inject it via portArgs.
// Set FIDUCIA_SITE_TEST_URL to run the suite against an already-running site.
export function startSite() {
  return startServer({
    command: "npm",
    args: ["run", "preview", "--"],
    cwd: new URL("..", import.meta.url).pathname,
    portArgs: (p) => ["--port", String(p), "--host", "127.0.0.1"],
    readyPath: "/fiducia/",
    reuseUrlEnv: "FIDUCIA_SITE_TEST_URL",
    startupTimeoutMs: 45000,
  });
}
