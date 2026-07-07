import type { Meta, StoryObj } from '@storybook/react'
import CodeEditor from '$components/CodeEditor'

const meta: Meta<typeof CodeEditor> = {
	title: 'Components/CodeEditor',
	component: CodeEditor,
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
		language: {
			control: 'text',
			description: 'Specifies the programming language for syntax highlighting.',
		},
	},
	args: {
		label: 'Description',
		placeholder: 'Enter your text here...',
		language: 'javascript',
		variant: 'default',
		isInvalid: false,
		disabled: false,
	},
}

export default meta
type Story = StoryObj<typeof CodeEditor>

export const Default: Story = {}

export const Java: Story = {
	args: {
		language: 'java',
		placeholder:
			'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
	},
}

export const JavaScript: Story = {
	args: {
		language: 'javascript',
		placeholder: 'console.log("Hello, World!");',
	},
}

export const Disabled: Story = {
	args: {
		disabled: true,
		label: 'Nicht editierbar',
		placeholder: 'Dieses Feld ist deaktiviert.',
	},
}
