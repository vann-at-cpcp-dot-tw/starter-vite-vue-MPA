import { createStore } from 'vuex'
import sample from './modules/__sample.js'

export default createStore({
  state: {
    lightbox: '',
  },
  modules: {
    sample
  },
  actions: {

  },
  mutations: {
    lightbox: (state, lightboxId)=>{
      state.lightbox = lightboxId
    }
  }
})
