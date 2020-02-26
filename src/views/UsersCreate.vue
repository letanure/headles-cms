<template lang="pug">
  .UsersCreate
    el-row(
      type="flex"
      )
      el-col(:xs="24" :sm="24" :md="12" :lg="12" :xl="6")
        UserForm(@success="onSuccess")
</template>

<script>
import UserForm from '@/components/UserForm'

export default {
  name: 'UsersCreate',

  components: {
    UserForm,
  },

  methods: {
    onSuccess() {
      this.$router.push({ name: 'users' })
    },
  },
}
</script>
