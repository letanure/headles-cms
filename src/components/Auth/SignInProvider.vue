<template lang="pug">
  el-button.SignInProvider(
    @click="signIn"
    v-text="$t(`SignInProvider.${provider}.label`)"
    )

</template>

<script>
import { Button, Message } from 'element-ui'
import { auth, providers } from '@/firebase/auth'

export default {
  name: 'SignInProvider',

  components: {
    [Button.name]: Button,
  },

  props: {
    provider: {
      default: null,
      required: true,
      type: String,
      validator: (value) => {
        return ['facebook', 'google', 'twitter', 'github'].includes(value)
      },
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
        Message({
          type,
          message: this.$t(messageKey),
        })
      }
    },
  },
}
</script>
