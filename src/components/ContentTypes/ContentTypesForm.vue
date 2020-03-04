<template lang="pug">
  el-form.ContentTypesForm(
    :model="formData"
    :rules="formRules"
    @submit.native.prevent="submit('ContentTypesForm')"
    label-position="top"
    novalidate
    ref="ContentTypesForm"
    status-icon
    v-blockNavOnChange="{...formData, id}"
    )

    el-form-item(
      :label="$t('ContentTypesForm.fields.name.label')"
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
        v-text="$t('ContentTypesForm.actions.submit.label')"
        )
</template>

<script>
import firestoreContentTypes from '@/firebase/collections/contentTypes.js'
import '@/directives/blockNavOnChange.js'

export default {
  name: 'ContentTypesForm',

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
      firestoreContentTypes
        .addItem(this.formData)
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
      firestoreContentTypes.updateItem(this.id, this.formData).then(() => {
        this.$emit('success')
      })
    },

    async loadData() {
      firestoreContentTypes.getItem(this.id).then((data) => {
        this.formData = data.data
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
      this.$refs['ContentTypesForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('general/allowNavigation')
          if (this.id !== null) {
            this.update()
          } else {
            this.create()
          }
        } else {
          this.message({
            messageKey: 'ContentTypesForm.actions.submit.error',
          })
        }
      })
    },
  },
}
</script>
