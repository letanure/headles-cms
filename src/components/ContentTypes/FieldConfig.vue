<template lang="pug">
  .FieldConfig
    el-form.FieldConfigForm(
      :model="config"
      :rules="formRules"
      label-position="left"
      label-width="140px"
      novalidate
      ref="FieldConfigForm"
      size="small"
      status-icon
      )
      el-form-item(
        label="Type"
        prop="type"
        )
        SelectFieldType(v-model="config.type" @input="changeFieldType")
      
      el-form-item(
        :key="propConfig.name"
        :label="$t(`propConfig.${propConfig.name}`)"
        :prop="propConfig.name"
        v-for="(propConfig, index) in inputTypes[config.type].props"
        )

        el-select(
          :filterable="propConfig.filterable"
          :placeholder="propConfig.placeholder"
          v-if="propConfig.is === 'el-select'"
          v-model="config[propConfig.name]"
          )
          el-option(
            v-for="option in propConfig.options"
            :key="option.value" 
            :label="option.label"
            :value="option.value"
            )
            template(v-if="propConfig.custom === 'icon'")
              div.select-icon
                span(:class="option.value")
                span(v-text="option.label")
        
        el-radio-group(
          v-else-if="propConfig.is === 'el-radio-group'"
          v-model="config[propConfig.name]"
          )
          el-radio-button(
            v-for="option in propConfig.options"
            :key="option.value" 
            :label="option.value"
            )
            span(v-text="option.label")
        
        component(
          :is="propConfig.is" 
          v-else
          v-model="config[propConfig.name]"
          )
      
    //- pre {{ config }}
</template>

<script>
import {
  Col,
  Form,
  FormItem,
  Input,
  InputNumber,
  Option,
  RadioButton,
  RadioGroup,
  Row,
  Select,
  Switch,
} from 'element-ui'
import SelectFieldType from '@/components/ContentTypes/SelectFieldType'
import InputTypes from '@/components/ContentTypes/FieldTypes.ts'

export default {
  name: 'FieldConfig',

  components: {
    [Col.name]: Col,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [InputNumber.name]: InputNumber,
    [Option.name]: Option,
    [RadioButton.name]: RadioButton,
    [RadioGroup.name]: RadioGroup,
    [Row.name]: Row,
    [Select.name]: Select,
    [Switch.name]: Switch,
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
      inputTypes: InputTypes,
      formRules: {
        type: [
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
        ],
        label: [
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

  methods: {
    changeFieldType() {
      const fieldDefaults = {}
      Object.values(InputTypes[this.config.type].props).forEach((prop) => {
        fieldDefaults[prop.name] = this.config[prop.name] || prop.value
      })
      this.config = {
        created: this.config.created,
        type: this.config.type,
        ...fieldDefaults,
      }
    },
  },
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
