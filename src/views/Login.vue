<template lang="pug">
  .Login
    el-row(
      align="middle"
      justify="center"
      type="flex"
      )
      el-col(:xs="22" :sm="12" :md="8" :lg="6" :xl="4")
        el-card()
          div(slot="header")
            h2 Login
          LoginForm
</template>

<script>
import LoginForm from '@/components/LoginForm'

export default {
  name: 'Login',
  components: {
    LoginForm,
  },
}
</script>

<style lang="stylus">
.Login, .el-row
  min-height 100vh
</style>
