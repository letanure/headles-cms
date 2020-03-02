import Vue from 'vue'
import store from '@/store/'
import { cloneDeep, isEqual } from 'lodash-es'

let valueStored = false
let originalValue = null
let countDataChanged = 0

Vue.directive('formChange', {
  update: function(el, binding) {
    countDataChanged += 1
    const isEdit = binding.value.id !== null
    if (!valueStored && !isEdit) {
      originalValue = cloneDeep(binding.oldValue)
      valueStored = true
    }
    if (isEdit && countDataChanged === 2) {
      originalValue = cloneDeep(binding.value)
      valueStored = true
    }
    const hasChanges = !isEqual(originalValue, binding.value)
    store.dispatch('general/blockNavigation', hasChanges)
  },
})
