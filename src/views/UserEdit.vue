<template lang="pug">
  .UserEdit
    el-row(
      type="flex"
      )
      el-col(:xs="24" :sm="24" :md="12" :lg="12" :xl="6")
        UserFormCreate(
          @success="registerSuccess"
          :uid="uid"
          )
</template>

<script>
import UserFormCreate from '@/components/UserFormCreate'

export default {
  name: 'UserEdit',

  components: {
    UserFormCreate,
  },

  props: {
    uid: {
      required: true,
      type: String,
    },
  },

  methods: {
    registerSuccess() {
      this.$router.push({ name: 'users' })
    },
  },
}
</script>
