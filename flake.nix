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
        "aarch64-linux"
      ];
      perSystem =
        { system, ... }:
        let
          inherit (nixpkgs) lib;
          pkgs = import nixpkgs {
            inherit system;
            overlays = [ (import rust-overlay) ];
          };
          rustPlatform = pkgs.makeRustPlatform rec {
            cargo = pkgs.rust-bin.fromRustupToolchainFile ./rust-toolchain.toml;
            rustc = cargo;
          };
          forLinux = list: lib.optionals (lib.strings.hasInfix "linux" system) list;
        in
        {
          packages = rec {
            sakuya = rustPlatform.buildRustPackage rec {
              name = "sakuya";
              version = "0.1.0";
              src = ./.;
              cargoLock.lockFile = ./Cargo.lock;
              nativeBuildInputs = [
                pkgs.bacon
                pkgs.mold
                pkgs.nix-output-monitor
                pkgs.pkg-config
              ];
              xorgBuildInputs = [
                pkgs.xorg.libX11
                pkgs.xorg.libXcursor
                pkgs.xorg.libXi
              ];
              waylandBuildInputs = [
                pkgs.libxkbcommon
                pkgs.wayland
              ];
              buildInputs =
                forLinux [
                  pkgs.alsa-lib
                  pkgs.udev
                  pkgs.vulkan-loader
                ]
                ++ forLinux xorgBuildInputs
                ++ forLinux waylandBuildInputs;
              LD_LIBRARY_PATH = lib.makeLibraryPath buildInputs;
              RUSTFLAGS = "-Clink-arg=-fuse-ld=mold";
            };
            default = sakuya;
          };
        };
    };
}
