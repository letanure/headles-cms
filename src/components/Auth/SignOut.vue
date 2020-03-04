<template lang="pug">
  el-button.SignOut(
    :type="buttonType"
    @click="signOut"
    v-text="$t('SignOut.label')"
    )

</template>

<script>
import { Button } from 'element-ui'
import { auth } from '@/firebase/auth'

export default {
  name: 'SignOut',

  components: {
    [Button.name]: Button,
  },

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
          name: 'signIn',
        })
      })
    },
  },
}
</script>
