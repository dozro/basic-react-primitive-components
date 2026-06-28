import { Box, BoxProps } from '$components/Box'
import { Text } from '$components/Text'
import React from 'react'
import styles from '$styles/ErrorMessage.module.scss'
import { tv } from 'tailwind-variants'
import { VariantProps } from '$utils/tv'

const errorMessageStyles = tv({
	base: styles.errorMessageBase,
    variants: {
        variant: {
            critical: styles.critical,
            warning: styles.warning,
        },
    },
    defaultVariants: {
        variant: 'critical',
    },
})

export type ErrorMessageProps = BoxProps & VariantProps<typeof errorMessageStyles> & {
	error: Error
}

export function ErrorMessage({ error, ...props }: ErrorMessageProps) {
	return (
		<Box {...props} className={errorMessageStyles()}>
			<Text>{error.message}</Text>
		</Box>
	)
}
