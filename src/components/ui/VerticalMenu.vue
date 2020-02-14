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
          routeName: 'login',
          text: this.$t('menu.login'),
          icon: 'info',
        },
        {
          routeName: 'register',
          text: this.$t('menu.register'),
          icon: 'info',
        },
      ],
    }
  },
}
</script>
