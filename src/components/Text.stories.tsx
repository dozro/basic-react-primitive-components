import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'

const meta: Meta<typeof Text> = {
	title: 'Components/Text',
	component: Text,
	tags: ['autodocs'],
	args: {
		children: 'Es ist ein logischer Schluss, dass gutes Design zeitlos ist.',
		as: 'span',
		font: 'normal',
		size: 'base',
		variant: 'default',
	},
	argTypes: {
		as: {
			control: 'select',
			options: ['p', 'span', 'label', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
		},
		font: {
			control: 'select',
			options: ['semibold', 'medium', 'bold', 'normal'],
		},
		size: {
			control: 'select',
			options: ['xs', 'small', 'base', 'large', 'xl', '2xl'],
		},
		variant: {
			control: 'select',
			options: ['default', 'title', 'wavy', 'muted'],
		},
		fontFamily: {
			control: 'select',
			options: ['sans', 'serif', 'mono', 'cousine'],
		},
	},
}

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = {}

export const Heading: Story = {
	args: {
		as: 'h1',
		children: 'Hauptüberschrift',
		variant: 'title',
		size: '2xl',
	},
}

export const LabelElement: Story = {
	args: {
		as: 'label',
		htmlFor: 'input-id',
		children: 'Formular-Label',
	},
}
