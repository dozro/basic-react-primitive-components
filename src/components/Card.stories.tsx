import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Card } from './Card'
import { Text } from './Text'

const meta: Meta<typeof Card> = {
	title: 'Components/Card',
	component: Card,
	tags: ['autodocs'],
	args: {
		noBorder: false,
		children: (
			<>
				<Text as="h3" style={{ margin: 0, marginBottom: '0.5rem' }}>
					Card Titel
				</Text>
				<Text as="p" style={{ margin: 0 }}>
					Das ist der Inhalt deiner wunderschönen Header-Komponente.
				</Text>
			</>
		),
		background: 'transparent',
	},
	argTypes: {
		background: {
			control: 'select',
			options: [
				'teal',
				'white',
				'yellow',
				'gray',
				'transparent',
				'magenta',
				'cyan',
				'lime',
				'indigo',
				'rose',
				'slate',
				'violet',
				'orange',
			],
		},
		noAnimation: {
			control: 'boolean',
		},
	},
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {}
