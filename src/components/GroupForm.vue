<template lang="pug">
  el-form.GroupForm(
    :model="formData"
    :rules="formRules"
    @submit.native.prevent="submit('GroupForm')"
    label-position="top"
    novalidate
    ref="GroupForm"
    status-icon
    )

    el-form-item(
      :label="$t('GroupForm.fields.name.label')"
      prop="name"
      )
      el-input(
        type="text"
        v-model="formData.name"
      )

    el-form-item
      el-button(
        native-type="submit"
        type="primary"
        v-text="$t('GroupForm.actions.submit.label')"
        )

</template>

<script>
import { firestore, serverTimestamp } from '@/firebase/firestore'

export default {
  name: 'GroupForm',

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
        name: '',
      },
      formRules: {
        name: [
          {
            required: true,
            message: this.$t('validation.required'),
            trigger: 'blur',
          },
          {
            min: 5,
            message: this.$t('validation.min', { min: 5 }),
            trigger: 'blur',
          },
        ],
      },
    }
  },

  beforeMount() {
    if (this.id !== null) {
      this.loadData()
    }
  },

  methods: {
    create() {
      firestore
        .collection('groups')
        .add({
          status: 'ACTIVE',
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

    async loadData() {
      this.itemRef = firestore.doc(`groups/${this.id}`)
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
      this.$refs['GroupForm'].validate((valid) => {
        if (valid) {
          if (this.id !== null) {
            this.update()
          } else {
            this.create()
          }
        } else {
          this.message({
            messageKey: 'GroupForm.actions.submit.error',
          })
        }
      })
    },
  },
}
</script>
