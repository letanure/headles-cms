<template lang="pug">
  el-form.SignInForm(
    :model="formData"
    :rules="formRules"
    @submit.native.prevent="submit('SignInForm')"
    label-position="top"
    novalidate
    ref="addForm"
    status-icon
    )

    el-form-item(
      :label="$t('SignInForm.fields.email.label')"
      prop="email"
      )
      el-input(
        type="email"
        v-model="formData.email"
        )

    el-form-item(
      :label="$t('SignInForm.fields.password.label')"
      prop="password"
      )
      el-input(
        :placeholder="$t('SignInForm.fields.password.placeholder')"
        show-password
        type="password"
        v-model="formData.password"
        )

    el-form-item
      el-button(
        native-type="submit"
        type="primary"
        v-text="$t('SignInForm.actions.submit.label')"
        )

</template>

<script>
import { auth } from '@/firebase/auth'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

export default {
  name: 'SignInForm',

  components: {
    [Button.name]: Button,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
  },

  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
      formRules: {
        email: [
          {
            message: this.$t('validation.required'),
            required: true,
            trigger: 'blur',
          },
          {
            message: this.$t('validation.email'),
            trigger: ['blur', 'change'],
            type: 'email',
          },
        ],
        password: [
          {
            message: this.$t('validation.min', { min: 6 }),
            min: 6,
            trigger: 'blur',
          },
          {
            message: this.$t('validation.required'),
            required: true,
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
        Message({
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
            messageKey: 'SignInForm.actions.submit.error',
          })
        }
      })
    },
  },
}
</script>
