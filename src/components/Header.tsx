import React, { type ReactNode } from 'react'
import { Box, type BoxProps } from '$components/Box'
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

export const headerStyles = tv({
	variants: {
		sticky: {
			true: 'sticky',
			false: '',
		},
		position: {
			top: 'top-0 left-0 right-0',
			bottom: 'bottom-0 left-0 right-0',
		},
		blur: {
			true: 'backdrop-blur-md',
			false: '',
		},
	},
	defaultVariants: {
		sticky: true,
		position: 'top',
		blur: true,
	},
} as const)

type HeaderProps = BoxProps &
	VariantProps<typeof headerStyles> & {
		children?: ReactNode
	}

export const Header = ({
	children,
	className,
	sticky,
	position,
	orientation = 'horizontal',
	blur,
	...props
}: HeaderProps) => {
	return (
		<Box as="header" className="ryHeader w-full" {...props}>
			<Box
				className={twMerge(
					className,
					headerStyles({ sticky, position, blur }),
					'z-50 border-b bg-base-100/90',
				)}
				variant="navbar"
				as="nav"
				orientation={orientation}
				isolate
			>
				<Box
					justify="spaceBetween"
					align="center"
					className="mx-auto h-16 max-w-7xl px-4 sm:px-6 lg:px-8"
				>
					{children}
				</Box>
			</Box>
		</Box>
	)
}
