/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { createApp, h, ref, watchEffect } from 'vue'
import KUI from '@ksware/ksw-ux'
import '@ksware/ksw-ux/kingsware-ui/style.css'
import { type OutputModes, Repl, useStore, useVueImportMap } from '../src'
// @ts-ignore
import MonacoEditor from '../src/editor/MonacoEditor.vue'
// @ts-ignore
import CodeMirrorEditor from '../src/editor/CodeMirrorEditor.vue'

const window = globalThis.window as any
window.process = { env: {} }

const App = {
  setup() {
    const query = new URLSearchParams(location.search)
    const { importMap: builtinImportMap, vueVersion } = useVueImportMap({
      runtimeDev: import.meta.env.PROD
        ? undefined
        : `${location.origin}/src/vue-dev-proxy`,
      serverRenderer: import.meta.env.PROD
        ? undefined
        : `${location.origin}/src/vue-server-renderer-dev-proxy`,
    })
    const store = (window.store = useStore(
      {
        builtinImportMap,
        vueVersion,
        showOutput: ref(query.has('so')),
        outputMode: ref((query.get('om') as OutputModes) || 'preview'),
      },
      location.hash,
    ))

    watchEffect(() => history.replaceState({}, '', store.serialize()))

    const theme = ref<'light' | 'dark'>('light')
    window.theme = theme
    const previewTheme = ref(false)
    window.previewTheme = previewTheme

    return () =>
      h(Repl, {
        store,
        theme: theme.value,
        previewTheme: previewTheme.value,
        editor: MonacoEditor,
        showOpenSourceMap: true,
        // layout: 'vertical',
        ssr: true,
        showSsrOutput: true,
        sfcOptions: {
          script: {
            // inlineTemplate: false
          },
        },
        // showCompileOutput: false,
        // showImportMap: false
        editorOptions: {
          autoSaveText: '💾',
          monacoOptions: {
            // wordWrap: 'on',
          },
        },
        // autoSave: false,
      })
  },
}

createApp(App).use(KUI).mount('#app')
