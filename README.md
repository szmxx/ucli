# ✨ ucli
A unified scaffold tool

- [Nuxt3 Template][nuxt3] \
Optional support for themes and internationalization
- [Vite Template][vite] \
Optional support for themes and internationalization
- Node Template
- Automatically \
Automatically install dependencies, initialize git, and create remote warehouses

🚧 This project is under development. More features are coming soon!

## Usage
Install package:
```bash
# npm
npm install -g @szmxx/ucli

# yarn
yarn add -g @szmxx/ucli

# pnpm
pnpm install -g @szmxx/ucli
```

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
[nuxt3]: https://github.com/szmxx/template-nuxt3
[vite]: https://github.com/szmxx/template-vite
