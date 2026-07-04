import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { Box } from './Box'

const meta: Meta<typeof Box> = {
	title: 'Components/Box',
	component: Box,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'navbar', 'dock'],
		},
		orientation: {
			control: 'select',
			options: ['none', 'horizontal', 'vertical'],
		},
		align: {
			control: 'select',
			options: ['none', 'left', 'center', 'right'],
		},
		justify: {
			control: 'select',
			options: ['none', 'start', 'end', 'center', 'evenly', 'spaceBetween'],
		},
		as: {
			control: 'select',
			options: ['div', 'nav', 'footer', 'main', 'article', 'aside', 'section', 'header'],
		},
		gap: {
			control: 'number',
		},
		isolate: {
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
		variant: 'default',
		orientation: 'none',
		align: 'none',
		justify: 'none',
		gap: 0,
		isolate: false,
		background: 'teal',
		children: (
			<>
				<div style={{ padding: '1rem', borderRadius: '0.25rem' }}>Block 1</div>
				<div style={{ padding: '1rem', backgroundColor: '#cbd5e1', borderRadius: '0.25rem' }}>
					Block 2
				</div>
				<div style={{ padding: '1rem', borderRadius: '0.25rem' }}>Block 3</div>
			</>
		),
	},
}

export default meta
type Story = StoryObj<typeof Box>

export const Default: Story = {}

export const HorizontalRow: Story = {
	args: {
		orientation: 'horizontal',
		gap: 4,
		justify: 'start',
		align: 'center',
	},
}

export const VerticalStack: Story = {
	args: {
		orientation: 'vertical',
		gap: 2,
	},
}

export const NavbarLayout: Story = {
	args: {
		variant: 'navbar',
		as: 'nav',
		orientation: 'horizontal',
		justify: 'spaceBetween',
		align: 'center',
		className: 'w-full bg-slate-800 p-4 text-white',
		children: (
			<>
				<div>🚀 LogoSpace</div>
				<Box orientation="horizontal" gap={4}>
					<a>Home</a>
					<a>About</a>
				</Box>
			</>
		),
	},
}
