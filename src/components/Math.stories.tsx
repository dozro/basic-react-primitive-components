import type { Meta, StoryObj } from '@storybook/react'
import { InlineMath, BlockMath } from './Math'
import { Box } from '$components/Box'
import { Text } from '$components/Text'
import React from 'react'

const meta = {
	title: 'Components/Math',
	component: InlineMath,
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		latex: {
			control: 'text',
		},
	},
} satisfies Meta<typeof InlineMath>

export default meta

type Story = StoryObj<typeof meta>

export const Inline: Story = {
	args: {
		latex: String.raw`\frac{a}{b}=c`,
	},
	render: (args) => (
		<Text>
			This is an inline equation <InlineMath {...args} /> inside a sentence.
		</Text>
	),
}

export const InlineQuadratic: Story = {
	args: {
		latex: 'x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}',
	},
	render: (args) => (
		<Text>
			Quadratic formula: <InlineMath {...args} />
		</Text>
	),
}

export const Block: Story = {
	args: {
		latex: '\\int_0^\\infty e^{-x}\\,dx = 1',
	},
	render: (args) => <BlockMath latex={args.latex} padding="5" />,
}

export const Matrix: Story = {
	args: {
		latex: '\\begin{bmatrix}1 & 2\\\\3 & 4\\end{bmatrix}',
	},
	render: (args) => <BlockMath latex={args.latex} padding="5" />,
}

export const Mixed: Story = {
	args: {
		latex: String.raw`e^{i\pi}+1=0`,
	},
	render: (args) => (
		<Box orientation="vertical" gap={5}>
			<Text>
				Euler's identity:
				<InlineMath latex={args.latex} />
			</Text>

			<BlockMath latex={String.raw`\sum_{n=1}^{\infty}\frac{1}{n^2}=\frac{\pi^2}{6}`} padding="5" />

			<Text>
				Pythagorean theorem:
				<InlineMath latex={String.raw`a^2+b^2=c^2`} />
			</Text>
		</Box>
	),
}
