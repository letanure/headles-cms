<template lang="pug">
  .UserEdit
    el-row(
      type="flex"
      )
      el-col(:xs="24" :sm="24" :md="12" :lg="12" :xl="6")
        UserForm(
          @success="onSuccess"
          :id="id"
          )
</template>

<script>
import UserForm from '@/components/UserForm'

export default {
  name: 'UsersEdit',

  components: {
    UserForm,
  },

  props: {
    id: {
      required: true,
      type: String,
    },
  },

  methods: {
    onSuccess() {
      this.$router.push({ name: 'Users' })
    },
  },
}
</script>
