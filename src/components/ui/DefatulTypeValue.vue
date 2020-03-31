<template lang="pug">
  .DefatulTypeValue()
    el-select(v-model="type")
      el-option(
        v-for="typeOption in typeOptions"
        :key="typeOption"
        :label="typeOption"
        :value="typeOption"
      )
    el-select(v-if="type === 'boolean'" v-model="localValue")
      el-option(label="true" :value="true")
      el-option(label="false" :value="false")
    el-input-number(v-if="type === 'number'" v-model="localValue")
    el-input(v-if="type === 'string'" v-model="localValue")
</template>

<script>
import { Input, InputNumber, Option, Select } from 'element-ui'

export default {
  name: 'DefatulTypeValue',

  components: {
    [Input.name]: Input,
    [InputNumber.name]: InputNumber,
    [Option.name]: Option,
    [Select.name]: Select,
  },

  props: {
    value: {
      default: '',
      required: true,
      type: [String, Boolean, Number],
    },
  },

  data() {
    return {
      type: 'boolean',
      typeOptions: ['boolean', 'number', 'string'], 
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

<style lang="stylus">
.DefatulTypeValue
  .el-select
    width 50%
    & + .el-select,
    & + .el-input-number,
    & + .el-input
      margin-left 15px
      width calc(50% - 15px)
</style>
