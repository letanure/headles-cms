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
    
    el-form-item(
      :label="$t('UserFormCreate.fields.groups.label')"
      prop="groups"
      )
      el-select(v-model="formData.groups" filterable multiple placeholder="Select")
        el-option(
          :key="group.value"
          :label="group.label"
          :value="group.value"
          v-for="group in optionGroups"
        )

    el-form-item
      el-button(
        native-type="submit"
        type="primary"
        v-text="$t('UserFormCreate.actions.submit.label')"
        )

</template>

<script>
import { firestore, serverTimestamp } from '@/firebase/firestore'

export default {
  name: 'UserFormCreate',

  props: {
    id: {
      default: null,
      required: false,
      type: String,
    },
  },

  data() {
    return {
      itemRef: null,
      formData: {
        email: '',
        groups: [],
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
        groups: [
          {
            required: true,
            message: this.$t('validation.required'),
            trigger: 'blur',
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
      optionGroups: [],
    }
  },

  beforeMount() {
    if (this.id !== null) {
      this.loadDataUser()
      this.loadGroups()
      this.formRules.password[0].required = false
    }
  },

  methods: {
    create() {
      firestore
        .collection('users')
        .add({
          status: 'NEW',
          created: serverTimestamp,
          ...this.formData,
        })
        .then(() => {
          this.$emit('success')
        })
        .catch((err) => {
          this.$emit('error')
          this.message({
            messageKey: `auth.${err.code
              .replace(/\//g, '.')
              .replace(/-/g, '_')}`,
          })
        })
    },

    async update() {
      this.itemRef.update(this.formData).then(() => {
        this.$emit('success')
      })
    },

    async loadGroups() {
      const request = firestore
        .collection('groups')
        .where('status', '==', 'ACTIVE')
        .get()
      const dataRequest = await request
      const dataPromise = Promise.all(
        dataRequest.docs.map(async (user) => {
          return {
            id: user.id,
            ...user.data(),
          }
        }),
      )
      const data = await dataPromise
      this.optionGroups = data.map((group) => {
        return {
          value: group.id,
          label: group.name,
        }
      })
    },

    async loadData() {
      this.itemRef = firestore.doc(`groups/${this.id}`)
      const request = await this.itemRef.get()
      this.formData = request.data()
    },

    async loadDataUser() {
      this.itemRef = firestore.doc(`users/${this.id}`)
      const request = await this.itemRef.get()
      this.formData = request.data()
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
          if (this.id !== null) {
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
