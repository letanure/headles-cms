<template lang="pug">
  #app
    router-view
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="stylus">
body
  -moz-osx-font-smoothing grayscale
  -webkit-font-smoothing antialiased
  color #2c3e50
  font-family 'Avenir', Helvetica, Arial, sans-serif
  margin 0
  padding 0
  overflow-y scroll
#app
  min-height 100vh

  .el-form--label-top .el-form-item__label
    float none
    display inline-block
    text-align left
    padding 0 0 0px 0
    line-height 35px
</style>
