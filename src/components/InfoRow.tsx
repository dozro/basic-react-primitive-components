import React, { type ComponentPropsWithoutRef, type ReactNode, type ReactElement } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import { Box, BoxProps } from '$components/Box'
import { SIZE_MAP, type TextSize } from '$types/TextSizing'
import { clsx } from 'clsx'

const infoRowStyles = tv({
	base: 'InfoRowComp items-center gap-2 sticky text-neutral-600',
	variants: {
		size: {
			xs: SIZE_MAP.xs,
			small: SIZE_MAP.small,
			base: SIZE_MAP.base,
			large: SIZE_MAP.large,
			xl: SIZE_MAP.xl,
			'2xl': SIZE_MAP['2xl'],
		},
		border: {
			true: 'border border-neutral-300 dark:border-neutral-700 rounded-md p-2',
		},
	},
	defaultVariants: {
		size: 'base',
		border: false,
	},
})

type InfoRowProps = BoxProps & {
	icon: ReactElement
	children: ReactNode
} & VariantProps<typeof infoRowStyles>

export const InfoRow = ({ icon, children, size, className, border, ...props }: Readonly<InfoRowProps>) => {
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
