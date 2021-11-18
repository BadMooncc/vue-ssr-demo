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
  }
}
</script>
