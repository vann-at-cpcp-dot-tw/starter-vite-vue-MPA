// View your website at your own local server
// for example http://vite-php-setup.test

// http://localhost:3000 is serving Vite on development
// but accessing it directly will be empty
// TIP: consider changing the port for each project, see below

// IMPORTANT image urls in CSS works fine
// BUT you need to create a symlink on dev server to map this folder during dev:
// ln -s {path_to_vite}/src/assets {path_to_public_html}/assets
// on production everything will work just fine


/** 關於資源引用
 *
 * 正確的作法1:
 * <img src="assets/img/logo.png"/>
 * <img src="/assets/img/logo.png"/>
 * <img src="@src/assets/img/logo.png"/>
 * 會將 src/... 內的資源，打包至 public/dist/... 並產生 hash，建議統一用 / 開頭
 * 以上規則亦適用 css 的 background-image: url()
 *
 * 正確的作法2:
 * <img :src="publicUrl('/assets/img/logo.png')"/>
 * 會將 src 視為純 URL 處理，不會觸發打包，為正確引用 public 資源的作法，return 的網址格式為 `${PUBLIC_URL}/assets/img/logo.png`
 * 在 sass 裡面欲使用不觸發打包的 public 資源，範例：background-image: url($PUBLIC_URL+'/assets/img/avatar.svg')
 *
 * 不正確的作法：
 * <img src="@public/assets/img/logo.png"/>
 * 會將 public/... 資料夾內的資源，打包到 public/dist/... 並產生 hash，應強烈避免此種作法，因為會產生兩個重複檔案
 */

/** 關於動態引入
 *  import.meta.glob 目前不支援 alias，只能用相對路徑或 / 開頭（路徑將以 src 為 root）
 *  import() 在 dev 時不支援 alias，只能用相對路徑或 / 開頭（路徑將以 src 為 root）
 */
import { defineConfig, loadEnv } from 'vite' //vite 預設會從根目錄載入.env，因此如果有改變 root，則需手動引入 .env
import vue from '@vitejs/plugin-vue'
import liveReload from 'vite-plugin-live-reload'
import path from 'path'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig(({mode}) => {

  const ENV = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      VITE_PUBLIC_URL: `"${ENV.PUBLIC_URL}"`
    },
    plugins: [
      vue(),
      liveReload([
          __dirname + '/resources/views/*.blade.php',
      ]),
      vueJsx({
          enableObjectSlots: true,
           // options are passed on to @vue/babel-plugin-jsx
      }),
      // legacy({
      //   targets: ['defaults', 'not IE 11']

      //   // 如果要支援 ie11
      //   // targets: ['ie >= 11'],
      //   // additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      // })
    ],

    root: 'src', //開發模式時，服務起在 src 資料夾，所以 base 為 '/'
    base: (mode === 'development' ? '/': '/dist/'),
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `$PUBLIC_URL: "${ENV.PUBLIC_URL}" \n`
        }
      }
    },
    optimizeDeps: {
      exclude: ['jquery']
    },
    build: {
      // output dir for production build
      outDir: path.resolve(__dirname, './public/dist'),
      emptyOutDir: true,

      // emit manifest so PHP can find the hashed files
      manifest: true,

      // cssCodeSplit 可以把 CSS 檔案合併成一隻，但目前有 bug，不會進 manifest.json
      // https://github.com/vitejs/vite/issues/2375
      // cssCodeSplit: false,

      // our entry
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, './src/main.js'),
          index: path.resolve(__dirname, './src/entrances/index.js'),
        },
        output: {
          assetFileNames: "assets/[name]-[hash].[ext]",
          chunkFileNames: "chunks/[name]-[hash].js",
          entryFileNames: "entrances/[name]-[hash].js"
        },
        plugins: [

        ]
      },
      target: 'es2015'
    },

    server: {
      // required to load scripts from custom host
      cors: true,

      // we need a strict port to match on PHP side
      // change freely, but update on PHP to match the same port
      strictPort: true,
      port: 3000,
    },

    // required for in-browser template compilation
    // https://v3.vuejs.org/guide/installation.html#with-a-bundler
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm-bundler.js',
        '@src': path.resolve(__dirname, './src'),
        '@public': path.resolve(__dirname, './public'),
      }
    }
  }
})
