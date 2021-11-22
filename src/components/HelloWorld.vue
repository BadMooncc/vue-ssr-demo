<template>
    <div class="hello">
        <router-link to="/home">123</router-link>
        <div>{{ conf.location }}</div>
        <div>
            <router-link to="/home">{{ conf.message }}</router-link>
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
      getList().then((res) => {
        store.commit('GET_LIST', res)
        return res
      })
    ])
  },
  computed: {
    conf () {
      return this.$store.state.list
    }
  },
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
