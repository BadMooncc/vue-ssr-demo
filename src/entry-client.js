import createApp from './main'
// import Vue from 'vue'

const { app, router, store } = createApp()

router.onReady(() => {
  // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve

  // 将服务端渲染时候的状态写入vuex中
  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
  }
  // 客户端渲染正常请求
  if (process.env.NODE_ENV !== 'production') {
    router.options.routes.find(item => router.currentRoute.name === item.name).component.asyncData({ store: store })
  }
  router.beforeResolve((to, from, next) => {
    console.log(11)
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    // 我们只关心非预渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }

    // 这里如果有加载指示器 (loading indicator)，就触发
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({ store: store, route: to })
      }
    })).then(() => {
      // 停止加载指示器(loading indicator)
      next()
    }).catch(next)
  })

  app.$mount('#app')
})
