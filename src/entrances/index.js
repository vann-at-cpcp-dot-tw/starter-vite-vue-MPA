import { createApp, watch, nextTick } from 'vue'
import store from '@src/store/index'
import { router, useRoute } from '@src/routes'
import { VueQueryPlugin } from 'vue-query'
import { useQuery } from 'vue-query'
import components from '@src/components'
import * as helpers from '@src/helpers'

// 可以用 file system 自動引入，但由於資料夾巢狀，客製各 components 的名稱很麻煩，故還是手動作登錄表
// const componentModules = import.meta.glob('../components/**/*.vue')
// const components = {}

// for (const path in componentModules) {
//   const name = path.split('/').pop().replace(/\.\w+$/, '')

//   components[name] = defineAsyncComponent({
//     loader: componentModules[/* @vite-ignore */ `${path}`]
//   })
// }

const app = createApp({
  setup(){

    const route = useRoute()

    watch(()=>{ return {...route} }, (newVal)=>{
      nextTick(()=>{
        window.scrollTo(0, 0)
      })
    })

    switch (process.env.NODE_ENV){
      case 'development':
        window.store = store
        window.route = route
        window.router = router
        break

      case 'production':
        break
    }

  }
})

app.mixin({
  data(){
    return {
      window,
    }
  },
  components,
  methods: helpers
})

app.use(store)
app.use(router)
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
})

app.directive('focus', {
  mounted(el, isFocus) {
    if( isFocus.value !== false ){
        el.focus()
    }
  }
})

const VM = app.mount('#app')
