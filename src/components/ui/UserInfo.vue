<template lang="pug">
  span.UserInfo(v-if="user")
    el-image(
      :alt="user.displayName"
      :src="user.data.photoURL"
      fit="fill"
      style="width: 38px; height: 38px"
      v-if="user.data.photoURL"
      v-loading="!user"
      )
      div(slot="error")
        i.el-icon-picture-outline

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
  .el-image
    border 1px solid #5a6b79
    border-radius 100%
</style>
