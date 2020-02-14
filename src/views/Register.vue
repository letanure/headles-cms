<template lang="pug">
  .Register
    el-row(
      align="middle"
      justify="center"
      type="flex"
      )
      el-col(:xs="22" :sm="12" :md="8" :lg="6" :xl="4")
        el-card()
          div(slot="header")
            h2 Register
          RegisterForm
</template>

<script>
import RegisterForm from '@/components/RegisterForm'

export default {
  name: 'Register',
  components: {
    RegisterForm,
  },
}
</script>

<style lang="stylus">
.Register, .el-row
  min-height 100vh
</style>
