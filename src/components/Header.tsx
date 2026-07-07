import React, { type ComponentPropsWithoutRef, type ReactNode } from "react"
import Box, { type BoxProps } from "$components/Box"

type HeaderProps = ComponentPropsWithoutRef<'header'> & BoxProps & {
    children?: ReactNode
}

const Header = ({children, ...props}: HeaderProps) => {

    return (
        <Box as="header" className="ryHeader" {...props}>
            {children}
        </Box>
    )
}

export {Header, HeaderProps}
export default Header