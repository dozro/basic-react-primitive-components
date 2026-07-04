import { FONT_MAP } from '$types/TextFont'

import styles from '../styles/Text.module.scss'
import React, { ComponentPropsWithoutRef, ElementType } from 'react'
import { twMerge } from 'tailwind-merge'
import { VARIANT_MAP } from '$types/TextVariant'
import { PADDING_MAP, PaddingSize } from '$types/Padding'
import { SIZE_MAP } from '$types/TextSizing'
import { tv, type VariantProps } from 'tailwind-variants'

type AllowedElements = 'p' | 'span' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const textStyles = tv({
	base: [styles.TextComponent],
	variants: {
		variant: VARIANT_MAP,
		paddingBefore: PADDING_MAP,
		font: FONT_MAP,
		size: SIZE_MAP,
	},
})

export type TextProps<T extends AllowedElements> = VariantProps<typeof textStyles> & {
	as?: T
	paddingBefore?: PaddingSize
	/**
	 * if you set it to as=label
	 */
	htmlFor?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'variant' | 'paddingBefore' | 'font' | 'size'>

export function Text<T extends AllowedElements = 'span'>({
	variant = 'default',
	as,
	className,
	children,
	paddingBefore = 'none',
	font = 'medium',
	size,
	...props
}: TextProps<T>) {
	const Component = (as || 'span') as ElementType

	return (
		<Component
			className={twMerge(
				textStyles({
					variant,
					paddingBefore,
					font,
					size,
					className,
				}),
			)}
			{...props}
		>
			{children}
		</Component>
	)
}
