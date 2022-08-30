<template>
    <div class="hello">
        <router-link to="/home">123</router-link>
        <div>{{ conf.location }}</div>
        <div>
            <router-link to="/home">{{ conf.message }}</router-link>
        </div>
        store 服务端渲染
        <div>{{ conf2.location }}</div>
        <div>
            <router-link to="/home">{{ conf2.message }}</router-link>
        </div>
    </div>
</template>

<script>
import { getList } from '@/service/index.js'
export default {
  name: 'HelloWorld',
  asyncData ({ store }) {
    // console.log(store, 'store')
    return Promise.all([
      getList(),
      getList()
    ]).then((res) => {
      store.commit('GET_LIST', res[1])
      return { conf: res[0], conf2: res[1] }
    })
  },
  computed: {
    conf2 () {
      return this.$store.state.list
    }
  },
  data () {
    return {
      conf: {}
    }
  },
  // computed: {
  //   conf () {
  //     return this.$store.state.list
  //   }
  // },
  created () {
    console.log(JSON.stringify(this.conf), 'created')
  },
  beforeCreate () {
    console.log(JSON.stringify(this.conf), 'beforeCreate')
  },
  beforeMount () {
    console.log(JSON.stringify(this.conf), 'beforeMount')
  },
  mounted () {
    console.log(JSON.stringify(this.conf), 'mounted')
  }
}
</script>
