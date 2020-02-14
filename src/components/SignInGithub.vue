<template lang="pug">
  el-button.SignInGithub(
    @click="signIn"
    v-text="$t('SignInGithub.label')"
    )

</template>

<script>
import { auth, providerGithub } from '@/firebase/auth.js'

export default {
  name: 'SignInGithub',

  methods: {
    signIn() {
      auth
        .signInWithPopup(providerGithub)
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
