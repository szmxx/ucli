import { App, Directive } from 'vue'
const modules = import.meta.glob('./*.ts', { eager: true })

interface IDirective {
  default: Directive
}
export default (app: App) => {
  for (const [path, module] of Object.entries(modules)) {
    const name = path.replace(/^.(.*\/)/, '').replace(/\.ts$/, '')
    app.directive(name, (module as IDirective)?.default)
  }
}
