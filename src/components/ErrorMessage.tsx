import { Box, BoxProps } from '$components/Box'
import { Text } from '$components/Text'
import React from 'react'
import styles from '$styles/ErrorMessage.module.scss'
import backgroundStyles from '$styles/Backgrounds.module.scss'
import { tv, type VariantProps } from 'tailwind-variants'

const errorMessageStyles = tv({
	base: styles.errorMessageBase,
	variants: {
		variant: {
			critical: [
                styles.critical,
                backgroundStyles.bgRed
            ],
			warning: [
                styles.warning,
                backgroundStyles.bgYellow
            ],
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
		<Box {...props} className={errorMessageStyles({ variant })}>
			<Text>{error.message}</Text>
		</Box>
	)
}
