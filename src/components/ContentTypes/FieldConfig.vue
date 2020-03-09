<template lang="pug">
  .FieldConfig
    el-form.FieldConfigForm(
      :model="config"
      :rules="formRules"
      label-position="left"
      label-width="140px"
      novalidate
      ref="FieldConfigForm"
      status-icon
      )
      el-form-item(
        label="Type"
        prop="type"
        )
        SelectFieldType(v-model="config.type")
      el-form-item(
        label="Type"
        prop="type"
        )
        el-input(
          type="text"
          v-model="config.type"
          )
    //- pre {{ config }}
</template>

<script>
import { Col, Form, FormItem, Input, Row } from 'element-ui'
import SelectFieldType from '@/components/ContentTypes/SelectFieldType'
import InputTypes from '@/components/ContentTypes/FieldTypes.ts'

console.log(InputTypes)

export default {
  name: 'FieldConfig',

  components: {
    [Col.name]: Col,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Row.name]: Row,
    SelectFieldType,
  },

  props: {
    value: {
      default: () => ({}),
      required: true,
      type: Object,
    },
  },

  data() {
    return {
      formRules: {
        type: [
          {
            message: this.$t('validation.required'),
            required: true,
            trigger: 'blur',
          },
        ],
      },
    }
  },

  computed: {
    config: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },

  methods: {},
}
</script>

<style lang="stylus">
.FieldConfig
  .el-form
    &-item
      margin-bottom 10px
      &__label
        float left
</style>
