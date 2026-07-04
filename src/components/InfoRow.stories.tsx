import type { Meta, StoryObj } from '@storybook/react'
import { InfoRow } from './InfoRow'
import React from 'react'

const CircleIcon = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="10" cy="10" r="8" fill="currentColor" />
	</svg>
)

const meta = {
	title: 'Components/InfoRow',
	component: InfoRow,
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['xs', 'small', 'base', 'large', 'xl', '2xl'],
		},
		border: {
			control: 'boolean',
		},
		background: {
			control: 'select',
			options: [
				'teal',
				'yellow',
				'gray',
				'transparent',
				'magenta',
				'cyan',
				'amber',
				'lime',
				'indigo',
				'rose',
				'slate',
				'violet',
				'orange',
			],
		},
	},
	args: {
		icon: <CircleIcon />,
		children: 'This is an information row.',
		size: 'base',
		border: false,
	},
} satisfies Meta<typeof InfoRow>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ExtraSmall: Story = {
	args: {
		size: 'xs',
		children: 'Extra small text',
	},
}

export const Large: Story = {
	args: {
		size: 'large',
		children: 'Large information row',
	},
}

export const ExtraLarge: Story = {
	args: {
		size: '2xl',
		children: 'Extra large information row',
	},
}

export const LongContent: Story = {
	args: {
		children:
			'This is a longer piece of content that demonstrates how the InfoRow behaves when the text wraps across multiple lines.',
	},
}

export const CustomIcon: Story = {
	args: {
		icon: (
			<span role="img" aria-label="Location">
				📍
			</span>
		),
		children: 'Amsterdam, Netherlands',
	},
}
