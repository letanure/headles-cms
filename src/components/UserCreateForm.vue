<template lang="pug">
  el-form.UserCreateForm(
    :model="formData"
    :rules="formRules"
    @submit.native.prevent="submit('UserCreateForm')"
    label-position="top"
    novalidate
    ref="UserCreateForm"
    status-icon
    )

    el-form-item(
      :label="$t('UserCreateForm.fields.name.label')"
      prop="name"
      )
      el-input(
        type="text"
        v-model="formData.name"
      )

    el-form-item(
      :label="$t('UserCreateForm.fields.email.label')"
      prop="email"
      )
      el-input(
        type="email"
        v-model="formData.email"
      )

    el-form-item(
      :label="$t('UserCreateForm.fields.password.label')"
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
        v-text="$t('UserCreateForm.actions.submit.label')"
        )

</template>

<script>
import { auth } from '@/firebase/auth.js'
export default {
  name: 'UserCreateForm',

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
        name: [
          {
            required: true,
            message: this.$t('validation.required'),
            trigger: 'blur',
          },
          {
            min: 2,
            message: this.$t('validation.min', { min: 2 }),
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: this.$t('validation.required'),
            trigger: 'blur',
          },
          {
            min: 6,
            message: this.$t('validation.min', { min: 6 }),
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
      this.$refs['UserCreateForm'].validate((valid) => {
        if (valid) {
          this.create()
        } else {
          this.message({
            messageKey: 'UserCreateForm.actions.submit.error',
          })
        }
      })
    },
  },
}
</script>
