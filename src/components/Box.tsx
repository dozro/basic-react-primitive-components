import { generateShortId } from '@1ry/short-id'
import { tv } from 'tailwind-variants'
import { VariantProps } from '$utils/tv'
import React, { Children, HTMLAttributes, ReactNode, useMemo } from 'react'
import backgroundStyles from '$styles/Backgrounds.module.scss'

const boxStyles = tv({
	base: 'transition-all duration-200',
	variants: {
		variant: {
			default: '',
			navbar: 'navbar',
			dock: 'dock',
		},
		orientation: {
			none: '',
			horizontal: 'flex flex-row',
			vertical: 'flex flex-col',
		},
    background: {
            teal: backgroundStyles.bgTeal,
            yellow: backgroundStyles.bgYellow,
            gray: backgroundStyles.bgGray,
            transparent: 'bg-transparent',
            magenta: backgroundStyles.bgMagenta,
            cyan: backgroundStyles.bgCyan,
            amber: backgroundStyles.bgAmber,
            lime: backgroundStyles.bgLime,
            indigo: backgroundStyles.bgIndigo,
            rose: backgroundStyles.bgRose,
            slate: backgroundStyles.bgSlate,
            violet: backgroundStyles.bgViolet,
            orange: backgroundStyles.bgOrange,
    },
		align: {
			none: '',
			left: 'items-start text-left',
			center: 'items-center text-center',
			right:
				'items-end text-right data-[has-gap=true]:place-self-end-safe data-[has-gap=true]:place-content-end-safe data-[has-gap=true]:place-items-end-safe',
		},
		justify: {
			none: 'justify-none',
			start: 'justify-start',
			end: 'justify-end',
			center: 'justify-center',
			evenly: 'justify-evenly',
			spaceBetween: 'justify-between',
		},
		isolate: {
			true: 'isolate',
		},
	},
	defaultVariants: {
		variant: 'default',
		orientation: 'none',
		align: 'none',
		justify: 'none',
	},
})

export type BoxProps = HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof boxStyles> & {
		as?: 'div' | 'nav' | 'footer' | 'main' | 'article' | 'aside' | 'section' | 'header'
		children?: ReactNode
		gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
	}

export function Box({
	variant = 'default',
	as,
	className,
	orientation = 'none',
	align = 'none',
	justify = 'none',
  background = 'transparent',
	children,
	isolate = false,
	id: customId,
	gap = 0,
	...props
}: BoxProps) {
	const id = useMemo(() => customId ?? generateShortId(7), [customId])
	const Component = variant === 'navbar' && !as ? 'nav' : as || 'div'
	const childrenCount = useMemo(() => Children.count(children) ?? [], [children])
	const gapStyle = gap ? { gap: `${gap * 0.25}rem` } : undefined
	return (
		<Component
			id={id}
			style={{ ...gapStyle, ...props.style }}
			data-has-gap={gap > 0 ? 'true' : undefined}
			className={boxStyles({
				variant,
				orientation,
				align,
				justify,
				isolate,
				className,
        background,
			})}
			{...props}
		>
			{children}
		</Component>
	)
}
