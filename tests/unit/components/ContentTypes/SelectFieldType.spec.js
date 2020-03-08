import { shallowMount } from '@vue/test-utils'
import Component from '@/components/ContentTypes/SelectFieldType.vue'
require('babel-plugin-require-context-hook/register')()

describe(`${Component.name}.vue`, () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Component, {
      propsData: {
        value: 'text'
      },
      mocks: {
        $t: (msg) => msg,
      },
    })
  })

  describe('smoke tests', () => {
    it('should render', () => expect(wrapper.exists()).toBe(true))
    it('matches snapshot', () => expect(wrapper.element).toMatchSnapshot())
  })
})
