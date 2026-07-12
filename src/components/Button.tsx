import { generateShortId } from '@1ry/short-id'
import type { ButtonHTMLAttributes } from 'react'
import React, { useMemo } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

const buttonStyles = tv({
	base: [
		'inline-flex',
		'items-center',
		'justify-center',
		'cursor-pointer',
		'text-[var(--rylib-color-primary-light)]',
		'border-groove',
		'border-[var(--rylib-color-primary-light)]',
		'transition-[transform,box-shadow,background-color] duration-150 ease-out hover:-translate-y-0.5',
		'active:translate-y-0 active:shadow-[0_3px_8px_rgba(0,0,0,0.1)]',
		'dark:text-[var(--rylib-color-primary-dark)] dark:border-[var(--rylib-color-primary-dark)] dark:active:shadow-[0_3px_8px_rgba(0,0,0,0.5)]',
	],
	variants: {
		glowing: {
			true: [
				'hover:bg-[linear-gradient(135deg,var(--rylib-color-accent-light),var(--rylib-color-secondaryaccent-light))]',
				'hover:shadow-[0_0_20px_var(--rylib-color-accent-light)]',
				'dark:hover:bg-[linear-gradient(135deg,var(--rylib-color-accent-dark),var(--rylib-color-secondaryaccent-dark))]',
				'dark:hover:shadow-[0_0_20px_var(--rylib-color-accent-dark)]',
			],
			false: '',
		},
		transparent: {
			true: 'bg-transparent',
			false: '',
			no: '',
		},
		noBorder: {
			true: 'border-none',
			false: '',
		},
	},
	defaultVariants: {
		glowing: false,
		transparent: true,
		noBorder: false,
	},
} as const)

/**
 * Props for the {@link Button} component.
 *
 * Extends the native HTML button attributes with styling variants
 * and an optional submit mode.
 *
 * @property glowing - Enables the glowing button style.
 * @property transparent - Renders the button with a transparent background.
 * @property noBorder - Removes the default button border.
 * @property asSubmit - Renders the button with `type="submit"`.
 */
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonStyles> & {
		asSubmit?: boolean
		type?: 'button' | 'submit' | 'reset'
	}

/**
 * A reusable button component supporting multiple visual variants.
 *
 * By default, the button:
 * - uses a transparent background,
 * - has no border,
 * - is not glowing,
 * - renders as a standard button.
 *
 * If no `id` is provided, a unique identifier is generated automatically.
 * A warning is logged when no `title` is supplied, as it is expected for
 * accessibility/tooltips.
 *
 * @example
 * ```tsx
 * <Button title="Save changes" onClick={handleSave}>
 *   Save
 * </Button>
 * ```
 *
 * @example
 * ```tsx
 * <Button
 *   title="Delete item"
 *   glowing
 *   transparent={false}
 *   noBorder={false}
 *   onClick={handleDelete}
 * >
 *   Delete
 * </Button>
 * ```
 *
 * @example
 * ```tsx
 * <form onSubmit={handleSubmit}>
 *   <Button title="Submit form" asSubmit>
 *     Submit
 *   </Button>
 * </form>
 * ```
 * @returns A styled HTML `<button>` element.
 */
export function Button({
	className,
	children,
	glowing = false,
	noBorder = true,
	transparent = true,
	asSubmit = false,
	title,
	type = 'button',
	id: customId,
	...props
}: ButtonProps) {
	const id = useMemo(() => customId ?? generateShortId(7), [customId])
	if (!title) {
		console.warn('button title is missing')
	}
	const cname = buttonStyles({
		glowing,
		noBorder,
		transparent,
		className,
	})
	if (asSubmit) {
		return (
			<button className={twMerge(cname)} type="submit" title={title} id={id} {...props}>
				{children}
			</button>
		)
	}
	return (
		<button className={twMerge(cname)} title={title} id={id} type={type} {...props}>
			{children}
		</button>
	)
}
