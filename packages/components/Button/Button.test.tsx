import type { ButtonSize, ButtonType } from './types'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Icon from '../Icon/Icon.vue'
import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'

describe('button.vue', () => {
  const onClick = vi.fn()

  // it('basic button', async () => {
  //   const wrapper = mount(() => (
  //     <Button type="primary" {...{ onClick }}>
  //       button content
  //     </Button>
  //   ))

  //   // class
  //   expect(wrapper.classes()).toContain('er-button--primary')

  //   // slot
  //   expect(wrapper.get('button').text()).toBe('button content')

  //   // events
  //   await wrapper.get('button').trigger('click')
  //   expect(onClick).toHaveBeenCalledOnce()
  // })

  it('disabled button', async () => {
    const wrapper = mount(() => (
      <Button disabled {...{ onClick }}>
        disabled button
      </Button>
    ))

    // class
    expect(wrapper.classes()).toContain('is-disabled')

    // attrs
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').element.disabled).toBeTruthy()

    // events
    await wrapper.get('button').trigger('click')
    // expect(onClick).toHaveBeenCalledOnce()
    expect(onClick).toHaveBeenCalledTimes(0)
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('loading button', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
      slots: {
        default: 'loading button',
      },
      global: {
        stubs: ['YIcon'],
      },
    })

    // class
    expect(wrapper.classes()).toContain('is-loading')

    // attrs
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').element.disabled).toBeTruthy()

    // events
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')

    // icon
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
  })

  it('icon button', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-up',
      },
      slots: {
        default: 'icon button',
      },
      global: {
        stubs: ['YIcon'],
      },
    })

    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('arrow-up')
  })

  // Props: type
  it('should has the correct type class when type prop is set', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info']
    types.forEach((type) => {
      const wrapper = mount(Button, {
        props: { type: type as ButtonType },
      })
      expect(wrapper.classes()).toContain(`y-button--${type}`)
    })
  })

  // Props: size
  it('should has the correct size class when size prop is set', () => {
    const sizes = ['large', 'default', 'small', 'mini']
    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        props: { size: size as ButtonSize },
      })
      expect(wrapper.classes()).toContain(`y-button--${size}`)
    })
  })

  // Test the click event with and without throttle
  it.each([
    ['withoutThrottle', false],
    ['withThrottle', true],
  ])('emits click event %s', async (_, throttled) => {
    const clickSpy = vi.fn()
    const wrapper = mount(() => (
      <Button
        onClick={clickSpy}
        {...{
          throttled,
          throttleDuration: 400,
        }}
      />
    ))

    await wrapper.get('button').trigger('click')
    await wrapper.get('button').trigger('click')
    await wrapper.get('button').trigger('click')
    expect(clickSpy).toBeCalledTimes(throttled ? 1 : 3)
  })

  // Props: plain, round, circle
  it.each([
    ['plain', 'is-plain'],
    ['round', 'is-round'],
    ['circle', 'is-circle'],
  ])(
    'should has the correct class when prop %s is set to true',
    (prop, className) => {
      const wrapper = mount(Button, {
        props: { [prop]: true },
        global: {
          stubs: ['YIcon'],
        },
      })
      expect(wrapper.classes()).toContain(className)
    },
  )

  it('should has the correct native type attribute when native-type prop is set', () => {
    const wrapper = mount(Button, {
      props: { nativeType: 'submit' },
    })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect((wrapper.element as any).type).toBe('submit')
  })

  // Props: tag
  it('should renders the custom tag when tag prop is set', () => {
    const wrapper = mount(Button, {
      props: { tag: 'a' },
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('a')
  })

  // Events: click
  it('should emits a click event when the button is clicked', async () => {
    const wrapper = mount(Button, {})
    await wrapper.trigger('click')
    expect(wrapper.emitted().click).toHaveLength(1)
  })
})

describe('buttonGroup.vue', () => {
  it('basic button group', async () => {
    const wrapper = mount(() => (
      <ButtonGroup>
        <Button>button 1</Button>
        <Button>button 2</Button>
      </ButtonGroup>
    ))

    expect(wrapper.classes()).toContain('y-button-group')
  })

  it('button group size', () => {
    const sizes = ['large', 'default', 'small']
    sizes.forEach((size) => {
      const wrapper = mount(() => (
        <ButtonGroup size={size as any}>
          <Button>button 1</Button>
          <Button>button 2</Button>
        </ButtonGroup>
      ))

      const buttonWrapper = wrapper.findComponent(Button)
      expect(buttonWrapper.classes()).toContain(`y-button--${size}`)
    })
  })

  it('button group type', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info']
    types.forEach((type) => {
      const wrapper = mount(() => (
        <ButtonGroup type={type as any}>
          <Button>button 1</Button>
          <Button>button 2</Button>
        </ButtonGroup>
      ))

      const buttonWrapper = wrapper.findComponent(Button)
      expect(buttonWrapper.classes()).toContain(`y-button--${type}`)
    })
  })

  it('button group disabled', () => {
    const wrapper = mount(() => (
      <ButtonGroup disabled>
        <Button>button 1</Button>
        <Button>button 2</Button>
      </ButtonGroup>
    ))

    const buttonWrapper = wrapper.findComponent(Button)
    expect(buttonWrapper.classes()).toContain(`is-disabled`)
  })
})
