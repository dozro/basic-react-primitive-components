import { generateShortId } from '@1ry/short-id'
import { tv, type VariantProps } from 'tailwind-variants'
import { clsx } from 'clsx'
import React, { Children, HTMLAttributes, ReactNode, useMemo } from 'react'
import styles from '../styles/Box.module.scss'

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
		 * @default true
		 */
		grow: {
			true: 'grow',
			false: 'grow-0',
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
			none: 'justify-none',
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
		variant: 'default',
		orientation: 'none',
		align: 'none',
		justify: 'none',
		grow: 'true',
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
	...props
}: BoxProps) {
	const id = useMemo(() => customId ?? generateShortId(7), [customId])
	const Component = variant === 'navbar' && !as ? 'nav' : as || 'div'
	const childrenCount = useMemo(() => Children.count(children) ?? [], [children])
	const gapStyle = gap ? { gap: `${gap * 0.25}rem` } : undefined
	return (
		<Component
			id={id}
			style={{ ...gapStyle, ...props.style }}
			data-has-gap={gap > 0 ? 'true' : undefined}
			className={clsx(
				boxStyles({
					variant,
					orientation,
					align,
					justify,
					isolate,
					background,
					className,
				}),
				!variant || !background ? styles.boxBase : undefined,
			)}
			{...props}
		>
			{children}
		</Component>
	)
}
