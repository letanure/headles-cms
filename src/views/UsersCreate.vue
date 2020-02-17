<template lang="pug">
  .UsersCreate
    el-row(
      type="flex"
      )
      el-col(:xs="24" :sm="24" :md="12" :lg="12" :xl="6")
        CreateUserForm(@success="registerSuccess")
</template>

<script>
import CreateUserForm from '@/components/CreateUserForm'

export default {
  name: 'UsersCreate',
  components: {
    CreateUserForm,
  },
  methods: {
    registerSuccess() {
      this.$router.push({ name: 'users' })
    },
  },
}
</script>
