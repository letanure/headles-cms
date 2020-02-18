<template lang="pug">
  el-form.UserFormCreate(
    :model="formData"
    :rules="formRules"
    @submit.native.prevent="submit('UserFormCreate')"
    label-position="top"
    novalidate
    ref="UserFormCreate"
    status-icon
    )

    el-form-item(
      :label="$t('UserFormCreate.fields.name.label')"
      prop="name"
      )
      el-input(
        type="text"
        v-model="formData.name"
      )

    el-form-item(
      :label="$t('UserFormCreate.fields.email.label')"
      prop="email"
      )
      el-input(
        type="email"
        v-model="formData.email"
      )

    el-form-item(
      :label="$t('UserFormCreate.fields.password.label')"
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
        v-text="$t('UserFormCreate.actions.submit.label')"
        )

</template>

<script>
import { firestore } from '@/firebase/firestore'
import { createUser, updateUser } from '@/firebase/functions'

export default {
  name: 'UserFormCreate',

  props: {
    uid: {
      default: null,
      required: false,
      type: String,
    },
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

  beforeMount() {
    if (this.uid !== null) {
      this.loadDataUser()
      this.formRules.password[0].required = false
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

    async update() {
      const dataUser = {
        uid: this.uid,
        ...this.formData,
      }
      updateUser(dataUser)
        .then(() => {
          this.$emit('success')
        })
        .catch((err) => {
          console.log(err)
          this.$emit('error', err)
          this.message({
            messageKey: err.code.replace(/\//g, '.').replace(/-/g, '_'),
          })
        })
      const request = firestore
        .collection('users')
        .where('uid', '==', this.uid)
        .get()
      const dataRequest = await request
      const snapshot = await dataRequest
      snapshot.docs[0].ref.update({
        displayName: this.formData.name,
        email: this.formData.email,
      })
    },

    async loadDataUser() {
      const request = firestore
        .collection('users')
        .where('uid', '==', this.uid)
        .get()
      const dataRequest = await request
      const snapshot = await dataRequest
      const data = snapshot.docs[0].data()
      this.formData.email = data.email
      this.formData.name = data.displayName
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
      this.$refs['UserFormCreate'].validate((valid) => {
        if (valid) {
          if (this.uid !== null) {
            this.update()
          } else {
            this.create()
          }
        } else {
          this.message({
            messageKey: 'UserFormCreate.actions.submit.error',
          })
        }
      })
    },
  },
}
</script>
