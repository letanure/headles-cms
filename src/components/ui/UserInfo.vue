<template lang="pug">
  span.UserInfo(v-if="user && user.data")
    el-avatar(
      :alt="user.data.displayName"
      :src="user.data.photoURL"
      fit="fill"
      size="48"
      v-loading="!user"
      )
      i.el-icon-user-solid

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserInfo',

  computed: {
    ...mapGetters({
      user: 'user/user',
    }),
  },
}
</script>

<style lang="stylus">
.UserInfo
  display inline-block
  height 40px
  margin 0 10px
  overflow hidden
  vertical-align middle
  width 40px
  .el-avatar
    background-color teal
  .el-icon-user-solid
    font-size 22px
    line-height 38px
    color white
</style>
