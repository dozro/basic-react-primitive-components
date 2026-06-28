import type { Meta, StoryObj } from '@storybook/react'
import { ErrorMessage } from './ErrorMessage'

const meta: Meta<typeof ErrorMessage> = {
	title: 'Components/ErrorMessage',
	component: ErrorMessage,
	tags: ['autodocs'],
	args: {
		error: new Error('Subraum-Verzerrung im Core-Antrieb festgestellt!'),
		variant: 'critical',
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['critical', 'warning'],
		},
	},
}

export default meta
type Story = StoryObj<typeof ErrorMessage>

export const Critical: Story = {}

export const Warning: Story = {
	args: {
		variant: 'warning',
		error: new Error('Heizsequenz verzögert sich um 10 Sekunden.'),
	},
}