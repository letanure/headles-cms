<template lang="pug">
  .Groups
    p
      GroupsList(:page="isNaN(page) ? 1 : page")
    p
      router-link(
        :to="{ name: `GroupsCreate` }"
        )
        el-button(
            type="primary"
            v-text="$t(`Groups.actions.create.label`)"
            )
        
</template>

<script>
import GroupsList from '@/components/GroupsList'

export default {
  name: 'Groups',

  components: {
    GroupsList,
  },

  props: {
    page: {
      default: 1,
      required: false,
      type: Number,
    },
  },
}
</script>
