<template lang="pug">
  el-form.LoginForm(
    :model="formData"
    :rules="formRules"
    label-position="top"
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
        @click="submitForm('addForm')"
        type="primary"
        v-text="$t('LoginForm.actions.submit.label')"
        )

</template>

<script>
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
            required: true,
            message: this.$t('validation.required'),
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    sendLogin() {
      //
    },

    submitForm() {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.sendLogin()
        } else {
          this.$message({
            type: 'danger',
            message: this.$t('LoginForm.actions.submit.error'),
          })
          return false
        }
      })
    },
  },
}
</script>
