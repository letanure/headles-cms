<template lang="pug">
  .FormRender
    h1 FormRender
    el-form(
      :model="dataForm" 
      label-width="120px"
      ref="dataForm"
      )
      el-form-item(
        :key="field.created" 
        :label="field.label"
        :prop="field.name"
        v-for="(field, index) in config.items"
        )
        el-input(v-bind="field" v-model="dataForm[field.name]")
</template>

<script>
import { Form, FormItem, Input } from 'element-ui'

export default {
  name: 'FormRender',

  components: {
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Option.name]: Option,
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
}
</script>

<style lang="stylus">
.FormRender
  border 1px solid #DCDFE6
  padding 15px
</style>
