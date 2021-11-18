<template>
    <div>home</div>
</template>
<script>

export default {
  asyncData (params) {
    console.log(params)
    return {
      conf: {
        host: ''
      }
    }
  }
}
</script>
