import { generateShortId } from '@1ry/short-id'
import clsx from 'clsx'
import { tv, type VariantProps } from 'tailwind-variants'
import React, { type HTMLAttributes, type ReactNode, useMemo } from 'react'

export const boxStylesConfig = {
	base: ['transition-all duration-200'],
	variants: {
		/**
		 * The macro structural layout layout style.
		 */
		variant: {
			default: '',
			navbar: 'navbar',
			dock: 'dock',
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
			teal: 'bg-teal-500',
			yellow: 'bg-yellow-400',
			gray: 'bg-gray-500',
			white: 'bg-white',
			transparent: 'bg-transparent',
			magenta: 'bg-fuchsia-500',
			cyan: 'bg-cyan-500 dark:bg-cyan-300',
			amber: 'bg-amber-500 dark:bg-amber-400',
			lime: 'bg-lime-500 dark:bg-lime-400',
			orange: 'bg-orange-500 dark:bg-orange-400',
			indigo: 'bg-indigo-500 dark:bg-indigo-400',
			violet: 'bg-violet-500 dark:bg-violet-400',
			rose: 'bg-rose-500 dark:bg-rose-400',
			slate: 'bg-slate-500 dark:bg-slate-700',
			red: 'bg-red-500 dark:bg-red-900',
		},
		/**
		 * whether the box should be allowed to grow
		 * @default yes
		 */
		grow: {
			yes: 'grow',
			no: 'grow-0',
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
		borderColor: {
			black: 'border-black dark:border-neutral-100',
			white: 'border-white dark:border-neutral-900',
			gray: 'border-gray-500',
			teal: 'border-teal-500',
			yellow: 'border-yellow-400',
			magenta: 'border-fuchsia-500',
			cyan: 'border-cyan-500 dark:border-cyan-300',
			amber: 'border-amber-500 dark:border-amber-400',
		},
		noBorder: {
			false: 'border-0',
			true: 'box-border rounded-md border',
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
			true: 'isolate',
		},
	},
	defaultVariants: {
		paddingY: '0',
		paddingX: '0',
		padding: '0',
		background: 'transparent',
		variant: 'default',
		orientation: 'none',
		align: 'none',
		justify: 'none',
		grow: 'no',
	},
} as const

/**
 * Tailwind Variant configurations for the Box component, powered by `tailwind-variants`.
 * Defines the foundational transitions and multi-axis alignment mappings for layout generation.
 */
export const boxStyles = tv(boxStylesConfig)

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
	className,
	orientation = 'none',
	align = 'none',
	justify = 'none',
	background = 'transparent',
	children,
	isolate = false,
	id: customId,
	gap = 0,
	grow = 'no',
	...props
}: BoxProps) {
	const id = useMemo(() => customId ?? generateShortId(7), [customId])
	const Component = variant === 'navbar' && !as ? 'nav' : as || 'div'
	const gapStyle = gap ? { gap: `${gap * 0.25}rem` } : undefined
	const resolvedClassName = clsx(
		className,
		boxStyles({
			variant,
			orientation,
			align,
			justify,
			isolate,
			background,
			grow,
		}),
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
