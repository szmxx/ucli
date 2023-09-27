/*
 * @Author: cola
 * @Date: 2022-07-07 14:34:41
 * @LastEditors: cola
 * @Description:
 */
import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
describe('mount component', () => {
  it('mount component', async () => {
    const wrapper = mount(HelloWorld)
    expect(wrapper.text()).toContain('hello world')
    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.get('button').trigger('click')
    expect(wrapper.text()).toContain('greeting')
  })
})
