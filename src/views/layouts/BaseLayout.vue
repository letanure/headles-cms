<template lang="pug">
  .BaseLayout
    el-container
      el-aside.BaseLayout-aside(
        :width="`${menuClosed ? 56 : 200}px`"
        )
        el-button.BaseLayout-toggleMenu(
          :icon="`el-icon-arrow-${menuClosed ? 'right' : 'left'}`"
          @click="toggleMenu"
          type="default"
          )
        VerticalMenu(:class="`menu-${menuClosed ? 'closed' : 'open' }`")
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
          transition(name="fade" mode="out-in")
            router-view
        el-footer.BaseLayout-footer
          | BaseLayout-footer
</template>

<script>
import {
  Aside,
  Button,
  Col,
  Container,
  Footer,
  Header,
  Icon,
  Main,
  Menu,
  Row,
} from 'element-ui'
import SignOut from '@/components/Auth/SignOut'
import UserInfo from '@/components/ui/UserInfo'
import VerticalMenu from '@/components/ui/VerticalMenu'

export default {
  name: 'BaseLayout',

  components: {
    [Button.name]: Button,
    [Aside.name]: Aside,
    [Button.name]: Button,
    [Col.name]: Col,
    [Container.name]: Container,
    [Footer.name]: Footer,
    [Header.name]: Header,
    [Icon.name]: Icon,
    [Main.name]: Main,
    [Menu.name]: Menu,
    [Row.name]: Row,
    SignOut,
    UserInfo,
    VerticalMenu,
  },

  data: () => ({
    menuClosed: false,
  }),

  beforeMount() {
    this.getConfig()
  },

  methods: {
    getConfig() {
      const menuClosed = localStorage.getItem('menuClosed') === 'true'
      this.menuClosed = menuClosed
    },

    saveConfig() {
      localStorage.setItem('menuClosed', this.menuClosed)
    },

    toggleMenu() {
      this.menuClosed = !this.menuClosed
      this.saveConfig()
    },
  },
}
</script>

<style lang="stylus">
.BaseLayout

  .el-container
    height 100vh

  &-header
    background-color #e6f2f2
    height 56px
    line-height 56px

    &-actions
      text-align right

  &-aside
    padding-top 56px
    position relative
    transition width 0.2s ease-out
    height 100vh
    border-right 1px solid #e6e6e6
    overflow hidden

    .el-menu-item span
      transition opacity .2s ease-out

    .menu-closed
      .el-menu-item span
        opacity 0

  &-toggleMenu
    background-color #e6f2f2
    border-bottom 0
    border-radius 0
    height 56px
    position absolute
    right 0
    top 0
    width 100%
    z-index 2

  &-footer
    border-top solid 1px #e6f2f2
    line-height 56px
</style>
