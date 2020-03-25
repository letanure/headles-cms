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
      el-collapse(v-model="activeArea" accordion)
        el-collapse-item(
          v-for="(group, indexGroup) in inputTypesPropsPerGroup"
          :key="indexGroup"
          :title="$t(`FieldConfig.group.${indexGroup}`)"
          :name="indexGroup"
          )
        
          el-form-item(
            v-if="indexGroup === 'basic'"
            :label="$t('propConfig.type')"
            prop="type"
            )
            SelectFieldType(v-model="config.type" @input="changeFieldType")
          
          el-form-item(
            :key="propConfig.name"
            :label="$t(`propConfig.${propConfig.name}`)"
            :prop="propConfig.name"
            v-for="(propConfig, index) in group"
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
            template(v-else-if="['min', 'max', 'precision'].includes(propConfig.name)")
              el-switch(
                v-model="optionalProps[propConfig.name]"
                @change="toggleMinMax(propConfig.name)"
              )
              el-input-number(
                v-if="optionalProps[propConfig.name]"
                v-model.number="config[propConfig.name]"
              )
            component(
              :clearable="true"
              :is="propConfig.is" 
              v-else
              v-model="config[propConfig.name]"
              )

        el-collapse-item(
          name="validation"
          :title="$t(`FieldConfig.group.validation`)"
          )
          el-form-item(
            :label="$t(`general.validation.type.label`)"
            )
            el-switch(
              v-model="optionalRules.type"
              @change="toggleRule('type')"
              )
            el-select(
              v-if="optionalRules.type"
              v-model="config.rules.type" 
              :placeholder="$t(`general.select.placeholder`)"
              )
              el-option(
                v-for="option in validationTypesOptions"
                :key="option"
                :label="$t(`general.validation.type.option.${option}.label`)"
                :value="option"
                )
          el-form-item(
            :label="$t('FieldConfig.rules.required')"
            )
            el-switch(
              v-model="config.rules.required"
              )
          el-form-item(
            :label="$t('FieldConfig.rules.pattern')"
            )
            el-switch(
              v-model="optionalRules.pattern"
              @change="toggleRule('pattern')"
              )
            el-input(
              v-if="optionalRules.pattern"
              v-model="config.rules.pattern"
            )
          el-form-item(
            :label="$t('FieldConfig.rules.min')"
            )
            el-switch(
              v-model="optionalRules.min"
              @change="toggleRule('min')"
              )
            el-input-number(
              :max="config.rules.max"
              v-if="optionalRules.min"
              v-model.integer="config.rules.min"
            )
          el-form-item(
            :label="$t('FieldConfig.rules.max')"
            )
            el-switch(
              v-model="optionalRules.max"
              @change="toggleRule('max')"
              )
            el-input-number(
              :min="config.rules.min"
              v-if="optionalRules.max"
              v-model.integer="config.rules.max"
              )
</template>

<script>
import {
  Collapse,
  CollapseItem,
  Form,
  FormItem,
  Input,
  InputNumber,
  Option,
  RadioButton,
  RadioGroup,
  Select,
  Switch,
} from 'element-ui'
import SelectFieldType from '@/components/ContentTypes/SelectFieldType'
import InputTypes from '@/components/ContentTypes/FieldTypes.ts'

export default {
  name: 'FieldConfig',

  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [InputNumber.name]: InputNumber,
    [Option.name]: Option,
    [RadioButton.name]: RadioButton,
    [RadioGroup.name]: RadioGroup,
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
      activeArea: 'basic',
      inputTypes: InputTypes,
      optionalRules: {
        max: false,
        min: false,
        pattern: false,
        type: false,
      },
      optionalProps: {
        max: false,
        min: false,
      },
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
      validationTypesOptions: [
        'date',
        'email',
        'float',
        'hex',
        'integer',
        'number',
        'regexp',
        'string',
        'url',
        // 'any',
        // 'array',
        // 'boolean',
        // 'enum',
        // 'method',
        // 'object',
      ],
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
    inputTypesPropsPerGroup() {
      const groups = {
        basic: [],
        advanced: [],
      }
      const basicTypes = ['name', 'label']
      Object.values(InputTypes[this.config.type].props).forEach((prop) => {
        if (basicTypes.includes(prop.name)) {
          groups.basic.push(prop)
        } else {
          groups.advanced.push(prop)
        }
      })
      return groups
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
        rules: this.config.rules,
        ...fieldDefaults,
      }
    },

    toggleMinMax(propConfigName) {
      if (!this.optionalProps[propConfigName]) {
        this.$delete(this.config, propConfigName)
      }
    },

    toggleRule(ruleValidation) {
      if (!this.optionalRules[ruleValidation]) {
        this.$delete(this.config.rules, ruleValidation)
      }
    },
  },
}
</script>

<style lang="stylus">
.FieldConfig
  .el-form
    &-item
      margin-bottom 15px
      &__label
        float left
      &__error
        padding-top 0

  .el-switch + .el-input-number,
  .el-switch + .el-input,
  .el-switch + .el-select
    margin-left 10px

  .el-switch + .el-input
    width auto

  .el-collapse
    border 0
    &-item
      &:last-child .el-collapse-item__header
        border-bottom 0
      &__header
        height 40px
        line-height 40px
        color #606266
      &__content
        padding-bottom 0px
</style>
