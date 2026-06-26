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
