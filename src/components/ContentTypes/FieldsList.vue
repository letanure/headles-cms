<template lang="pug">
  .FieldsList
    transition-group(name="flip-list" tag="div" mode="out-in") 
      el-card(
        :key="item.created"
        v-for="(item, index) in itemsFields"
        )
        el-row
          el-col(:span="24")
            FieldConfig(v-model="itemsFields[index]")
        el-row
          el-col(:span="24")
            el-button(
              @click="remove(index)"
              type="danger"
              size="small"
              ) 
              i.el-icon-delete
              span {{ $t('general.actions.delete.label')}}
    el-button(
      @click="add"
    ) {{ $t('general.actions.add.label')}}
</template>

<script>
import { Button, Card, Col, Option, Row, Select } from 'element-ui'
import FieldConfig from '@/components/ContentTypes/FieldConfig'

export default {
  name: 'FieldsList',

  components: {
    [Button.name]: Button,
    [Card.name]: Card,
    [Col.name]: Col,
    [Option.name]: Option,
    [Row.name]: Row,
    [Select.name]: Select,
    FieldConfig,
  },

  props: {
    value: {
      default: () => [],
      required: true,
      type: Array,
    },
  },

  computed: {
    itemsFields: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },

  methods: {
    add() {
      this.itemsFields.push({
        created: Date.now(),
        type: 'text',
      })
    },

    remove(indexRemove) {
      this.itemsFields = this.itemsFields.filter(
        (item, index) => index !== indexRemove,
      )
    },
  },
}
</script>

<style lang="stylus">
.FieldsList
  border 1px solid #DCDFE6
  padding 15px
  line-height 40px
  border-radius 4px
  .el-card
    margin-bottom 10px
    &__body
      padding 10px

  .flip-list
    &-move
      transition all .5s
      opacity .75
    &-enter-active, &-leave-active
      transition all .5s
    &-enter, &-leave-to
      opacity 0
</style>
