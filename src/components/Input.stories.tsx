import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
	title: 'Components/Input',
	component: Input,
	tags: ['autodocs'],
	args: {
		label: 'Benutzername',
		placeholder: 'Trage deinen Namen ein...',
		type: 'text',
		glowing: false,
	},
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}

export const Password: Story = {
	args: {
		label: 'Verschlüsselungscode',
		placeholder: '••••••••',
		type: 'password',
	},
}

export const Glowing: Story = {
	args: {
		label: 'Aktiviertes Terminal',
		placeholder: 'Eingabe erwartet...',
		glowing: true,
	},
}