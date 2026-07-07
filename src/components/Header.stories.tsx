import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Card } from './Card'
import { Text } from './Text'
import { Header } from './Header'

const meta: Meta<typeof Header> = {
	title: 'Components/Header',
	component: Card,
	tags: ['autodocs'],
	args: {
		noBorder: false,
		children: (
			<Header style={{ padding: '1rem' }}>
				<Text as="h3" style={{ margin: 0, marginBottom: '0.5rem' }}>
					Card Titel
				</Text>
				<Text as="p" style={{ margin: 0 }}>
					Das ist der Inhalt deiner wunderschönen Card-Komponente.
				</Text>
			</Header>
		),
		background: 'transparent',
	},
	argTypes: {
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
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {}

export const NoBorder: Story = {
	args: {
		noBorder: true,
	},
}
