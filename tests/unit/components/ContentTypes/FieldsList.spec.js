import { shallowMount } from '@vue/test-utils'
import Component from '@/components/ContentTypes/FieldsList.vue'
require('babel-plugin-require-context-hook/register')()

describe(`${Component.name}.vue`, () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Component, {
      propsData: {
        value: [
          { name: 'A', type: 'text' },
          { name: 'B', type: 'radio' },
        ],
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
