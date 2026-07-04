import { Box, BoxProps } from '$components/Box'
import { Text } from '$components/Text'
import React from 'react'
import styles from '../styles/ErrorMessage.module.scss'
import { tv, type VariantProps } from 'tailwind-variants'
import clsx from 'clsx'

const errorMessageStyles = tv({
	base: styles.errorMessageBase,
	variants: {
		variant: {
			critical: [styles.critical, 'bg-red-500 dark:bg-red-900'],
			warning: [styles.warning, 'bg-yellow-400 dark:bg-yellow-300'],
		},
	},
	defaultVariants: {
		variant: 'critical',
	},
})

export type ErrorMessageProps = BoxProps &
	VariantProps<typeof errorMessageStyles> & {
		error: Error
	}

export function ErrorMessage({ error, variant, ...props }: ErrorMessageProps) {
	return (
		<Box
			{...props}
			style={{
				...styles.errorMessageBase,
				...(variant === 'critical' ? styles.critical : undefined),
				...(variant === 'warning' ? styles.warning : undefined),
				...props.style,
			}}
			className={clsx(errorMessageStyles({ variant }), props.className)}
		>
			<Text>{error.message}</Text>
		</Box>
	)
}
