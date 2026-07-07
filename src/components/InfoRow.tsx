import React, { type ReactNode, type ReactElement } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import { Box, BoxProps } from '$components/Box'
import { clsx } from 'clsx'
import { textStylesConfig } from '$components/Text'

export const infoRowStylesConfig = {
	base: 'InfoRowComp items-center gap-2 sticky text-neutral-600',
	variants: {
		size: textStylesConfig.variants.size,
		border: {
			true: 'border border-neutral-300 dark:border-neutral-700 rounded-md p-2',
		},
	},
	defaultVariants: {
		size: textStylesConfig.defaultVariants.size,
		border: false,
	},
} as const

export const infoRowStyles = tv(infoRowStylesConfig)

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
