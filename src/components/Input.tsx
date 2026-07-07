import { Box, boxStylesConfig } from '$components/Box'
import { Button } from '$components/Button'
import { Text, textStylesConfig } from '$components/Text'
import { generateShortId } from '@1ry/short-id'
import React, { HTMLProps, useMemo } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

export const InputStylesConfig = {
	base: 'w-full bg-transparent outline-none text-sm text-zinc-900 placeholder:text-zinc-400',
	variants: {
		width: {
			auto: 'w-auto',
			full: 'w-full',
			medium: 'w-[400px]',
			small: 'w-64',
		},
		textSize: textStylesConfig.variants.size,
		background: boxStylesConfig.variants.background,
	},
	defaultVariants: {
		width: 'medium',
		textSize: textStylesConfig.defaultVariants.size,
	},
} as const

const InputStyles = tv(InputStylesConfig)

/**
 * Props for the Input component.
 */
export type InputProps = HTMLProps<HTMLInputElement> &
	VariantProps<typeof InputStyles> & {
		label?: string
		glowing?: boolean
	}
export function Input({
	label,
	name: customName,
	placeholder,
	width,
	glowing = false,
	type,
	background,
	textSize,
	id: customId,
	...props
}: InputProps) {
	const id = useMemo(() => customId ?? generateShortId(7), [customId])
	const name = useMemo(() => customName ?? id, [customName, id])
	const cname = InputStyles({ width, background, textSize })
	return (
		<Box orientation="none" justify="evenly">
			{label && (
				<Text htmlFor={id} as="label" className="text-sm font-medium text-zinc-700 mt-1.5">
					{label}
				</Text>
			)}

			{type === 'submit' && <Button id={id} asSubmit={true} glowing={glowing} className={cname} />}
			{type !== 'submit' && (
				<input
					name={name}
					className={cname}
					placeholder={placeholder ?? 'meow abc meow'}
					type={type}
					id={id}
					{...props}
				/>
			)}
		</Box>
	)
}
