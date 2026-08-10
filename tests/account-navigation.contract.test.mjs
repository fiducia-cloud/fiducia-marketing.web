import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const layoutSource = await readFile(
  new URL("../src/layouts/Layout.astro", import.meta.url),
  "utf8",
);

test("every marketing page exposes the Fiducia customer account destinations", () => {
  assert.match(layoutSource, /const appOrigin = 'https:\/\/app\.fiducia\.cloud';/);
  assert.match(layoutSource, /href: `\$\{appOrigin\}\/login`/);
  assert.match(layoutSource, /href: `\$\{appOrigin\}\/app\/signup`/);
  assert.match(layoutSource, /href: `\$\{appOrigin\}\/app\/dashboard`/);
  assert.match(layoutSource, /<header class="account-bar">/);
  assert.match(
    layoutSource,
    /class="account-bar__actions" role="navigation" aria-label="Account"/,
  );

  for (const action of ["login", "signup", "dashboard"]) {
    assert.match(layoutSource, new RegExp(`action: '${action}'`));
  }
});

test("the account bar does not replace the page's primary nav landmark", () => {
  assert.doesNotMatch(layoutSource, /<nav class="account-bar"/);
  assert.match(layoutSource, /:global\(\.nav\) \{\s*top: var\(--fiducia-account-bar-height\);/);
});

test("the static Fiducia shell never embeds authentication secrets", () => {
  assert.doesNotMatch(layoutSource, /SUPABASE_(?:SECRET|SERVICE_ROLE|ANON|PUBLISHABLE)_KEY/);
  assert.doesNotMatch(layoutSource, /AUTH_BROWSER_.*SECRET/);
  assert.doesNotMatch(layoutSource, /Bearer\s+[A-Za-z0-9._~-]+/);
});
