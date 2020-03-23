<template lang="pug">
  .ContentTypesForm
    el-row(:gutter="20")
      el-col(:xs="24" :sm="24" :md="12" :lg="12" :xl="12")
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
          
          el-form-item(
            :label="$t('ContentTypesForm.fields.description.label')"
            prop="description"
            )
            el-input(
              type="text"
              v-model="formData.description"
            )
          
          el-form-item(
            :label="$t('ContentTypesForm.fields.items.label')"
            prop="fields"
            )
            FieldsList(v-model="formData.fields")
          
          el-form-item(
            :label="$t('ContentTypesForm.fields.formConfig.label')"
            prop="formConfig"
            )
            el-collapse.ContentTypesForm-formConfig(v-model="activeFieldGroup" accordion)
              el-collapse-item(
              :title="$t('ContentTypesForm.fields.formConfig.open')"
              name="formConfig"
              )
                FormConfig(v-model="formData.formConfig")
          
          el-form-item
            el-button(
              native-type="submit"
              type="primary"
              v-text="$t('ContentTypesForm.actions.submit.label')"
              )

      el-col.ContentTypesForm-preview(:xs="24" :sm="24" :md="12" :lg="12" :xl="12")
        h3.ContentTypesForm-preview-title {{$t('ContentTypesForm.preview.title')}}
        FormRender(:config="formData")
</template>

<script>
import {
  Button,
  Col,
  Collapse,
  CollapseItem,
  Form,
  FormItem,
  Input,
  Message,
  Row,
} from 'element-ui'
import FieldsList from '@/components/ContentTypes/FieldsList'
import FormConfig from '@/components/ContentTypes/FormConfig'
import FormRender from '@/components/ContentTypes/FormRender'
import firestoreContentTypes from '@/firebase/collections/contentTypes'
import '@/directives/blockNavOnChange'

export default {
  name: 'ContentTypesForm',

  components: {
    [Button.name]: Button,
    [Col.name]: Col,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Row.name]: Row,
    FieldsList,
    FormConfig,
    FormRender,
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
      activeFieldGroup: null,
      itemRef: null,
      formData: {
        name: '',
        description: '',
        fields: [],
        formConfig: {
          disabled: false,
          hideRequiredAsterisk: false,
          inline: false,
          inlineMessage: false,
          labelPosition: 'top',
          labelSuffix: null,
          labelWidth: null,
          showMessage: true,
          size: null,
          statusIcon: false,
          validateOnRuleChange: true,
        },
      },
      formRules: {
        name: [
          {
            message: this.$t('validation.required'),
            required: true,
            trigger: 'blur',
          },
          {
            message: this.$t('validation.min', { min: 5 }),
            min: 5,
            trigger: 'blur',
          },
        ],
        description: [
          {
            message: this.$t('validation.required'),
            required: true,
            trigger: 'blur',
          },
          {
            message: this.$t('validation.min', { min: 5 }),
            min: 5,
            trigger: 'blur',
          },
        ],
        fields: [
          {
            message: this.$t('validation.required'),
            required: true,
            trigger: 'blur',
          },
        ],
        formConfig: [
          {
            message: this.$t('validation.required'),
            required: true,
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
        Message({
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
<style lang="stylus">
.ContentTypesForm
  position relative

  &-preview
    border 1px solid #DCDFE6
    box-shadow 0 2px 12px 0 rgba(0,0,0,0.1)
    position sticky
    top 0

    &-title
      background-color #dcdfe6
      color #303133
      margin 0 -10px 30px
      padding 15px
      text-align center

  &-formConfig
    border 1px solid #dcdfe6
    border-radius 4px
    padding 1px 15px

    .el-collapse-item
      &__header
        border-bottom 0
      &__wrap
        border-bottom 0
      &__content
        padding-bottom 0
</style>
