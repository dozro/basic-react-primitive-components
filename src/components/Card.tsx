import { BoxProps, Box } from '$components/Box'
import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const cardStyles = tv({
	base: ['rounded-2xl', 'shadow-sm', 'p-6'],
	variants: {
		noBorder: {
			true: 'border-0',
			false: 'box-border rounded-md border-3 border-solid',
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
		background: {
			none: '',
			teal: 'bg-teal-500 dark:bg-teal-400',
			yellow: 'bg-yellow-400 dark:bg-yellow-300',
			gray: 'bg-gray-500 dark:bg-gray-400',
			white: 'bg-white dark:bg-neutral-900',
			transparent: 'bg-transparent',
			magenta: 'bg-fuchsia-500 dark:bg-fuchsia-400',
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
		noAnimation: {
			true: 'transition-none hover:transform-none hover:shadow-none',
			false: 'transition-all duration-200 hover:transform hover:shadow-xl hover:-translate-y-1',
		},
		raised: {
			true: 'shadow-2xl hover:shadow-flat',
			false: 'shadow-sm',
		},
	},
	defaultVariants: {
		noBorder: false,
		background: 'none',
		borderColor: 'none',
		raised: false,
		noAnimation: false,
	},
} as const)

export type CardProps = BoxProps & VariantProps<typeof cardStyles> & {}

export const Card = ({
	children,
	className,
	noBorder,
	borderColor,
	background,
	noAnimation,
	...props
}: CardProps) => (
	<Box
		{...props}
		className={cardStyles({
			noBorder,
			className,
			borderColor,
			background,
			noAnimation,
		})}
	>
		{children}
	</Box>
)
