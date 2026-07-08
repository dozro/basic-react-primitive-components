import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { Button } from './Button'
import React from 'react'

vi.mock('../styles/Button.module.scss', () => ({
	default: {
		buttonBase: 'mock-buttonBase',
		glow: 'mock-glow',
		transparent: 'mock-transparent',
		noBorder: 'mock-noBorder',
		submitButton: 'mock-submitButton',
	},
}))

describe('Button Component - Core & Variants', () => {
	let consoleWarnSpy: any

	beforeEach(() => {
		consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
	})

	afterEach(() => {
		consoleWarnSpy.mockRestore()
	})

	it('renders with default variant classes and default HTML type', () => {
		const { container } = render(<Button title="Click me">Click</Button>)
		const button = container.firstChild as HTMLButtonElement

		expect(button.type).toBe('button')
		expect(button.className).toContain('mock-buttonBase')
		expect(button.className).toContain('mock-transparent')
		expect(button.className).toContain('mock-noBorder')
		expect(button.className).not.toContain('mock-glow')
	})

	it('applies glowing style when prop is true', () => {
		const { container } = render(
			<Button title="Glow" glowing={true}>
				Glow
			</Button>,
		)
		const button = container.firstChild as HTMLButtonElement
		expect(button.className).toContain('mock-glow')
	})

	it('renders as a submit button when asSubmit is true', () => {
		const { container } = render(
			<Button title="Submit" asSubmit={true}>
				Submit
			</Button>,
		)
		const button = container.firstChild as HTMLButtonElement

		expect(button.type).toBe('submit')
		expect(button.className).toContain('mock-submitButton')
	})

	it('generates a 7-character fallback id if no custom id is provided', () => {
		const { container } = render(<Button title="Btn">Btn</Button>)
		const button = container.firstChild as HTMLButtonElement

		expect(button.id).toBeDefined()
		expect(button.id).toHaveLength(7)
	})

	it('uses explicit id when passed via props', () => {
		const { container } = render(
			<Button title="Btn" id="static-id">
				Btn
			</Button>,
		)
		const button = container.firstChild as HTMLButtonElement
		expect(button.id).toBe('static-id')
	})

	it('logs a console warning if the title prop is missing for accessibility', () => {
		// @ts-expect-any
		render(<Button>No Title</Button>)
		expect(consoleWarnSpy).toHaveBeenCalledWith('button title is missing')
	})
})

describe('Button Component - Unintended Behaviors & Critical Flaws', () => {
	let consoleWarnSpy: any

	beforeEach(() => {
		consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
	})

	afterEach(() => {
		consoleWarnSpy.mockRestore()
	})

	it('SHOULD NOT spread a string classname into the inline style object when asSubmit is true', () => {
		const { container } = render(
			<Button title="Submit" asSubmit={true} style={{ color: 'blue' }}>
				Submit
			</Button>,
		)
		const button = container.firstChild as HTMLButtonElement

		expect(button.style.color).toBe('blue')
		expect(button.getAttribute('style')).not.toContain('0:')
	})
	it('SHOULD properly let tailwind-variants resolve and de-duplicate class names', () => {
		const { container } = render(
			<Button title="Btn" glowing={false} className="override-glow">
				Btn
			</Button>,
		)
		const button = container.firstChild as HTMLButtonElement

		expect(button.className).not.toContain('mock-glow')
	})
})
