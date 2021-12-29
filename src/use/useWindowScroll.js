import { ref, reactive, watch, onMounted} from 'vue'

export default function(passState={}){

  const state = reactive({
    hasScroll: undefined,
    scrollPos: {
      x: 'start',
      y: 'start',
    },
    ...passState,
  })

  const getScrollTop = ()=>{
    return document.documentElement.scrollTop + document.body.scrollTop
  }


  const updateScrollBar = function(){
    state.hasScroll = document.body.scrollHeight > document.body.clientHeight
  }

  onMounted(()=>{
    updateScrollBar()

    $(window).off('scroll')
    $(window).on('scroll', ()=>{

      if( !state.hasScroll ){
        return
      }

      const scrollTop = getScrollTop()
      if( scrollTop == 0){
        state.scrollPos.y = 'start'
      }
      else if ( scrollTop > 0 && scrollTop< (document.body.scrollHeight) - (document.body.clientHeight) ){
        state.scrollPos.y = 'center'
      }
      else if( scrollTop >= (document.body.scrollHeight) - (document.body.clientHeight) ){
        state.scrollPos.y = 'end'
      }

    })
  })


  onMounted(()=>{
    $(window).on('load', function(){
      updateScrollBar()
    })

    let resizeTimer
    $(window).on('resize', function(){
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(()=>{
        updateScrollBar()
      }, 250)
    })
  })

  return {
    updateScrollBar,
    state: state,
  }
}
