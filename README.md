<!-- BEGIN k8s-cluster-submodule-notice -->
> [!NOTE]
> **Canonical source.** This repository is the source of truth for its code. It
> is also vendored as a **secondary** git submodule of
> [ORESoftware/k8s-cluster](https://github.com/ORESoftware/k8s-cluster) at
> `remote/deployments/fiducia-ui.web` — make changes here, not in that submodule checkout.
>
> On disk: source clone `~/codes/fiducia.cloud/fiducia-ui.web` · submodule checkout `~/codes/ores/k8s-cluster/remote/deployments/fiducia-ui.web`.
<!-- END k8s-cluster-submodule-notice -->

# fiducia-ui

The [Astro](https://astro.build) front-end for **fiducia.cloud** — the marketing
homepage for Raft-based consensus & coordination as a service.

- Purple + navy theme, fully static output.
- Built behind a gateway path prefix, so `base` is `/fiducia` (override with
  `PUBLIC_BASE=/` to serve at a domain root).

## Develop

```bash
npm install
npm run dev        # http://localhost:4321/fiducia/
npm run build      # -> dist/
npm run sync       # build + copy dist/ into ../fiducia-backend.rs/static/
```

The Rust backend (`../fiducia-backend.rs`) serves the built site. After changing
anything here, run `npm run sync` and commit the regenerated `static/` in the
backend repo.
