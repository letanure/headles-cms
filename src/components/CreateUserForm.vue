<template lang="pug">
  el-form.CreateUserForm(
    :model="formData"
    :rules="formRules"
    @submit.native.prevent="submit('CreateUserForm')"
    label-position="top"
    novalidate
    ref="CreateUserForm"
    status-icon
    )

    el-form-item(
      :label="$t('CreateUserForm.fields.name.label')"
      prop="name"
      )
      el-input(
        type="text"
        v-model="formData.name"
      )

    el-form-item(
      :label="$t('CreateUserForm.fields.email.label')"
      prop="email"
      )
      el-input(
        type="email"
        v-model="formData.email"
      )

    el-form-item(
      :label="$t('CreateUserForm.fields.password.label')"
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
        v-text="$t('CreateUserForm.actions.submit.label')"
        )

</template>

<script>
import { createUser } from '@/firebase/functions'

console.log(createUser)

export default {
  name: 'CreateUserForm',

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
      createUser(this.formData)
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
      this.$refs['CreateUserForm'].validate((valid) => {
        if (valid) {
          this.create()
        } else {
          this.message({
            messageKey: 'CreateUserForm.actions.submit.error',
          })
        }
      })
    },
  },
}
</script>
