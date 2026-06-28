import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Modal } from './Modal'

const meta: Meta<typeof Modal> = {
	title: 'Components/Modal',
	component: Modal,
	tags: ['autodocs'],
	args: {
		modalTitle: <h2 style={{ margin: 0 }}>Sicherheitsabfrage</h2>,
		modalSubTitle: 'Möchtest du die Selbstzerstörung wirklich abbrechen?',
		children: <p style={{ padding: '1rem 0' }}>Dieser Vorgang kann nicht rückgängig gemacht werden.</p>,
		showSubmitButton: true,
		submitText: 'Bestätigen',
		closeText: 'Abbrechen',
	},
}

export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {
	decorators: [
		(Story: any) => (
			<div style={{ minHeight: '300px', transform: 'scale(1)', position: 'relative' }}>
				<Story />
			</div>
		),
	],
}