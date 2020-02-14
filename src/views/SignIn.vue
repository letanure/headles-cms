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
          SignInFacebook(@success="signInSuccess")
          SignInGithub(@success="signInSuccess")
          SignInGoogle(@success="signInSuccess")
          SignInTwitter(@success="signInSuccess")
</template>

<script>
import SignInFacebook from '@/components/SignInFacebook'
import SignInForm from '@/components/SignInForm'
import SignInGithub from '@/components/SignInGithub'
import SignInGoogle from '@/components/SignInGoogle'
import SignInTwitter from '@/components/SignInTwitter'

export default {
  name: 'SignIn',
  components: {
    SignInFacebook,
    SignInForm,
    SignInGoogle,
    SignInGithub,
    SignInTwitter,
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
