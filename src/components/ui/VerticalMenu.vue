<template lang="pug">
  .VerticalMenu
    el-menu(
      :router="true"
      default-active="1"
      )
      el-menu-item(
        :index="menuItem.routeName" 
        :key='index' 
        :route="{name: menuItem.routeName}"
        v-for='(menuItem, index) in menuItems'
        )
        i(:class='`el-icon-${menuItem.icon}`')
        span(v-text="menuItem.text")
</template>

<script>
import { Menu, MenuItem } from 'element-ui'

export default {
  name: 'VerticalMenu',

  components: {
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
  },

  data() {
    return {
      menuItems: [
        {
          icon: 's-home',
          routeName: 'Home',
          text: this.$t('menu.home'),
        },
        {
          icon: 'info',
          routeName: 'About',
          text: this.$t('menu.about'),
        },
        {
          icon: 'info',
          routeName: 'SignIn',
          text: this.$t('menu.signIn'),
        },
        {
          icon: 'info',
          routeName: 'Register',
          text: this.$t('menu.register'),
        },
        {
          icon: 'info',
          routeName: 'UsersList',
          text: this.$t('menu.users'),
        },
        {
          icon: 'info',
          routeName: 'GroupsList',
          text: this.$t('menu.groups'),
        },
        {
          icon: 'info',
          routeName: 'ContentTypesList',
          text: this.$t('menu.contentTypes'),
        },
      ],
    }
  },
}
</script>

<style lang="stylus">
.VerticalMenu
  .el-menu
    border-right 0
</style>
