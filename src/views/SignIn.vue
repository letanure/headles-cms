<template lang="pug">
  .SignIn
    el-row(
      align="middle"
      justify="center"
      type="flex"
      )
      el-col(:xs="22" :sm="12" :md="8" :lg="6" :xl="4")
        el-card()
          div(slot="header")
            h2 Login
          SignInForm(@success="signInSuccess")
</template>

<script>
import SignInForm from '@/components/SignInForm'

export default {
  name: 'SignIn',
  components: {
    SignInForm,
  },
  methods: {
    signInSuccess() {
      this.$router.replace({ name: 'home' })
    },
  },
}
</script>

<style lang="stylus">
.SignIn
  .el-row
    min-height 100vh
</style>
