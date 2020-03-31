<template lang="pug">
  .FormRender
    el-form(
      :model="dataForm" 
      ref="dataForm"
      v-bind="config.formConfig"
      :labelWidth="config.formConfig.labelWidth ? `${config.formConfig.labelWidth}px` : ''"
      :size="config.formConfig.size"
      )
      transition-group(name="flip-list" tag="div" mode="out-in")  
        el-form-item(
          :key="field.created" 
          :label="field.label"
          :prop="field.name"
          :rules="field.rules"
          v-for="(field, index) in config.fields"
          )
          el-switch(v-if="field.type === 'switch'" v-bind="sanitizeFieldConfig(field)" v-model="dataForm[field.name]")
          el-input-number(v-else-if="field.type === 'number'" v-bind="sanitizeFieldConfig(field)" v-model.number="dataForm[field.name]")
          el-input(v-else v-bind="sanitizeFieldConfig(field)" v-model="dataForm[field.name]")
</template>

<script>
import { Form, FormItem, Input, InputNumber, Switch } from 'element-ui'

export default {
  name: 'FormRender',

  components: {
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [InputNumber.name]: InputNumber,
    [Option.name]: Option,
    [Switch.name]: Switch,
  },

  props: {
    config: {
      default: () => ({}),
      required: true,
      type: Object,
    },
  },

  data() {
    return {
      dataForm: {},
    }
  },

  computed: {
    componentName() {
      const componentRelations = {
        text: 'el-input',
        email: 'el-input',
        url: 'el-input',
        tel: 'el-input',
        password: 'el-input',
        textarea: 'el-input',
      }
      return componentRelations
    },
  },

  watch: {
    'config.items': {
      immediate: true,
      deep: true,
      handler(newItems) {
        const newFormdata = {}
        for (const index in newItems) {
          const item = newItems[index]
          newFormdata[item.name] = this.dataForm[item.name] || item.value
        }
        this.dataForm = newFormdata
      },
    },
  },

  methods: {
    sanitizeFieldConfig(fieldConfig) {
      if (fieldConfig.maxLength === null) {
        delete fieldConfig.maxLength
      }
      if (fieldConfig.minLength === null) {
        delete fieldConfig.min
      }
      if (fieldConfig.max === null) {
        delete fieldConfig.max
      }
      if (fieldConfig.min === null) {
        delete fieldConfig.min
      }
      if (fieldConfig.activeIconClass === 'no-icon') {
        delete fieldConfig.activeIconClass
      }
      if (fieldConfig.inactiveIconClass === 'no-icon') {
        delete fieldConfig.inactiveIconClass
      }
      if (fieldConfig.rules.min === null) {
        delete fieldConfig.rules.min
      }
      if (fieldConfig.rules.max === null) {
        delete fieldConfig.rules.max
      }
      if (fieldConfig.rules.pattern === null) {
        delete fieldConfig.rules.pattern
      }
      if (fieldConfig.rules.type === null) {
        delete fieldConfig.rules.type
      }
      return fieldConfig
    },
  },
}
</script>
