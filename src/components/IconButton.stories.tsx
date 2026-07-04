import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { IconButton } from './IconButton'

const meta: Meta<typeof IconButton> = {
	title: 'Components/IconButton',
	component: IconButton,
	tags: ['autodocs'],
	args: {
		label: 'Speichern',
		children: <span>💾</span>,
		title: 'Icon Button',
		glowing: false,
		noBorder: true,
		transparent: true,
		asSubmit: false,
	},
	argTypes: {
		glowing: { control: 'boolean' },
		noBorder: { control: 'boolean' },
		transparent: { control: 'boolean' },
		asSubmit: { control: 'boolean' },
		onClick: { action: 'clicked' },
	},
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Default: Story = {}

export const OnlyIcon: Story = {
	args: {
		label: '',
		children: <span>🚀</span>,
		title: 'Warp aktivieren',
	},
}
