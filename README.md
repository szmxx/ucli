# ✨ ucli
A unified scaffold tool

[![npm version][version]][npm]
[![npm downloads][downloads]][npm]
[![Github Actions][build]](https://github.com/szmxx/ucli/actions/workflows/build.yml)

- [Nuxt3 Template][Nuxt3] \
Optional support for themes and internationalization
- [Vue3 Vite Template][Vue3] \
Optional support for themes and internationalization
- [Node Template][Node] \
Koa frame，JWT etc
- Automatically \
Automatically install dependencies, initialize git, and create remote warehouses

🚧 This project is under development. More features are coming soon!

## Installation

```bash
npm install -g @szmxx/ucli
# or
pnpm add -g @szmxx/ucli
# or
yarn global add @szmxx/ucli
```

### Shell Completions (Optional)

For better command-line experience, you can install shell completions:

```bash
# Clone the repository or download completion scripts
git clone https://github.com/szmxx/ucli.git
cd ucli

# Install completions
./completions/install.sh

# Restart your shell or reload configuration
source ~/.bashrc  # for bash
source ~/.zshrc   # for zsh
```

After installation, you can use TAB to auto-complete ucli commands:
```bash
ucli <TAB>        # Shows: create --help --version
ucli create <TAB> # Shows: --help
```

## Usage

Add authentication information
```bash
git config --global ucli.auth <github_auth>
```

Create a new project
```bash
# create
ucli create <project-name>
# cd project
cd <project-name>
# start project
pnpm dev
```

## License
Made with 💛 \
Published under [MIT License](./LICENSE).


<!-- Badges -->
[Nuxt3]: https://github.com/szmxx/template-nuxt3
[Vue3]: https://github.com/szmxx/template-vite
[Node]: https://github.com/szmxx/template-node
[version]: https://img.shields.io/npm/v/%40szmxx/ucli
[downloads]: https://img.shields.io/npm/dm/%40szmxx/ucli
[npm]: https://npmjs.com/package/@szmxx/ucli
[build]: https://github.com/szmxx/ucli/actions/workflows/build.yml/badge.svg
