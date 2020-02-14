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
          SignInGoogle(@success="signInSuccess")
          SignInFacebook(@success="signInSuccess")
</template>

<script>
import SignInForm from '@/components/SignInForm'
import SignInGoogle from '@/components/SignInGoogle'
import SignInFacebook from '@/components/SignInFacebook'

export default {
  name: 'SignIn',
  components: {
    SignInForm,
    SignInGoogle,
    SignInFacebook,
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
