import React, { type ComponentPropsWithoutRef, type ReactNode, type ReactElement } from 'react'
import { tv } from 'tailwind-variants'
import { Box } from '$components/Box'
import { SIZE_MAP, type TextSize } from '$types/TextSizing'

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
	},
})

type InfoRowProps = ComponentPropsWithoutRef<'div'> & {
	icon: ReactElement
	children: ReactNode
	size?: TextSize
}

export const InfoRow = ({ icon, children, size, className, ...props }: Readonly<InfoRowProps>) => {
	return (
		<Box className={infoRowStyles({ size, className })} orientation="horizontal" {...props}>
			{icon}
			{children}
		</Box>
	)
}
