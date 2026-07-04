import { Button, ButtonProps } from '$components/Button'
import { Text } from '$components/Text'
import { generateShortId } from '@1ry/short-id'
import React, { ReactNode, useMemo } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import ibStyles from '../styles/IconButton.module.scss'

const inputButtonStyles = tv({
	base: [ibStyles.iconButtonBase],
	variants: {
		variant: {
			default: '',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

export type IconButtonProps = ButtonProps &
	VariantProps<typeof inputButtonStyles> & {
		className?: string
		children?: ReactNode
		label?: string
	}

export function IconButton({
	className,
	children,
	label,
	id: customId,
	...props
}: IconButtonProps) {
	const id = useMemo(() => customId ?? generateShortId(7), [customId])
	return (
		<Button
			name={id}
			style={{ ...ibStyles.iconButtonBase, ...props.style }}
			className={inputButtonStyles({ variant: 'default' })}
			{...props}
		>
			{children}
			{label && (
				<Text htmlFor={id} paddingBefore="10" as="label" variant="wavy">
					{' '}
					{label}
				</Text>
			)}
		</Button>
	)
}
