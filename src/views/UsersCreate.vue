<template lang="pug">
  .UsersCreate
    el-row(
      type="flex"
      )
      el-col(:xs="24" :sm="24" :md="12" :lg="12" :xl="6")
        UserFormCreate(@success="registerSuccess")
</template>

<script>
import UserFormCreate from '@/components/UserFormCreate'

export default {
  name: 'UsersCreate',
  components: {
    UserFormCreate,
  },
  methods: {
    registerSuccess() {
      this.$router.push({ name: 'users' })
    },
  },
}
</script>
