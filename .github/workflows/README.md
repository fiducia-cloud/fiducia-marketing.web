# workflows

GitHub Actions CI definitions for the fiducia-ui site.

- `ci.yml` — runs on pushes to `main`, PRs, and manual dispatch. Checks out this
  repo alongside its sibling `file:../` dependencies (`fiducia-interfaces`,
  `fiducia-test-config`) at explicit full commit SHAs so `npm ci` resolves a
  repeatable dependency graph, then runs the Node contract tests and the Astro
  production build (the gating step). A separate `browser-e2e` job runs the
  Playwright/Puppeteer suite best-effort (`continue-on-error`) since it needs a
  real Chrome; it uses the same immutable sibling pins.
