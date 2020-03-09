<template lang="pug">
  el-select.SelectField(v-model="localValue" placeholder="Select")
    el-option(
      v-for="option in fieldOptions"
      :key="option.value"
      :label="$t(`fieldType.${option.value}`)"
      :value="option.value"
    )
</template>

<script>
import InputTypes from '@/components/ContentTypes/FieldTypes.ts'
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

  computed: {
    fieldOptions() {
      return Object.values(InputTypes).map((InputType) => ({
        value: InputType.type,
      }))
    },
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
