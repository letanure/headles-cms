<template lang="pug">
  el-form.LoginForm(
    :model="formData"
    :rules="formRules"
    @submit.native.prevent="submit('LoginForm')"
    label-position="top"
    novalidate
    ref="addForm"
    status-icon
    )

    el-form-item(
      :label="$t('LoginForm.fields.email.label')"
      prop="email"
      )
      el-input(
        type="email"
        v-model="formData.email"
      )

    el-form-item(
      :label="$t('LoginForm.fields.password.label')"
      prop="password"
      )
      el-input(
        :placeholder="$t('LoginForm.fields.password.placeholder')"
        show-password
        type="password"
        v-model="formData.password"
      )

    el-form-item
      el-button(
        type="primary"
        native-type="submit"
        v-text="$t('LoginForm.actions.submit.label')"
        )

</template>

<script>
import { auth } from '@/firebase/auth.js'

export default {
  name: 'LoginForm',

  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
      formRules: {
        email: [
          {
            required: true,
            message: this.$t('validation.required'),
            trigger: 'blur',
          },
          {
            type: 'email',
            message: this.$t('validation.email'),
            trigger: ['blur', 'change'],
          },
        ],
        password: [
          {
            min: 6,
            message: this.$t('validation.min', { min: 6 }),
            trigger: 'blur',
          },
          {
            required: true,
            message: this.$t('validation.required'),
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    login() {
      auth
        .signInWithEmailAndPassword(this.formData.email, this.formData.password)
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

    submit() {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          this.message({
            messageKey: 'LoginForm.actions.submit.error',
          })
        }
      })
    },
  },
}
</script>
