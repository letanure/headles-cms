<template lang="pug">
  .BaseLayout
    el-container
      el-aside.BaseLayout-aside(
        width="200px"
        )
        VerticalMenu
      el-container
        el-header(style="height: 56px;").BaseLayout-header
          el-row(
            justify="space-between"
            type="flex"
            )
            el-col
              | BaseLayout-header
            el-col.BaseLayout-header-actions
              UserInfo
              SignOut
        el-main
          router-view
        el-footer.BaseLayout-footer
          | BaseLayout-footer
</template>

<script>
import SignOut from '@/components/SignOut'
import UserInfo from '@/components/ui/UserInfo'
import VerticalMenu from '@/components/ui/VerticalMenu'

export default {
  name: 'BaseLayout',
  components: {
    VerticalMenu,
    SignOut,
    UserInfo,
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

    &-actions
      text-align right

  &-aside
    border-right solid 1px #35495d

  &-footer
    line-height 56px
    border-top solid 1px #35495d
</style>
