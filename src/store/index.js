import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
const state = {
  list: []
}
Vue.use(Vuex)

export default function () {
  return new Vuex.Store({
    state,
    actions,
    mutations,
    getters: {}
  })
}
