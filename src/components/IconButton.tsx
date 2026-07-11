import { Button, ButtonProps } from '$components/Button'
import { Text, TextProps } from '$components/Text'
import { generateShortId } from '@1ry/short-id'
import React, { ReactNode, useMemo } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import ibStyles from '../styles/IconButton.module.scss'
import { clsx } from 'clsx'

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
	VariantProps<typeof inputButtonStyles> &
	Partial<Pick<TextProps<'label'>, 'size'>> & {
		className?: string
		children?: ReactNode
		label?: string
	}

export function IconButton({
	className,
	children,
	label,
	id: customId,
	size = 'base',
	...props
}: IconButtonProps) {
	const id = useMemo(() => customId ?? generateShortId(7), [customId])
	return (
		<Button
			name={id}
			className={clsx(
				inputButtonStyles({ variant: 'default' }),
				className,
				ibStyles.iconButtonBase,
			)}
			{...props}
		>
			{children}
			{label && (
				<Text size={size} htmlFor={id} paddingBefore="10" as="label" variant="wavy">
					{' '}
					{label}
				</Text>
			)}
		</Button>
	)
}
