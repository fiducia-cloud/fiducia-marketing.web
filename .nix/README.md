# .nix

Nix flake defining the reproducible development environment for the wider
Fiducia workspace.

- `flake.nix` — a `devShells.default` (`pkgs.mkShell`) bundling the Rust
  toolchain (rustc, cargo, clippy, rust-analyzer, bacon) plus Node/pnpm and
  build deps (pkg-config, openssl), for all Linux/macOS systems.
- `flake.lock` — pinned input revisions.

Entered via the repo-root `shell` script or automatically through direnv
(`.envrc` runs `use flake ./.nix`).
