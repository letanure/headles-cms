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
          el-divider
          el-row.SignIn-providers(
            type="flex"
            )
            el-col()
              SignInProvider(@success="signInSuccess" provider="github")
            el-col()
              SignInProvider(@success="signInSuccess" provider="facebook")
            el-col()
              SignInProvider(@success="signInSuccess" provider="google")
            el-col()
              SignInProvider(@success="signInSuccess" provider="twitter")
</template>

<script>
import SignInProvider from '@/components/SignInProvider'
import SignInForm from '@/components/SignInForm'

export default {
  name: 'SignIn',
  components: {
    SignInForm,
    SignInProvider,
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
  &-providers
    flex-wrap wrap
    text-align center
    .el-col
      margin-bottom 10px
  & + .el-row
    min-height 100vh
</style>
