<template lang="pug">
  .VerticalMenu
    el-menu(
      default-active="1"
      :router="true"
      )
      el-menu-item(
        v-for='(menuItem, index) in menuItems'
        :key='index' 
        :index="menuItem.routeName" 
        :route="{name: menuItem.routeName}"
        )
        i(:class='`el-icon-${menuItem.icon}`')
        span(v-text="menuItem.text")
</template>

<script>
export default {
  name: 'VerticalMenu',

  data() {
    return {
      menuItems: [
        {
          routeName: 'Home',
          text: this.$t('menu.home'),
          icon: 's-home',
        },
        {
          routeName: 'About',
          text: this.$t('menu.about'),
          icon: 'info',
        },
        {
          routeName: 'SignIn',
          text: this.$t('menu.signIn'),
          icon: 'info',
        },
        {
          routeName: 'Register',
          text: this.$t('menu.register'),
          icon: 'info',
        },
        {
          routeName: 'UsersList',
          text: this.$t('menu.users'),
          icon: 'info',
        },
        {
          routeName: 'GroupsList',
          text: this.$t('menu.groups'),
          icon: 'info',
        },
      ],
    }
  },
}
</script>

<style lang="stylus">
.VerticalMenu
  position relative
  z-index 1
  .el-menu
    min-height 100vh
</style>
