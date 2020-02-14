<template lang="pug">
  el-button.SignInTwitter(
    @click="signIn"
    v-text="$t('SignInTwitter.label')"
    )

</template>

<script>
import { auth, providerTwitter } from '@/firebase/auth.js'

export default {
  name: 'SignInTwitter',

  methods: {
    signIn() {
      auth
        .signInWithPopup(providerTwitter)
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
