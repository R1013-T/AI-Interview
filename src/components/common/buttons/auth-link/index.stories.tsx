import type { Meta, StoryObj } from '@storybook/react'

import AuthLink from '.'

const meta = {
  title: 'AuthLink',
  component: AuthLink,
} as Meta<typeof AuthLink>

export default meta

type Story = StoryObj<typeof AuthLink>

export const Default: Story = {}
