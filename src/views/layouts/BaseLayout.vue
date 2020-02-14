<template lang="pug">
  .BaseLayout
    el-container
      el-aside.BaseLayout-aside(
        width="200px"
        )
        VerticalMenu
      el-container
        el-header(style="height: 56px;").BaseLayout-header
          | BaseLayout-header
        el-main
          router-view
        el-footer.BaseLayout-footer
          | BaseLayout-footer
</template>

<script>
// @ is an alias to /src
import VerticalMenu from '@/components/ui/VerticalMenu.vue'

export default {
  name: 'BaseLayout',
  components: {
    VerticalMenu,
  },
}
</script>

<style lang="stylus">
.BaseLayout

  .el-container
    min-height 100vh

  &-header
    background-color #e6f2f2
    line-height 56px
    height 56px

  &-aside
    border-right solid 1px #35495d

  &-footer
    line-height 56px
    border-top solid 1px #35495d
</style>
