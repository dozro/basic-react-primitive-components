import React, { useId, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { Box, type BoxProps } from './Box'
import { twMerge } from 'tailwind-merge'

export type SelectProps = Partial<ComponentPropsWithoutRef<'select'>> &
	Partial<Pick<BoxProps, 'background'>> & {
		children?: ReactNode
		className?: string
	}

export const Select = ({ children, className, background, ...props }: SelectProps) => {
	return (
		<Box background={background}>
			<select
				{...props}
				className={twMerge(
					className,
					'focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20',
					'appearance-none',
					'cursor-pointer',
				)}
			>
				{children}
			</select>
		</Box>
	)
}

export type OptionProps = ComponentPropsWithoutRef<'option'>

export const Option = ({ children, ...props }: OptionProps) => {
	return <option {...props}>{children}</option>
}

export type SmartSelectOption = {
	value: string
	label: string
}

export type SmartSelectProps = Omit<SelectProps, 'children'> & {
	options: SmartSelectOption[]
	label: string
}

export const SmartSelect = ({ options, label, ...props }: SmartSelectProps) => {
	const htmlId = useId()

	return (
		<Select id={htmlId} {...props}>
			{label && (
				<Option value="" disabled>
					{label}
				</Option>
			)}
			{options.map((option) => (
				<Option key={option.value} value={option.value}>
					{option.label}
				</Option>
			))}
		</Select>
	)
}
