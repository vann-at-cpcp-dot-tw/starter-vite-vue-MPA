<script lang="jsx">
import { onBeforeMount, onMounted, onBeforeUnmount, ref, reactive, computed, watch, nextTick, defineAsyncComponent, defineComponent, } from 'vue'
import useViewport from '@src/use/useViewport'
import useResolveAssets from '@src/use/useResolveAssets'
import { useStore } from 'vuex'
import { router, useRoute } from '@src/routes'
import { isEmpty, publicUrl } from '@src/helpers'

export default defineComponent({
    props: {},
    setup(props, {emit}) {
        const route = useRoute()
        const viewport = useViewport()
        const store = useStore()
        const state = reactive({})
        const srcAssets = useResolveAssets([
            '/assets/img/logo.png'
        ])

        return () => (<LayoutGeneral>
            <Lightbox id="helloLightbox">
                <LightboxClose />
                <div>Hello Lightbox</div>
            </Lightbox>
            <div className="p-5 min-h-full flex flex-col justify-center items-center">

                <div className="row justify-center mb-5">
                    <div className="col-auto">
                        <img src={srcAssets['/assets/img/logo.png']}/>
                    </div>
                    <div className="col-auto">
                        <img src={publicUrl('/assets/img/logo-without-hash.png')}/>
                    </div>
                </div>

                <div className="text-center">
                    <div className="btn cursor-pointer"
                    onClick={()=>{
                        store.commit('lightbox', 'helloLightbox')
                    }}>
                        CLICK ME!
                    </div>
                </div>
            </div>
        </LayoutGeneral>)
    },
})
</script>
