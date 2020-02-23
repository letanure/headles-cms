<template lang="pug">
  .GroupsEdit
    el-row(
      type="flex"
      )
      el-col(:xs="24" :sm="24" :md="12" :lg="12" :xl="6")
        GroupForm(
          @success="onSuccess"
          :id="id"
          )
</template>

<script>
import GroupForm from '@/components/GroupForm'

export default {
  name: 'GroupsEdit',

  components: {
    GroupForm,
  },

  props: {
    id: {
      required: true,
      type: String,
    },
  },

  methods: {
    onSuccess() {
      this.$router.push({ name: 'Groups' })
    },
  },
}
</script>
