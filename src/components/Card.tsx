import { BoxProps, Box } from '$components/Box'
import clsx from 'clsx'
import styles from '../styles/Card.module.scss'
import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const cardStyles = tv({
	base: ['transition-all duration-200'],
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
		className={clsx(noBorder ? styles.noBorder : undefined, styles.cardBase, cardStyles({
			noBorder,
			className,
		}))}
	>
		{children}
	</Box>
)
