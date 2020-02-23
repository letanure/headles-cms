<template lang="pug">
  .GroupsCreate
    el-row(
      type="flex"
      )
      el-col(:xs="24" :sm="24" :md="12" :lg="12" :xl="6")
        GroupForm(@success="onSuccess")
</template>

<script>
import GroupForm from '@/components/GroupForm'

export default {
  name: 'GroupsCreate',

  components: {
    GroupForm,
  },

  methods: {
    onSuccess() {
      this.$router.push({ name: 'Groups' })
    },
  },
}
</script>
