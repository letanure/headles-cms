<template lang="pug">
  .Users
    p
      UsersList(:page="page")
    p
      router-link(
        :to="{ name: `UsersCreate` }"
        )
        el-button(
            type="primary"
            v-text="$t(`Users.actions.create.label`)"
            )
        
</template>

<script>
import UsersList from '@/components/UsersList'

export default {
  name: 'Users',

  components: {
    UsersList,
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
