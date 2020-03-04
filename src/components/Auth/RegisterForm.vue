<template lang="pug">
  el-form.RegisterForm(
    :model="formData"
    :rules="formRules"
    @submit.native.prevent="submit('RegisterForm')"
    label-position="top"
    novalidate
    ref="RegisterForm"
    status-icon
    )

    el-form-item(
      :label="$t('RegisterForm.fields.name.label')"
      prop="name"
      )
      el-input(
        type="text"
        v-model="formData.name"
      )

    el-form-item(
      :label="$t('RegisterForm.fields.email.label')"
      prop="email"
      )
      el-input(
        type="email"
        v-model="formData.email"
      )

    el-form-item(
      :label="$t('RegisterForm.fields.password.label')"
      prop="password"
      )
      el-input(
        show-password
        type="password"
        v-model="formData.password"
        )

    el-form-item
      el-button(
        native-type="submit"
        type="primary"
        v-text="$t('RegisterForm.actions.submit.label')"
        )

</template>

<script>
import { Button, Form, FormItem, Input } from 'element-ui'
import { auth } from '@/firebase/auth'

export default {
  name: 'RegisterForm',

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
        name: '',
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
        name: [
          {
            message: this.$t('validation.required'),
            required: true,
            trigger: 'blur',
          },
          {
            message: this.$t('validation.min', { min: 2 }),
            min: 2,
            trigger: 'blur',
          },
        ],
        password: [
          {
            message: this.$t('validation.required'),
            required: true,
            trigger: 'blur',
          },
          {
            message: this.$t('validation.min', { min: 6 }),
            min: 6,
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    create() {
      auth
        .createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password,
        )
        .then((data) => {
          this.$emit('success')
          data.user
            .updateProfile({
              displayName: this.formData.name,
            })
            .then(() => {})
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
      this.$refs['RegisterForm'].validate((valid) => {
        if (valid) {
          this.create()
        } else {
          this.message({
            messageKey: 'RegisterForm.actions.submit.error',
          })
        }
      })
    },
  },
}
</script>
