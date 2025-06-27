import KUI from '@ksware/ksw-ux'
import { getCurrentInstance } from 'vue'

let installed = false
await loadStyle()

export function setupElementPlus() {
  if (installed) return
  const instance = getCurrentInstance()
  instance.appContext.app.use(KUI)
  installed = true
}

export function loadStyle() {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href =
    'https://github.com/xiyure/ksw-ux-run/blob/main/releases/style.css'
  // link.addEventListener('load', resolve)
  // link.addEventListener('error', reject)
  document.body.append(link)
}
