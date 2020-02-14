<template lang="pug">
  el-button.SignOut(
    :type="buttonType"
    @click="signOut"
    v-text="$t('SignOut.label')"
    )

</template>

<script>
import { auth } from '@/firebase/auth'

export default {
  name: 'SignOut',

  props: {
    buttonType: {
      default: 'primary',
      required: false,
      type: String,
    },
  },

  methods: {
    signOut() {
      auth.signOut().then(() => {
        this.$emit('signOut')
        this.$router.replace({
          name: 'login',
        })
      })
    },
  },
}
</script>
