<template lang="pug">
  el-button.SignInGoogle(
    @click="signIn"
    v-text="$t('SignInGoogle.label')"
    )

</template>

<script>
import { auth, providerGoogle } from '@/firebase/auth.js'

export default {
  name: 'SignInGoogle',

  methods: {
    signIn() {
      auth
        .signInWithPopup(providerGoogle)
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
