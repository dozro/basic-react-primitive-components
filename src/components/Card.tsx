import { BoxProps, Box, boxStylesConfig } from '$components/Box'
import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

export const cardStylesConfig = {
	base: ['rounded-2xl', 'shadow-sm', 'p-6'],
	variants: {
		noBorder: boxStylesConfig.variants.noBorder,
		borderColor: boxStylesConfig.variants.borderColor,
		background: boxStylesConfig.variants.background,
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
} as const

const cardStyles = tv(cardStylesConfig)

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
