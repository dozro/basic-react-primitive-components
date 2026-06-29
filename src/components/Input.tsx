import { Box } from '$components/Box'
import { Button } from '$components/Button'
import { Text } from '$components/Text'
import { generateShortId } from '@1ry/short-id'
import React, { HTMLProps, useMemo } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const InputStyles = tv({
	base: 'w-full bg-transparent outline-none text-sm text-zinc-900 placeholder:text-zinc-400',
})

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
	width = 'auto',
	glowing = false,
	type,
	id: customId,
	...props
}: InputProps) {
	const id = useMemo(() => customId ?? generateShortId(7), [customId])
	const name = useMemo(() => customName ?? id, [customName, id])
	const cname = 'w-full bg-transparent outline-none text-sm text-zinc-900 placeholder:text-zinc-400'
	return (
		<Box orientation="none" justify="evenly">
			{label && (
				<Text as="label" className="text-sm font-medium text-zinc-700 mt-1.5">
					{label}
				</Text>
			)}

			{type === 'submit' && <Button id={id} asSubmit={true} glowing={glowing} className={cname} />}
			{type !== 'submit' && (
				<input
					name={name}
					className={cname}
					placeholder={placeholder ?? 'meow abc meow'}
					width={width ?? 400}
					type={type}
					id={id}
					{...props}
				/>
			)}
		</Box>
	)
}
