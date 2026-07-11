import React, { type ReactNode, type ReactElement } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import { Box, BoxProps } from '$components/Box'
import { clsx } from 'clsx'

export const infoRowStyles = tv({
	base: 'InfoRowComp items-center gap-2 sticky text-neutral-600',
	variants: {
		size: {
			xs: 'text-xs',
			small: 'text-sm',
			base: 'text-base',
			large: 'text-lg',
			xl: 'text-xl',
			'2xl': 'text-2xl',
		},
		border: {
			true: 'border border-neutral-300 dark:border-neutral-700 rounded-md p-2',
		},
	},
	defaultVariants: {
		size: 'base',
		border: false,
	},
} as const)

export type InfoRowProps = BoxProps & {
	icon: ReactElement
	children: ReactNode
} & VariantProps<typeof infoRowStyles>

export const InfoRow = ({
	icon,
	children,
	size,
	className,
	border,
	...props
}: Readonly<InfoRowProps>) => {
	return (
		<Box
			className={clsx(infoRowStyles({ size, className, border }), 'isolate')}
			orientation="horizontal"
			{...props}
		>
			<Box className="InfoRowIcon" orientation="none">
				{icon}
			</Box>
			<Box className="InfoRowContent" orientation="none">
				{children}
			</Box>
		</Box>
	)
}
