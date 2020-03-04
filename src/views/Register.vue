<template lang="pug">
  .Register
    el-row(
      align="middle"
      justify="center"
      type="flex"
      )
      el-col(:xs="22" :sm="12" :md="8" :lg="6" :xl="4")
        
        .tip(v-if="user.signedIn")
          p {{ $t('Register.signedIn') }}
          p {{ $t('Register.signedOut') }}
          p
            SignOut

        el-card(v-if="!user.signedIn")
          div(slot="header")
            h2 Register
          RegisterForm(@success="registerSuccess")
</template>

<script>
import { Col, Row } from 'element-ui'
import { mapGetters } from 'vuex'
import RegisterForm from '@/components/Auth/RegisterForm'
import SignOut from '@/components/Auth/SignOut'

export default {
  name: 'Register',

  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    RegisterForm,
    SignOut,
  },

  computed: {
    ...mapGetters({
      user: 'user/user',
    }),
  },

  methods: {
    registerSuccess() {
      setTimeout(() => {
        this.$router.replace({ name: 'home' })
      }, 300)
    },
  },
}
</script>

<style lang="stylus">
.Register, .el-row
  min-height 100vh
</style>
