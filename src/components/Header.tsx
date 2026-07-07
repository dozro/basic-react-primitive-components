import React, { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import Box, { type BoxProps } from '$components/Box'

type HeaderProps = ComponentPropsWithoutRef<'header'> &
	BoxProps & {
		children?: ReactNode
	}

const Header = ({ children, ...props }: HeaderProps) => {
	return (
		<Box as="header" className="ryHeader w-full" {...props}>
			<Box
				className="sticky top-0 left-0 right-0 z-50 border-b border-base-300/80 bg-base-100/90 backdrop-blur-md transition-all duration-200"
				variant="navbar"
				as="nav"
				orientation="horizontal"
				isolate
			>
				<Box className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
					{children}
				</Box>
			</Box>
		</Box>
	)
}

export { Header, HeaderProps }
export default Header
