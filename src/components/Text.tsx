import styles from '../styles/Text.module.scss'
import React, { ComponentPropsWithoutRef, ElementType } from 'react'
import { boxStylesConfig } from '$components/Box'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

type AllowedElements = 'p' | 'span' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export const textStylesConfig = {
	variants: {
		/**
		 * the visual style variant of the text, controlling font size, color, and decoration
		 * @default "default"
		 */
		variant: {
			default: 'text-sm text-neutral-600' as const,
			title: 'text-2xl font-medium text-amber-900' as const,
			wavy: 'text-sm text-neutral-600 decoration-wavy' as const,
			muted: 'text-sm text-neutral-400' as const,
		},
		/**
		 * the padding around the text, useful for spacing in layouts
		 * @default "none"
		 */
		padding: boxStylesConfig.variants.padding,
		/**
		 * the alignment of the text within its container, controlling flexbox alignment and text alignment
		 * @default "none"
		 */
		align: boxStylesConfig.variants.align,
		/**
		 * the justification of the text within its container, controlling flexbox justification
		 * @default "none"
		 */
		justify: boxStylesConfig.variants.justify,
		/**
		 * the padding before the text, useful for aligning with icons or other elements
		 * @default "none"
		 */
		paddingBefore: {
			none: '',
			'10': 'ps-10',
			'20': 'ps-20',
		},
		/**
		 * the font weight of the text
		 * @default "normal"
		 */
		font: {
			normal: 'font-normal',
			medium: 'font-medium',
			semibold: 'font-semibold',
			bold: 'font-bold',
		},
		/**
		 *
		 * @default "base"
		 */
		size: {
			xs: 'text-xs',
			small: 'text-sm',
			base: 'text-base',
			large: 'text-lg',
			xl: 'text-xl',
			'2xl': 'text-2xl',
		},
	},
	defaultVariants: {
		size: 'base',
		font: 'normal',
		justify: 'none',
		align: 'none',
		padding: 'none',
		paddingBefore: 'none',
		variant: 'default',
	},
} as const

const textStyles = tv(textStylesConfig)

export type TextProps<T extends AllowedElements> = VariantProps<typeof textStyles> &
	(
		| {
				as: 'label'
				htmlFor: string
		  }
		| {
				as?: Exclude<T, 'label'>
				htmlFor?: never
		  }
	) &
	Omit<ComponentPropsWithoutRef<T>, 'as' | 'variant' | 'paddingBefore' | 'font' | 'size'>

export function Text<T extends AllowedElements = 'span'>({
	variant = 'default',
	as,
	className,
	children,
	paddingBefore = 'none',
	padding,
	align,
	justify,
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
					padding,
					align,
					justify,
				}),
				styles.textBase,
			)}
			{...props}
		>
			{children}
		</Component>
	)
}
