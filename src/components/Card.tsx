import { BoxProps, Box } from '$components/Box'
import styles from '$styles/Card.module.scss'
import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const cardStyles = tv({
	base: styles.cardBase,
	variants: {
		noBorder: {
			true: styles.noBorder,
		},
	},
})

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
