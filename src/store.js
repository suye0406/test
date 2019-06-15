import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    info:{}
  },
  mutations: {
    INFO (state, params) {
      state.info = params;
      console.log(params)
    }
  },
  actions: {

  }
})
