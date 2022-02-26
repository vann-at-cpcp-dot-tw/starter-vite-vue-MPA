import { defineAsyncComponent } from "vue"

// 以 file system 自動引入
const componentModules = import.meta.glob('./**/*.vue')
const components = {}


for (const path in componentModules) {

    let componentName = path.replaceAll('./', '').replaceAll('.vue', '').replaceAll('/', '')

    components[componentName] = defineAsyncComponent({
        loader: componentModules[/* @vite-ignore */ `${path}`]
    })
}


export default components
