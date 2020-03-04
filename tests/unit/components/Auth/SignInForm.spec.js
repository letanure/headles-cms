import { shallowMount } from '@vue/test-utils'
import Component from '@/components/Auth/SignInForm.vue'

describe(`${Component.name}.vue`, () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Component, {
      propsData: {},
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
