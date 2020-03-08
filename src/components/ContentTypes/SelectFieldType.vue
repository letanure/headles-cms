<template lang="pug">
  el-select.SelectField(v-model="localValue" placeholder="Select")
    el-option(
      v-for="option in fieldOptions"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    )
</template>

<script>
import { Option, Select } from 'element-ui'

export default {
  name: 'SelectFieldType',

  components: {
    [Option.name]: Option,
    [Select.name]: Select,
  },

  props: {
    value: {
      default: 'text',
      required: true,
      type: String,
    },
  },

  data() {
    return {
      fieldOptions: [
        {
          label: this.$t('fieldTyle.checkbox.label'),
          value: 'checkbox',
        },
        {
          label: this.$t('fieldTyle.color.label'),
          value: 'color',
        },
        {
          label: this.$t('fieldTyle.date.label'),
          value: 'date',
        },
        {
          label: this.$t('fieldTyle.email.label'),
          value: 'email',
        },
        {
          label: this.$t('fieldTyle.month.label'),
          value: 'month',
        },
        {
          label: this.$t('fieldTyle.number.label'),
          value: 'number',
        },
        {
          label: this.$t('fieldTyle.password.label'),
          value: 'password',
        },
        {
          label: this.$t('fieldTyle.radio.label'),
          value: 'radio',
        },
        {
          label: this.$t('fieldTyle.range.label'),
          value: 'range',
        },
        {
          label: this.$t('fieldTyle.tel.label'),
          value: 'tel',
        },
        {
          label: this.$t('fieldTyle.text.label'),
          value: 'text',
        },
        {
          label: this.$t('fieldTyle.time.label'),
          value: 'time',
        },
        {
          label: this.$t('fieldTyle.url.label'),
          value: 'url',
        },
        {
          label: this.$t('fieldTyle.week.label'),
          value: 'week',
        },
      ],
    }
  },

  computed: {
    localValue: {
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
