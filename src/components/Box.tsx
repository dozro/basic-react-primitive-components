import { generateShortId } from '@1ry/short-id'
import { tv, type VariantProps } from 'tailwind-variants'
import { clsx } from 'clsx'
import React, { Children, HTMLAttributes, ReactNode, useMemo } from 'react'
import styles from '../styles/Box.module.scss'

const boxStyles = tv({
	base: ['transition-all duration-200'],
	variants: {
		variant: {
			default: '',
			navbar: 'navbar',
			dock: 'dock',
		},
		orientation: {
			none: '',
			horizontal: 'flex flex-row',
			vertical: 'flex flex-col',
		},
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
		align: {
			none: '',
			left: 'items-start text-left',
			center: 'items-center text-center',
			right:
				'items-end text-right data-[has-gap=true]:place-self-end-safe data-[has-gap=true]:place-content-end-safe data-[has-gap=true]:place-items-end-safe',
		},
		justify: {
			none: 'justify-none',
			start: 'justify-start',
			end: 'justify-end',
			center: 'justify-center',
			evenly: 'justify-evenly',
			spaceBetween: 'justify-between',
		},
		isolate: {
			true: 'isolate',
		},
	},
	defaultVariants: {
		variant: 'default',
		orientation: 'none',
		align: 'none',
		justify: 'none',
	},
})

export type BoxProps = HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof boxStyles> & {
		as?: 'div' | 'nav' | 'footer' | 'main' | 'article' | 'aside' | 'section' | 'header'
		children?: ReactNode
		gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
	}

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
				styles.boxBase,
				boxStyles({
					variant,
					orientation,
					align,
					justify,
					isolate,
					background,
					className,
				}),
			)}
			{...props}
		>
			{children}
		</Component>
	)
}
