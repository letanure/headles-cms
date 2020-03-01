import Vue from 'vue'
import store from '@/store/'
import { cloneDeep, isEqual } from 'lodash-es'

let firstValue = true
let originalValue = null

Vue.directive('formChange', {
  update: function(el, binding) {
    if (firstValue && binding.value.id === null) {
      originalValue = cloneDeep(binding.oldValue)
    }
    if (firstValue && binding.value.id !== null) {
      originalValue = cloneDeep(binding.value)
    }
    firstValue = false
    const hasChanges = !isEqual(originalValue, binding.value)
    store.dispatch('general/formChanged', hasChanges)
  },
})
