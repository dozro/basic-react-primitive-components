import React, { type ComponentProps } from 'react'
import { Box } from '$components/Box'

export type RootBoxProps = Omit<
	ComponentProps<typeof Box>,
	'paddingX' | 'paddingY' | 'width' | 'grow' | 'variant'
> & {
	/**
	 * Disable the default horizontal page padding.
	 * @default false
	 */
	disablePagePadding?: boolean
}

export const RootBox = ({
	children,
	disablePagePadding = false,
	className,
	...props
}: RootBoxProps) => (
	<Box as="main" width="full" grow="yes" variant="root" className={className} {...props}>
		{children}
	</Box>
)
