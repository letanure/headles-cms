<template lang="pug">
  el-button.SignInFacebook(
    @click="signIn"
    v-text="$t('SignInFacebook.label')"
    )

</template>

<script>
import { auth, providerFacebook } from '@/firebase/auth.js'

export default {
  name: 'SignInFacebook',

  methods: {
    signIn() {
      auth
        .signInWithPopup(providerFacebook)
        .then(() => {
          this.$emit('success')
        })
        .catch((err) => {
          this.$emit('error')
          this.message({
            messageKey: err.code.replace(/\//g, '.').replace(/-/g, '_'),
          })
        })
    },

    message({ type = 'error', messageKey = null }) {
      if (messageKey) {
        this.$message({
          type,
          message: this.$t(messageKey),
        })
      }
    },
  },
}
</script>
