## 1. Build

Install the [mold](https://github.com/rui314/mold) linker and make sure it's
available through `PATH`. In case you don't want to use _mold_, update
[.cargo/config.toml](/.cargo/config.toml) and the `RUSTFLAGS` environment
variable in [flake.nix](/flake.nix) accordingly.

```sh
nix build
# or
cargo build --release
```

## 2. Development

The preferred way to develop _sakuya_ is through [Nix](https://nixos.org)
development shells or devshells. An [.envrc](/.envrc) exists for use with
[direnv](https://direnv.net).

```sh
# scaffold the devshell
direnv allow

# use bacon as file-watcher
bacon
```

## 3. Licensing

The game is licensed under [zlib](/LICENSE) License.
