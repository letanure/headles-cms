<template lang="pug">
  .FieldsList
    transition-group(name="flip-list" tag="div" mode="out-in") 
      el-card.FieldsList-item(
        :key="item.created"
        v-for="(item, index) in itemsFields"
        )
        el-row(:gutter="20")
          el-col(:span="19")
            div.FieldsList-item-title
              el-tag.FieldsList-item-title-type(v-if="item.type" effect="plain" size="small") {{ $t(`fieldType.${item.type}`) }}
              span.FieldsList-item-title-label(v-if="item.label") {{ item.label }}
          el-col(:span="5")
            el-button(
              @click="toggleShowConfig(index)"
              type="info"
              size="small"
              plain
              )
              i.el-icon-setting
            el-button(
              @click="remove(index)"
              type="danger"
              size="small"
              plain
              ) 
              i.el-icon-delete
              //- span {{ $t('general.actions.delete.label')}}
        transition(name="fade" mode="in-out")
          el-row(v-if="showFormConfig.includes(index)")
            el-col(:span="24")
              FieldConfig(v-model="itemsFields[index]")
    el-button(
      @click="add"
    ) {{ $t('general.actions.add.label')}}
</template>

<script>
import { Button, Card, Col, Option, Row, Select, Tag } from 'element-ui'
import FieldConfig from '@/components/ContentTypes/FieldConfig'
import InputTypes from '@/components/ContentTypes/FieldTypes.ts'

export default {
  name: 'FieldsList',

  components: {
    [Button.name]: Button,
    [Card.name]: Card,
    [Col.name]: Col,
    [Option.name]: Option,
    [Row.name]: Row,
    [Select.name]: Select,
    [Tag.name]: Tag,
    FieldConfig,
  },

  props: {
    value: {
      default: () => [],
      required: true,
      type: Array,
    },
  },

  data() {
    return {
      showFormConfig: [],
    }
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
      const fieldDefaults = {}
      InputTypes.text.props.forEach((prop) => {
        fieldDefaults[prop.name] = prop.value
      })
      this.showFormConfig.push(this.itemsFields.length)
      this.itemsFields.push({
        created: Date.now(),
        type: 'text',
        ...fieldDefaults,
      })
    },

    remove(indexRemove) {
      this.itemsFields = this.itemsFields.filter(
        (item, index) => index !== indexRemove,
      )
    },

    toggleShowConfig(index) {
      const isVisible = this.showFormConfig.includes(index)
      if (isVisible) {
        this.showFormConfig = this.showFormConfig.filter(
          (indexVisible) => indexVisible !== index,
        )
      } else {
        this.showFormConfig.push(index)
      }
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

  &-item
    &-title
      &-type
        margin-right 5px

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
