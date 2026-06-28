import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Card } from './Card'
import { Box } from './Box'
import { Text } from './Text'

const meta: Meta<typeof Card> = {
	title: 'Components/Card',
	component: Card,
	tags: ['autodocs'],
	args: {
		noBorder: false,
		children: (
			<Box style={{ padding: '1rem' }}>
				<Text as="h3" style={{ margin: 0, marginBottom: '0.5rem' }}>Card Titel</Text>
				<Text as="p" style={{ margin: 0 }}>Das ist der Inhalt deiner wunderschönen Card-Komponente.</Text>
			</Box>
		),
        background: 'transparent',
	},
    argTypes: {
        background: {
            control: 'select',
            options: ['teal', 'yellow', 'gray', 'transparent', 'magenta', 'cyan', 'amber', 'lime', 'indigo', 'rose', 'slate', 'violet', 'orange'],
        },
    },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {}

export const NoBorder: Story = {
	args: {
		noBorder: true,
	},
}