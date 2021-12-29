// https://vitejs.dev/config/#build-polyfillmodulepreload
// using workaround https://github.com/vitejs/vite/issues/4786
if (import.meta.env.MODE !== 'development') {
  import('vite/modulepreload-polyfill')
}

import '@src/styles/main.sass'
import '@src/styles/tailwind.css'

// import { jQuery } from 'jquery'
// console.log(jQuery)
// import * as jQuery from 'jquery/dist/jquery'
  // console.log(jQuery)
// window.$ = window.jQuery = jQuery.default
// var aaa =123