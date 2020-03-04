import Vue from 'vue'
import store from '@/store/'
import { cloneDeep, isEqual } from 'lodash-es'

let valueStored = false
let originalValue = null

Vue.directive('blockNavOnChange', {
  update: function(el, binding) {
    const isEdit = binding.value.id !== null
    if (!valueStored && !isEdit) {
      originalValue = cloneDeep(binding.oldValue)
      valueStored = true
    }
    if (!valueStored && isEdit) {
      originalValue = cloneDeep(binding.value)
      valueStored = true
    }
    const hasChanges = !isEqual(originalValue, binding.value)
    store.dispatch('general/blockNavigation', hasChanges)
  },
})
