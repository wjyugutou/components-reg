import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3'
import { expect, fn, userEvent, within } from '@storybook/test'
import { YButton, YButtonGroup } from 'yugutou-ui'

type Story = StoryObj<typeof YButton> & { argTypes?: ArgTypes }

const meta: Meta<typeof YButton> = {
  title: 'Example/Button',
  component: YButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'danger', 'info', ''],
    },
    size: {
      control: { type: 'select' },
      options: ['large', 'default', 'small', 'mini', ''],
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    throttled: {
      control: 'boolean',
    },
    throttleDuration: {
      control: 'number',
    },
    autofocus: {
      control: 'boolean',
    },
    tag: {
      control: { type: 'select' },
      options: ['button', 'a', 'div'],
    },
    nativeType: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset', ''],
    },
    icon: {
      control: { type: 'text' },
    },
    loadingIcon: {
      control: { type: 'text' },
    },
  },
  args: {
    onClick: fn(),
  },
}

function container(val: string) {
  return `<div style="margin: 5px;">
            ${val}
          </div>
        `
}

export const Default: Story = {
  argTypes: {
    content: {
      control: { type: 'text' },
    },
  },
  args: {
    type: 'primary',
    content: 'Button',
  },
  render: args => ({
    components: { YButton },
    setup() {
      return { args }
    },
    template: container(`<YButton v-bind="args">{{ args.content }}</YButton>`),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    await step('click button', async () => {
      await userEvent.tripleClick(canvas.getByRole('button'))
    })

    expect(args.onClick).toHaveBeenCalled()
  },
}

export const Circle: Story = {
  args: {
    icon: 'search',
    type: 'primary',
  },
  render: args => ({
    components: { YButton },
    setup() {
      return { args }
    },
    template: container(`
      <YButton circle v-bind="args"/>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    await step('click button', async () => {
      await userEvent.click(canvas.getByRole('button'))
    })

    expect(args.onClick).toHaveBeenCalled()
  },
}

export const Group: Story = {
  args: {
    type: 'primary',
  },
  render: args => ({
    components: { YButtonGroup, YButton },
    setup() {
      return { args }
    },
    template: container(`
      <YButtonGroup v-bind="args">
        <YButton>Button 1</YButton>
        <YButton>Button 2</YButton>
        <YButton>Button 3</YButton>
      </YButtonGroup>
    `),
  }),
}

Circle.parameters = {}

export default meta
