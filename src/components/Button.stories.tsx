import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		children: 'Klick mich!',
		title: 'Ein cooler 80er Button',
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
type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const Glowing: Story = {
	args: {
		glowing: true,
		transparent: false,
		noBorder: false,
		children: '✨ Cyberpunk Glow ✨',
		title: 'Leuchtender Button',
	},
}

export const WithBorder: Story = {
	args: {
		noBorder: false,
		transparent: false,
		children: 'Button mit Border',
		title: 'Klassischer Button',
	},
}

export const SubmitType: Story = {
	args: {
		asSubmit: true,
		children: 'Formular abschicken',
		title: 'Submit Button',
	},
}
