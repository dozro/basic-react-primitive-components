import React, { type ComponentPropsWithoutRef, useId, useState } from 'react'
import { Box } from '$components/Box'
import { Text } from '$components/Text'

import { tv, type VariantProps } from 'tailwind-variants'

export const textAreaStylesConfig = {
	slots: {
		root: 'flex flex-col gap-1.5 w-full',
		label:
			'text-sm font-semibold text-slate-700 dark:text-slate-300 select-none progress-none transition-colors duration-150',
		textarea: [
			'w-full min-h-[100px] rounded-lg border px-3 py-2 text-sm shadow-sm transition-all duration-200 ease-in-out',
			'bg-white text-slate-900 border-slate-300 placeholder:text-slate-400',
			'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none',
			'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200',
			'dark:bg-slate-950 dark:text-slate-50 dark:border-slate-800 dark:placeholder:text-slate-600',
			'dark:focus:border-blue-400 dark:focus:ring-blue-400/20',
			'dark:disabled:bg-slate-900 dark:disabled:text-slate-600',
		],
	},
	variants: {
		variant: {
			default: {},
			filled: {
				textarea:
					'bg-slate-100 border-transparent focus:bg-white dark:bg-slate-900 dark:focus:bg-slate-950',
			},
		},
		isInvalid: {
			true: {
				label: 'text-red-600 dark:text-red-400',
				textarea:
					'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-400 dark:focus:border-red-400',
			},
		},
	},
	defaultVariants: {
		variant: 'default',
	},
} as const

export const textAreaStyles = tv(textAreaStylesConfig)

export type TextAreaVariants = VariantProps<typeof textAreaStyles>

export type TextAreaProps = ComponentPropsWithoutRef<'textarea'> &
	TextAreaVariants & {
		label?: string
		classNames?: {
			root?: string
			label?: string
			textarea?: string
		}
	}

const TextArea = ({
	label,
	variant,
	isInvalid,
	className,
	classNames,
	disabled,
	id: customId,
	...props
}: TextAreaProps) => {
	const defaultId = useId()
	const id = customId ?? defaultId
	const { root, label: labelSlot, textarea } = textAreaStyles({ variant, isInvalid })

	return (
		<Box className={root({ class: classNames?.root ?? className })}>
			{label && (
				<Text as="label" htmlFor={id} className={labelSlot({ class: classNames?.label })}>
					{label}
				</Text>
			)}
			<Box className="relative w-full h-full isolation-auto">
				<textarea
					{...props}
					id={id}
					disabled={disabled}
					className={textarea({ class: classNames?.textarea })}
				/>
			</Box>
		</Box>
	)
}

export { TextArea }
export default TextArea
