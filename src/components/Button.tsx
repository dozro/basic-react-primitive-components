import clsx from 'clsx'
import styles from '../styles/Button.module.scss'
import { generateShortId } from '@1ry/short-id'
import type { ButtonHTMLAttributes } from 'react'
import React, { useMemo } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

/**
 * Tailwind Variants configuration for the {@link Button} component.
 *
 * Defines the base styles and supported visual variants used to
 * generate the component's class names.
 */
export const buttonStylesConfig = {
	base: styles.buttonBase,
	variants: {
		glowing: {
			true: styles.glow,
		},
		transparent: {
			true: styles.transparent,
		},
		noBorder: {
			true: styles.noBorder,
		},
	},
} as const

const buttonStyles = tv(buttonStylesConfig)

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
			<button
				style={{
					...styles.buttonBase,
					...props.style,
				}}
				type="submit"
				className={clsx(cname, styles.submitButton)}
				title={title}
				id={id}
				{...props}
			>
				{children}
			</button>
		)
	}
	return (
		<button
			className={clsx(
				cname,
				glowing ? styles.glow : undefined,
				transparent ? styles.transparent : undefined,
				noBorder ? styles.noBorder : undefined,
				styles.buttonBase,
			)}
			title={title}
			id={id}
			{...props}
		>
			{children}
		</button>
	)
}
