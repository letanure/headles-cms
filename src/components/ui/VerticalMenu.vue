<template lang="pug">
  .VerticalMenu
    el-menu.el-menu-vertical-demo(
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
          routeName: 'home',
          text: this.$t('menu.home'),
          icon: 's-home',
        },
        {
          routeName: 'about',
          text: this.$t('menu.about'),
          icon: 'info',
        },
        {
          routeName: 'signIn',
          text: this.$t('menu.signIn'),
          icon: 'info',
        },
        {
          routeName: 'register',
          text: this.$t('menu.register'),
          icon: 'info',
        },
        {
          routeName: 'users',
          text: this.$t('menu.users'),
          icon: 'info',
        },
        {
          routeName: 'Groups',
          text: this.$t('menu.groups'),
          icon: 'info',
        },
      ],
    }
  },
}
</script>
