// 新增物件原型 replaceAll 方法 (支援舊手機)
if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function(str, newStr){

      function escapeRegExp(string) {
          return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      }

      return this.replace(new RegExp(escapeRegExp(str), 'g'), newStr)
  }
}

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