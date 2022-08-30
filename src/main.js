// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import createRouter from './router'
import createStore from './store'
import mergeAsyncData from '@/mixins/mergeAsyncData'
Vue.config.productionTip = false

Vue.mixin(mergeAsyncData)
export default function () {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })
  return { app, router, store }
}
