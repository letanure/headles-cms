<template lang="pug">
  .FormConfig
    el-form.FormConfigForm(
      :model="config"
      :rules="formRules"
      label-position="left"
      label-width="140px"
      novalidate
      ref="FormConfigForm"
      size="small"
      status-icon
      )
      el-form-item(
        :label="$t('FormConfig.fields.labelSuffix.label')"
        prop="labelSuffix"
        )
        el-input(
          v-model="config.labelSuffix"
          )

      el-form-item(
        :label="$t('FormConfig.fields.size.label')"
        prop="size"
        )
        el-select(
          v-model="config.size"
          )
          el-option(:label="$t('FormConfig.fields.size.option.default')" value="default")
          el-option(:label="$t('FormConfig.fields.size.option.medium')" value="medium")
          el-option(:label="$t('FormConfig.fields.size.option.small')" value="small")
          el-option(:label="$t('FormConfig.fields.size.option.mini')" value="mini")

      el-form-item(
        :label="$t('FormConfig.fields.labelPosition.label')"
        prop="labelPosition"
        )
        el-select(
          v-model="config.labelPosition"
          )
          el-option(:label="$t('FormConfig.fields.labelPosition.top')" value="top")
          el-option(:label="$t('FormConfig.fields.labelPosition.right')" value="right")
          el-option(:label="$t('FormConfig.fields.labelPosition.left')" value="left")

      el-form-item(
        :label="$t('FormConfig.fields.labelWidth.label')"
        prop="labelWidth"
        )
        el-input-number(
          v-model="config.labelWidth"
          :step="10"
          )

      el-form-item(
        :label="$t('FormConfig.fields.inline.label')"
        prop="inline"
        )
        el-switch(
          v-model="config.inline"
          )

      el-form-item(
        :label="$t('FormConfig.fields.disabled.label')"
        prop="disabled"
        )
        el-switch(
          v-model="config.disabled"
          )

      el-form-item(
        :label="$t('FormConfig.fields.statusIcon.label')"
        prop="statusIcon"
        )
        el-switch(
          v-model="config.statusIcon"
          )

      el-form-item(
        :label="$t('FormConfig.fields.showMessage.label')"
        prop="showMessage"
        )
        el-switch(
          v-model="config.showMessage"
          )

      el-form-item(
        :label="$t('FormConfig.fields.inlineMessage.label')"
        prop="inlineMessage"
        )
        el-switch(
          v-model="config.inlineMessage"
          )

      el-form-item(
        :label="$t('FormConfig.fields.hideRequiredAsterisk.label')"
        prop="hideRequiredAsterisk"
        )
        el-switch(
          v-model="config.hideRequiredAsterisk"
          )
</template>

<script>
import {
  Form,
  FormItem,
  Input,
  InputNumber,
  Option,
  Select,
  Switch,
} from 'element-ui'
import SelectFieldType from '@/components/ContentTypes/SelectFieldType'

export default {
  name: 'FormConfig',

  components: {
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [InputNumber.name]: InputNumber,
    [Option.name]: Option,
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
}
</script>

<style lang="stylus">
.FormConfig
  .el-form
    &-item
      margin-bottom 15px
      &__label
        float left
      &__error
        padding-top 0
</style>
