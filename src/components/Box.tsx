import { generateShortId } from '@1ry/short-id'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'
import React, { type HTMLAttributes, type ReactNode, useMemo } from 'react'

/**
 * Tailwind Variant configurations for the Box component, powered by `tailwind-variants`.
 * Defines the foundational transitions and multi-axis alignment mappings for layout generation.
 */
export const boxStyles = tv({
	variants: {
		/**
		 * The macro structural layout layout style.
		 */
		variant: {
			default: '',
			navbar: ['ry-navbar', 'navbar'] as const,
			dock: ['ry-dock', 'dock'] as const,
			/**
			 * the styling for the root container
			 */
			root: ['ry-root', 'px-4', 'sm:px-6', 'lg:px-8', 'container'] as const,
		},
		noAnimation: {
			true: 'transition-none hover:transform-none hover:shadow-none',
			false: 'transition-all duration-200',
		},
		hidden: {
			true: 'hidden invisible',
			false: 'visible',
		},
		width: {
			unset: '',
			'3xs': 'w-3xs',
			'2xs': 'w-2xs',
			xs: 'w-xs',
			small: 'w-sm',
			medium: 'w-md',
			large: 'w-lg',
			xl: 'w-xl',
			'2xl': 'w-2xl',
			'3xl': 'w-3xl',
			'4xl': 'w-4xl',
			'5xl': 'w-5xl',
			'6xl': 'w-6xl',
			'7xl': 'w-7xl',
			auto: 'w-auto',
			full: 'w-full',
			screen: 'w-screen',
			min: 'm-min',
			max: 'w-max',
			fit: 'w-fit',
		},
		size: {
			unset: '',
			auto: 'size-auto',
			full: 'size-full',
			min: 'size-min',
			max: 'size-max',
			fit: 'size-fit',
		},
		fontFamily: {
			unset: '',
			sans: 'font-sans',
			serif: 'font-serif',
			mono: 'font-mono',
		},
		/**
		 * Flexbox direction/orientation mapping.
		 * @example "horizontal"
		 * @default "none"
		 */
		orientation: {
			/**
			 * If this is selected no specific direction/orientation will be specified
			 */
			none: '',
			horizontal: 'flex flex-row',
			vertical: 'flex flex-col',
		},
		/**
		 * Theme color tokens with built-in dark mode support.
		 * @default "transparent"
		 */
		background: {
			none: '',
			primary: 'bg-primary text-background' as const,
			secondary: 'bg-secondary text-primary' as const,
			surface: 'bg-surface text-primary' as const,
			themeBackground: 'bg-background',
			inherit: 'bg-inherit' as const,
			teal: 'bg-teal-500 dark:bg-teal-400' as const,
			yellow: 'bg-yellow-400 dark:bg-yellow-300' as const,
			gray: 'bg-gray-500 dark:bg-gray-400' as const,
			white: 'bg-white dark:bg-neutral-900' as const,
			transparent: 'bg-transparent' as const,
			magenta: 'bg-fuchsia-500 dark:bg-fuchsia-400' as const,
			cyan: 'bg-cyan-500 dark:bg-cyan-300' as const,
			amber: 'bg-amber-500 dark:bg-amber-400' as const,
			lime: 'bg-lime-500 dark:bg-lime-400' as const,
			orange: 'bg-orange-500 dark:bg-orange-400' as const,
			indigo: 'bg-indigo-500 dark:bg-indigo-400' as const,
			violet: 'bg-violet-500 dark:bg-violet-400' as const,
			rose: 'bg-rose-500 dark:bg-rose-400' as const,
			slate: 'bg-slate-500 dark:bg-slate-700' as const,
			red: 'bg-red-500 dark:bg-red-900' as const,
		},
		/**
		 * whether the box should be allowed to grow
		 * @default yes
		 */
		grow: {
			none: '',
			unset: '',
			yes: 'grow',
			no: 'grow-0',
		},
		overflow: {
			unset: 'ry-overflow-unset',
			auto: 'overflow-auto',
			hidden: 'overflow-hidden',
			clip: 'overflow-clip',
			scroll: 'overflow-scroll',
			visible: 'overflow-visible',
		},
		overflowBehaviour: {
			unset: 'ry-overflow-behaviour-unset',
			auto: 'overscroll-auto',
			contain: 'overscroll-contain',
			none: 'overscroll-none',
		},
		overflowYBehaviour: {
			unset: 'ry-overflow-y-behaviour-unset',
			auto: 'overscroll-y-auto',
			contain: 'overscroll-y-contain',
			none: 'overscroll-y-none',
		},
		overflowXBehaviour: {
			unset: 'ry-overflow-x-behaviour-unset',
			auto: 'overscroll-x-auto',
			contain: 'overscroll-x-contain',
			none: 'overscroll-x-none',
		},
		paddingY: {
			none: '',
			'0': 'py-0',
			'1': 'py-1',
			'2': 'py-2',
			'3': 'py-3',
			'4': 'py-4',
			'5': 'py-5',
			'10': 'py-10',
			'20': 'py-20',
		},
		paddingX: {
			none: '',
			'0': 'px-0',
			'1': 'px-1',
			'2': 'px-2',
			'3': 'px-3',
			'4': 'px-4',
			'5': 'px-5',
			'10': 'px-10',
			'20': 'px-20',
		},
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
		margin: {
			unset: '',
			'1': 'm-1',
			'2': 'm-2',
			'3': 'm-3',
			'4': 'm-4',
			'5': 'm-5',
			'10': 'm-10',
			'20': 'm-20',
		},
		borderColor: {
			black: 'border-black dark:border-neutral-100',
			white: 'border-white dark:border-neutral-900',
			gray: 'border-gray-500 dark:border-gray-400',
			teal: 'border-teal-500 dark:border-teal-400',
			yellow: 'border-yellow-400 dark:border-yellow-300',
			magenta: 'border-fuchsia-500 dark:border-fuchsia-400',
			cyan: 'border-cyan-500 dark:border-cyan-300',
			amber: 'border-amber-500 dark:border-amber-400',
			none: '',
		},
		noBorder: {
			true: 'border-0',
			false: 'box-border rounded-md border-3 border-solid',
		},
		/**
		 * Cross-axis flex alignments and text alignments.
		 * Includes safe fallbacks for edge cases when elements are gapped.
		 * @example "left"
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
		 * Explicitly triggers tailwindcss `isolate` behavior to create a local CSS stacking context.
		 * @default false
		 */
		isolate: {
			false: '',
			true: 'isolate',
		},
		textSize: {
			unset: '',
			xs: 'text-xs',
			small: 'text-sm',
			base: 'text-base',
			large: 'text-lg',
			xl: 'text-xl',
			'2xl': 'text-2xl',
		},
	},
	defaultVariants: {
		hidden: false,
		noAnimation: false,
		paddingY: 'none',
		paddingX: 'none',
		padding: 'none',
		margin: 'unset',
		background: 'themeBackground',
		variant: 'default',
		noBorder: true,
		borderColor: 'none',
		orientation: 'none',
		align: 'none',
		justify: 'none',
		fontFamily: 'unset',
		grow: 'none',
		size: 'unset',
		width: 'unset',
		textSize: 'unset',
		overflow: 'auto',
		overflowBehaviour: 'unset',
		overflowYBehaviour: 'unset',
		overflowXBehaviour: 'unset',
	},
})

/**
 * Props for the Box component, combining standard HTML div attributes,
 * dynamic style variants, and custom layout properties.
 */
export type BoxProps = HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof boxStyles> & {
		/**
		 * Renders the component as a specific semantic HTML element.
		 * @default 'div'
		 */
		as?: 'div' | 'nav' | 'footer' | 'main' | 'article' | 'aside' | 'section' | 'header'
		/**
		 * The content to be rendered inside the box.
		 */
		children?: ReactNode
		/**
		 * Defines the gap spacing between child elements using a predefined scale.
		 * @default 0
		 */
		gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
		borderWidth?: '0' | '1' | '2' | '3' | '4' | '5' | '10' | '20'
	}

/**
 * A highly flexible layout component that supports dynamic semantic HTML tags,
 * flexible layout alignments, automatic ID generation, and style variants.
 *
 * It automatically infers the semantic element (e.g., `<nav>` for the 'navbar' variant)
 * if no specific tag is provided via the `as` prop.
 *
 * @returns A semantic React element styled according to the provided configuration.
 */
export function Box({
	variant = 'default',
	as,
	orientation,
	align,
	justify,
	background = 'transparent',
	children,
	isolate = false,
	id: customId,
	gap = 0,
	grow = 'no',
	borderWidth,
	noBorder,
	borderColor,
	noAnimation,
	margin,
	overflow,
	overflowBehaviour,
	overflowXBehaviour,
	overflowYBehaviour,
	padding,
	fontFamily,
	size,
	width,
	paddingX,
	paddingY,
	className,
	...props
}: BoxProps) {
	const id = useMemo(() => customId ?? generateShortId(7), [customId])
	const Component = variant === 'navbar' && !as ? 'nav' : as || 'div'
	const gapStyle = gap ? { gap: `${gap * 0.25}rem` } : undefined
	const resolvedClassName = twMerge(
		boxStyles({
			variant,
			orientation,
			align,
			justify,
			isolate,
			background,
			noBorder,
			borderColor,
			grow,
			noAnimation,
			padding,
			paddingX,
			paddingY,
			fontFamily,
			margin,
			overflow,
			overflowBehaviour,
			overflowXBehaviour,
			overflowYBehaviour,
			size,
			width,
		}),
		className,
		clsx(borderWidth && `border-${borderWidth}`),
	)
	return (
		<Component
			{...props}
			id={id}
			style={{ ...gapStyle, ...props.style }}
			data-has-gap={gap > 0 ? 'true' : undefined}
			className={resolvedClassName}
		>
			{children}
		</Component>
	)
}
