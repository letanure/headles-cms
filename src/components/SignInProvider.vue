<template lang="pug">
  el-button.SignInProvider(
    @click="signIn"
    v-text="$t(`SignInProvider.${provider}.label`)"
    )

</template>

<script>
import { auth, providers } from '@/firebase/auth.js'

export default {
  name: 'SignInProvider',

  props: {
    provider: {
      default: null,
      required: true,
      type: String,
      validator: (value) => {
        return ['facebook', 'google', 'twitter', 'github'].includes(value)
      }
    },
  },

  methods: {
    signIn() {
      auth
        .signInWithPopup(providers[this.provider])
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
