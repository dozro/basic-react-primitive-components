import styles from '../styles/Text.module.scss'
import React, { ComponentPropsWithoutRef, ElementType } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'
type AllowedElements = 'p' | 'span' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const textStyles = tv({
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
		padding: {
			none: '',
			'0': 'p-0',
			'1': 'p-1',
			'2': 'p-2',
			'3': 'p-3',
			'4': 'p-4',
			'5': 'p-5',
			'10': 'p-10',
			'20': 'p-20',
		},
		fontFamily: {
			unset: '',
			sans: 'font-sans',
			serif: 'font-serif',
			mono: 'font-mono',
		},
		/**
		 * the alignment of the text within its container, controlling flexbox alignment and text alignment
		 * @default "none"
		 */
		align: {
			none: '',
			/**
			 * Aligns children to the start of the cross-axis and left-aligns text.
			 * @see https://tailwindcss.com/docs/align-items#start
			 * @see https://tailwindcss.com/docs/text-align#left
			 */
			left: 'items-start text-left',
			/**
			 * Aligns children to the center of the cross-axis and center-aligns text.
			 * @see https://tailwindcss.com/docs/align-items#center
			 * @see https://tailwindcss.com/docs/text-align#center
			 */
			center: 'items-center text-center',
			/**
			 * Aligns children to the end of the cross-axis and right-aligns text.
			 * @see https://tailwindcss.com/docs/align-items#end
			 * @see https://tailwindcss.com/docs/text-align#right
			 */
			right:
				'items-end text-right data-[has-gap=true]:place-self-end-safe data-[has-gap=true]:place-content-end-safe data-[has-gap=true]:place-items-end-safe',
		},
		/**
		 * Main-axis flex distribution utilities.
		 */
		justify: {
			/**
			 * No specific main-axis distribution will be applied.
			 */
			none: '',
			/**
			 * Aligns children to the start of the main-axis.
			 * @see https://tailwindcss.com/docs/justify-content#start
			 */
			start: 'justify-start',
			end: 'justify-end',
			center: 'justify-center',
			evenly: 'justify-evenly',
			spaceBetween: 'justify-between',
		},
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
		textWrap: {
			unset: '',
			true: 'text-wrap',
			no: 'text-nowrap',
			balance: 'text-balance',
			pretty: 'text-pretty',
		},
		hyphens: {
			unset: '',
			false: '',
			none: 'hyphens-none',
			manual: 'hyphens-none',
			auto: 'hyphens-auto',
			true: 'hyphens-auto',
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
		fontFamily: 'unset',
		hyphens: 'unset',
		textWrap: true,
		justify: 'none',
		align: 'none',
		padding: 'none',
		paddingBefore: 'none',
		variant: 'default',
	},
} as const)

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
	hyphens,
	align,
	justify,
	fontFamily,
	font,
	size,
	textWrap,
	...props
}: TextProps<T>) {
	const Component = (as || 'span') as ElementType
	return (
		<Component
			className={twMerge(
				textStyles({
					variant,
					hyphens,
					paddingBefore,
					font,
					fontFamily,
					size,
					textWrap,
					className,
					padding,
					align,
					justify,
				}),
				className,
				styles.textBase,
			)}
			{...props}
		>
			{children}
		</Component>
	)
}
