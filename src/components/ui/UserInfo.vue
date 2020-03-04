<template lang="pug">
  span.UserInfo(v-if="user && user.data")
    el-avatar(
      :alt="user.data.displayName"
      :size="40"
      :src="user.data.photoURL"
      fit="fill"
      v-loading="!user"
      )
      i.el-icon-user-solid

</template>

<script>
import { Avatar } from 'element-ui'
import { mapGetters } from 'vuex'

export default {
  name: 'UserInfo',

  components: {
    [Avatar.name]: Avatar,
  },

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
    color white
    font-size 22px
    line-height 38px
</style>
