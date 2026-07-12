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
			critical: 'bg-[var(--rylib-color-error-light) dark:bg-[var(--rylib-color-error-dark)]',
			warning: 'bg-[var(--rylib-color-warning-light) dark:bg-[var(--rylib-color-warning-dark)]',
			success: 'bg-[var(--rylib-color-success-light) dark:bg-[var(--rylib-color-success-dark)]',
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
			className={clsx(
				errorMessageStyles({ variant }),
				styles.errorMessageBase,
				variant === 'critical' ? styles.critical : undefined,
				variant === 'warning' ? styles.warning : undefined,
				props.className,
			)}
		>
			<Text>{error.message}</Text>
		</Box>
	)
}
