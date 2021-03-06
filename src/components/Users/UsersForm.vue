<template lang="pug">
  el-form.UsersForm(
    :model="formData"
    :rules="formRules"
    @submit.native.prevent="submit('UsersForm')"
    label-position="top"
    novalidate
    ref="UsersForm"
    status-icon
    v-blockNavOnChange="{...formData, id}"
    )

    el-form-item(
      :label="$t('UsersForm.fields.name.label')"
      prop="name"
      )
      el-input(
        type="text"
        v-model="formData.name"
        )

    el-form-item(
      :label="$t('UsersForm.fields.email.label')"
      prop="email"
      )
      el-input(
        type="email"
        v-model="formData.email"
        )

    el-form-item(
      :label="$t('UsersForm.fields.password.label')"
      prop="password"
      )
      el-input(
        show-password
        type="password"
        v-model="formData.password"
      )

    el-form-item(
      :label="$t('UsersForm.fields.groups.label')"
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
        v-text="$t('UsersForm.actions.submit.label')"
        )

</template>

<script>
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Option,
  Select,
} from 'element-ui'
import { firestore } from '@/firebase/firestore'
import firestoreUsers from '@/firebase/collections/users'
import '@/directives/blockNavOnChange'

export default {
  name: 'UsersForm',

  components: {
    [Button.name]: Button,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Option.name]: Option,
    [Select.name]: Select,
  },

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
        groups: [
          {
            message: this.$t('validation.required'),
            required: true,
            trigger: 'blur',
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
      optionGroups: [],
    }
  },

  beforeMount() {
    this.loadGroups()
    if (this.id !== null) {
      this.loadDataUser()
      this.formRules.password[0].required = false
    }
  },

  methods: {
    create() {
      firestoreUsers
        .addItem(this.formData, 'NEW')
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
      firestoreUsers.updateItem(this.id, this.formData).then(() => {
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

    async loadDataUser() {
      firestoreUsers.getItem(this.id).then((data) => {
        this.formData = data.data
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
      this.$refs['UsersForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('general/allowNavigation')
          if (this.id !== null) {
            this.update()
          } else {
            this.create()
          }
        } else {
          this.message({
            messageKey: 'UsersForm.actions.submit.error',
          })
        }
      })
    },
  },
}
</script>
