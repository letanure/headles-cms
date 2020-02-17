<template lang="pug">
  .UsersCreate
    el-row(
      type="flex"
      )
      el-col(:xs="24" :sm="24" :md="12" :lg="12" :xl="6")
        RegisterForm(@success="registerSuccess")
</template>

<script>
import RegisterForm from '@/components/RegisterForm'

export default {
  name: 'UsersCreate',
  components: {
    RegisterForm,
  },
  methods: {
    registerSuccess() {
      this.$router.push({ name: 'users' })
    },
  },
}
</script>
