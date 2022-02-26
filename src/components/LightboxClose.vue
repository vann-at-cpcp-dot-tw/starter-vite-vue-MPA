<script lang="jsx">
import { onBeforeMount, onMounted, onBeforeUnmount, ref, reactive, computed, watch, nextTick, defineAsyncComponent, defineComponent, } from 'vue'
import useViewport from '@src/use/useViewport'
import { useStore } from 'vuex'
import { router, useRoute } from '@src/routes'
import { isEmpty } from '@src/helpers'

export default defineComponent({
  props: {},
  setup(props, {emit}) {
    const route = useRoute()
    const viewport = useViewport()
    const store = useStore()
    const state = reactive({})

    function lightboxClickHandler(e){
      if( $(e.target).data('el') == 'lightbox'){
        store.commit('lightbox', null)
      }
    }

    onBeforeMount(()=>{
      $('body').on('click', lightboxClickHandler)
    })

    onBeforeUnmount(()=>{
      $('body').off('click', lightboxClickHandler)
    })

    return () => (
      <div className="flex justify-end absolute right-2 top-2">
        <div className="btn"
        onClick={()=>{
          store.commit('lightbox', null)
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
            <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
          </svg>
        </div>
      </div>
    )
  },
})
</script>
