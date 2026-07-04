import styles from '../styles/Button.module.scss'
import { generateShortId } from '@1ry/short-id'
import type { ButtonHTMLAttributes } from 'react'
import React, { useMemo } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonStyles = tv({
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
})

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonStyles> & {
		asSubmit?: boolean
	}

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
			<button type="submit" className={cname} title={title} id={id} {...props}>
				{children}
			</button>
		)
	}
	return (
		<button className={cname} title={title} id={id} {...props}>
			{children}
		</button>
	)
}
