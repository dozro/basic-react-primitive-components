import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Box } from './Box'
import React from 'react'

vi.mock('@1ry/short-id', () => ({
	generateShortId: vi.fn(() => 'mocked-short-id'),
}))

describe('Box Component', () => {
	it('applies vertical orientation classes correctly', () => {
		const { container } = render(
			<Box orientation="vertical">
				<span>Child</span>
			</Box>,
		)
		const element = container.firstChild as HTMLElement
		expect(element.className).toContain('flex')
		expect(element.className).toContain('flex-col')
	})

	it('applies horizontal orientation classes correctly', () => {
		const { container } = render(
			<Box orientation="horizontal">
				<span>Child</span>
			</Box>,
		)
		const element = container.firstChild as HTMLElement
		expect(element.className).toContain('flex')
		expect(element.className).toContain('flex-row')
	})

	it('applies padding classes correctly', () => {
		const { container } = render(
			<Box padding="4">
				<span>Child</span>
			</Box>,
		)
		const element = container.firstChild as HTMLElement
		expect(element.className).toContain('p-4')
	})

	it('applies paddingX and paddingY classes correctly', () => {
		const { container } = render(
			<Box padding="none" paddingX="2" paddingY="3">
				<span>Child</span>
			</Box>,
		)
		const element = container.firstChild as HTMLElement
		expect(element.className).toContain('px-2')
		expect(element.className).toContain('py-3')
	})

	it('resolves class conflicts using twMerge', () => {
		const { container } = render(
			<Box className="flex-row" orientation="vertical">
				<span>Child</span>
			</Box>,
		)
		const element = container.firstChild as HTMLElement
		expect(element.className).toContain('flex-col')
		expect(element.className).not.toContain('flex-row')
	})

	it('does not pass variant props to the DOM element', () => {
		const { container } = render(
			<Box padding="4" orientation="vertical" noAnimation={true}>
				<span>Child</span>
			</Box>,
		)
		const element = container.firstChild as HTMLElement
		expect(element.getAttribute('padding')).toBeNull()
		expect(element.getAttribute('orientation')).toBeNull()
		expect(element.getAttribute('noAnimation')).toBeNull()
	})
	it('renders as a <div> by default or with custom semantic tags', () => {
		const { container: defaultContainer } = render(<Box>Content</Box>)
		expect(defaultContainer.firstChild?.nodeName).toBe('DIV')

		const { container: sectionContainer } = render(<Box as="section">Content</Box>)
		expect(sectionContainer.firstChild?.nodeName).toBe('SECTION')
	})

	it('infers <nav> tag automatically when variant is "navbar" and "as" is omitted', () => {
		const { container } = render(<Box variant="navbar">Navbar Content</Box>)
		const element = container.firstChild as HTMLElement

		expect(element.nodeName).toBe('NAV')
		expect(element.className).toContain('navbar')
	})

	it('prioritizes explicitly passed "as" prop over the implicit "navbar" tag conversion', () => {
		const { container } = render(
			<Box variant="navbar" as="header">
				Header Content
			</Box>,
		)
		const element = container.firstChild as HTMLElement

		expect(element.nodeName).toBe('HEADER')
		expect(element.className).toContain('navbar')
	})

	it('uses custom id if provided, otherwise falls back to generateShortId', () => {
		const { container: customIdContainer } = render(<Box id="custom-id">Content</Box>)
		expect((customIdContainer.firstChild as HTMLElement).id).toBe('custom-id')

		const { container: generatedIdContainer } = render(<Box>Content</Box>)
		expect((generatedIdContainer.firstChild as HTMLElement).id).toBe('mocked-short-id')
	})

	it('applies gap style as rem units and sets the data-has-gap attribute correctly', () => {
		const { container, rerender } = render(<Box gap={4}>Content</Box>)
		let element = container.firstChild as HTMLElement

		expect(element.style.gap).toBe('1rem')
		expect(element.getAttribute('data-has-gap')).toBe('true')

		rerender(<Box gap={0}>Content</Box>)
		element = container.firstChild as HTMLElement
		expect(element.style.gap).toBe('')
		expect(element.getAttribute('data-has-gap')).toBeNull()
	})

	it('merges incoming inline styles safely with the dynamic gap styles', () => {
		const { container } = render(
			<Box gap={2} style={{ color: 'red', gap: '20px' }}>
				Content
			</Box>,
		)
		const element = container.firstChild as HTMLElement
		expect(element.style.color).toBe('red')
		expect(element.style.gap).toBe('20px')
	})

	it('applies custom border widths seamlessly that are not part of tailwind-variants config', () => {
		const { container } = render(<Box borderWidth="4">Content</Box>)
		const element = container.firstChild as HTMLElement

		expect(element.className).toContain('border-4')
	})

	it('applies deep data attributes and standard HTML attributes down to the DOM element', () => {
		const { container } = render(
			<Box data-testid="layout-box" aria-label="wrapper">
				Content
			</Box>,
		)
		const element = container.firstChild as HTMLElement

		expect(element.getAttribute('data-testid')).toBe('layout-box')
		expect(element.getAttribute('aria-label')).toBe('wrapper')
	})
	it('applies all default variant classes when no props are provided', () => {
		const { container } = render(<Box>Default Box</Box>)
		const element = container.firstChild as HTMLElement
		const classList = element.className.split(' ')

		expect(classList).toContain('transition-all')
		expect(classList).toContain('duration-200')
		expect(classList).toContain('bg-transparent')
	})

	it('resolves multi-axis layout and cross-axis alignment overrides correctly', () => {
		const { container } = render(
			<Box align="right" justify="spaceBetween" orientation="horizontal">
				Content
			</Box>,
		)
		const element = container.firstChild as HTMLElement
		const classes = element.className

		expect(classes).toContain('flex')
		expect(classes).toContain('flex-row')
		expect(classes).toContain('items-end')
		expect(classes).toContain('justify-between')
		expect(classes).toContain('data-[has-gap=true]:place-self-end-safe')
	})

	it('overrides shorthand padding properties correctly via twMerge layout rules', () => {
		const { container } = render(
			<Box padding="4" className="pt-10 pb-2">
				Content
			</Box>,
		)
		const element = container.firstChild as HTMLElement
		const classes = element.className

		expect(classes).toContain('pt-10')
		expect(classes).toContain('pb-2')
		expect(classes).not.toContain('p-4')
	})

	it('handles explicit undefined prop values gracefully by falling back to defaults', () => {
		const { container } = render(
			<Box
				orientation={undefined}
				background={undefined}
				noBorder={undefined}
				className={undefined}
			>
				Content
			</Box>,
		)
		const element = container.firstChild as HTMLElement

		expect(element.className).toContain('bg-transparent')
		expect(element.className).not.toContain('flex')
	})

	it('preserves strict data-attribute state casting', () => {
		const { container, rerender } = render(<Box gap={1}>Content</Box>)
		let element = container.firstChild as HTMLElement

		expect(element.getAttribute('data-has-gap')).toBe('true')

		rerender(<Box gap={0}>Content</Box>)
		element = container.firstChild as HTMLElement
		expect(element.getAttribute('data-has-gap')).toBeNull()
	})

	it('ensures no residual react-specific or variant-specific props leak to DOM nodes', () => {
		const { container } = render(
			<Box
				variant="dock"
				grow="yes"
				align="center"
				justify="center"
				borderColor="teal"
				noBorder={false}
			>
				Content
			</Box>,
		)
		const element = container.firstChild as HTMLElement
		const leakedProps = ['variant', 'grow', 'align', 'justify', 'borderColor', 'noBorder']

		leakedProps.forEach((prop) => {
			expect(element.getAttribute(prop)).toBeNull()
		})
	})
	it('verifies that "none" does not inject any flexbox classes', () => {
		const { container } = render(<Box orientation="none">Content</Box>)
		const element = container.firstChild as HTMLElement

		expect(element.className).not.toContain('flex')
		expect(element.className).not.toContain('flex-row')
		expect(element.className).not.toContain('flex-col')
	})

	it('maps vertical layout tracking main-axis (justify) and cross-axis (align)', () => {
		const { container } = render(
			<Box orientation="vertical" align="center" justify="spaceBetween">
				Content
			</Box>,
		)
		const element = container.firstChild as HTMLElement
		const classes = element.className

		expect(classes).toContain('flex')
		expect(classes).toContain('flex-col')

		expect(classes).toContain('justify-between')
		expect(classes).toContain('items-center')
		expect(classes).toContain('text-center')
	})

	it('maps horizontal layout tracking main-axis (justify) and cross-axis (align)', () => {
		const { container } = render(
			<Box orientation="horizontal" align="right" justify="center">
				Content
			</Box>,
		)
		const element = container.firstChild as HTMLElement
		const classes = element.className

		expect(classes).toContain('flex')
		expect(classes).toContain('flex-row')

		expect(classes).toContain('justify-center')
		expect(classes).toContain('items-end')
		expect(classes).toContain('text-right')
	})

	it('maps internal variant over external className direction', () => {
		const { container } = render(
			<Box orientation="vertical" className="flex-row">
				Content
			</Box>,
		)
		const element = container.firstChild as HTMLElement
		const classes = element.className

		expect(classes).toContain('flex-col')
		expect(classes).not.toContain('flex-row')
	})

	it('handles the tricky "align=right" data-attribute edge case', () => {
		const { container } = render(
			<Box orientation="horizontal" align="right">
				Content
			</Box>,
		)
		const element = container.firstChild as HTMLElement

		expect(element.className).toContain('data-[has-gap=true]:place-self-end-safe')
		expect(element.className).toContain('data-[has-gap=true]:place-content-end-safe')
	})

	it('ensures grow variants act correctly alongside layout direction', () => {
		const { container, rerender } = render(
			<Box orientation="horizontal" grow="yes">
				Content
			</Box>,
		)
		let element = container.firstChild as HTMLElement
		expect(element.className).toContain('grow')
		expect(element.className).not.toContain('grow-0')

		rerender(
			<Box orientation="vertical" grow="no">
				Content
			</Box>,
		)
		element = container.firstChild as HTMLElement
		expect(element.className).toContain('grow-0')
		expect(element.className).not.toContain('grow\b')
	})
})
