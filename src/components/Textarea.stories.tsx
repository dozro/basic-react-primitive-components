import type { Meta, StoryObj } from '@storybook/react'
import { TextArea } from '$components/Textarea'

const meta: Meta<typeof TextArea> = {
	title: 'Components/TextArea',
	component: TextArea,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'inline-radio',
			options: ['default', 'filled'],
			description:
				'visual style variant of the textarea, controlling background, border, and text color.',
			table: {
				defaultValue: { summary: 'default' },
			},
		},
		isInvalid: {
			control: 'boolean',
			description:
				'visual state indicating that the input is invalid, applying error styles to the label and textarea.',
			table: {
				defaultValue: { summary: 'false' },
			},
		},
		disabled: {
			control: 'boolean',
			description:
				'determines whether the textarea is disabled, preventing user interaction and applying disabled styles.',
			table: {
				defaultValue: { summary: 'false' },
			},
		},
		label: {
			control: 'text',
			description:
				'Optional label text displayed above the textarea, providing context or instructions for the user.',
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder text displayed when the textarea is empty.',
		},
		classNames: {
			control: 'object',
			description: 'Allows overriding specific CSS slots (root, label, textarea).',
		},
	},
	args: {
		label: 'Description',
		placeholder: 'Enter your text here...',
		variant: 'default',
		isInvalid: false,
		disabled: false,
	},
}

export default meta
type Story = StoryObj<typeof TextArea>

export const Default: Story = {}

export const Filled: Story = {
	args: {
		variant: 'filled',
	},
}

export const Invalid: Story = {
	args: {
		isInvalid: true,
		label: 'Fehlerhafte Eingabe',
	},
}

export const Disabled: Story = {
	args: {
		disabled: true,
		label: 'Nicht editierbar',
		placeholder: 'Dieses Feld ist deaktiviert.',
	},
}
