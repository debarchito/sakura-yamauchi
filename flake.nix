{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    rust-overlay = {
      url = "github:oxalica/rust-overlay";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };
  outputs =
    inputs@{
      nixpkgs,
      flake-parts,
      rust-overlay,
      ...
    }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [
        "x86_64-linux"
        "x86_64-darwin"
        "aarch64-linux"
        "aarch64-darwin"
      ];
      perSystem =
        { system, ... }:
        let
          pkgs = import nixpkgs {
            inherit system;
            overlays = [ (import rust-overlay) ];
          };
          rustPlatform = pkgs.makeRustPlatform rec {
            cargo = pkgs.rust-bin.fromRustupToolchainFile ./rust-toolchain.toml;
            rustc = cargo;
          };
        in
        {
          packages = rec {
            sakura-yamauchi = rustPlatform.buildRustPackage {
              name = "sakura-yamauchi";
              version = "0.1.0";
              src = ./.;
              cargoLock.lockFile = ./Cargo.lock;
              nativeBuildInputs = [
                pkgs.bacon
                pkgs.mold
              ];
              RUSTFLAGS = "-Clink-arg=-fuse-ld=mold";
            };
            default = sakura-yamauchi;
          };
        };
    };
}
