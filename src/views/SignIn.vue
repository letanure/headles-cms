<template lang="pug">
  .SignIn(v-if="user")
    el-row.pageHeight(
      align="middle"
      justify="center"
      type="flex"
      )
      el-col(:xs="22" :sm="12" :md="8" :lg="6" :xl="4")
        
        .tip(v-if="user.signedIn")
          p {{ $t('SignIn.signedIn') }}
          p {{ $t('SignIn.signedOut') }}
          p
            SignOut

        el-card(v-if="user.data && !user.signedIn")
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
import { mapGetters } from 'vuex'
import SignInProvider from '@/components/SignInProvider'
import SignInForm from '@/components/SignInForm'
import SignOut from '@/components/SignOut'

export default {
  name: 'SignIn',
  components: {
    SignInForm,
    SignInProvider,
    SignOut,
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
    }),
  },
  methods: {
    signInSuccess() {
      setTimeout(() => {
        this.$router.replace({ name: 'home' })
      }, 300)
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
</style>
