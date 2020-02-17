<template lang="pug">
  .UsersCreate
    el-row(
      type="flex"
      )
      el-col(:xs="24" :sm="24" :md="12" :lg="12" :xl="6")
        UserCreateForm(@success="registerSuccess")
</template>

<script>
import UserCreateForm from '@/components/UserCreateForm'

export default {
  name: 'UsersCreate',
  components: {
    UserCreateForm,
  },
  methods: {
    registerSuccess() {
      this.$router.push({ name: 'users' })
    },
  },
}
</script>
