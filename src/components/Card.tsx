import { BoxProps, Box, boxStylesConfig } from '$components/Box'
import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

export const cardStylesConfig = {
	base: ['transition-all duration-200'],
	variants: {
		noBorder: boxStylesConfig.variants.noBorder,
		borderColor: boxStylesConfig.variants.borderColor,
	},
} as const

const cardStyles = tv(cardStylesConfig)

export type CardProps = BoxProps & VariantProps<typeof cardStyles> & {}

export const Card = ({ children, className, noBorder, ...props }: CardProps) => (
	<Box
		{...props}
		className={cardStyles({
			noBorder,
			className,
		})}
	>
		{children}
	</Box>
)
