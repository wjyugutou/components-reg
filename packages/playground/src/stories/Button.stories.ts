import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3'
import { expect, fn, userEvent, within } from '@storybook/test'
import { YButton } from '@yugutou/comps'

type Story = StoryObj<typeof YButton> & { argTypes: ArgTypes }

const meta: Meta<typeof YButton> = {
  title: 'Example/Button',
  component: YButton,
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
</div>`
}

export const Default: Story & { args: { content: string } } = {
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

export default meta
