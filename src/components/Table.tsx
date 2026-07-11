import React, { useId, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { Box, type BoxProps } from './Box'
import { Text } from './Text'

export type TableProps = Partial<ComponentPropsWithoutRef<'table'>> &
	Partial<Pick<BoxProps, 'background' | 'align' | 'justify' | 'borderColor'>>

export const Table = ({
	background,
	align,
	justify,
	borderColor,
	children,
	...props
}: TableProps) => {
	return (
		<Box background={background} align={align} justify={justify} borderColor={borderColor}>
			<table {...props}>{children}</table>
		</Box>
	)
}

export const TableRow = ({ children, ...props }: ComponentPropsWithoutRef<'tr'>) => (
	<tr {...props}>{children}</tr>
)

export type TableDataProps = Partial<ComponentPropsWithoutRef<'td'>> &
	Partial<Pick<BoxProps, 'background' | 'align' | 'justify' | 'borderColor'>> & {
		as?: 'header' | 'data'
	}

export const TableData = ({
	background,
	align,
	justify,
	borderColor,
	children,
	as = 'data',
	...props
}: TableDataProps) =>
	as === 'data' ? (
		<td {...props}>
			<Box background={background} align={align} justify={justify} borderColor={borderColor}>
				{children}
			</Box>
		</td>
	) : (
		<th>
			<Box background={background} align={align} justify={justify} borderColor={borderColor}>
				{children}
			</Box>
		</th>
	)

export type Column<T> = {
	key: keyof T
	label: ReactNode
	render?: (value: T[keyof T], row: T) => ReactNode
}

export type SmartTableProps<T> = Partial<
	Pick<BoxProps, 'background' | 'borderColor' | 'noBorder'>
> & {
	columns: Column<T>[]
	rows: T[]
	footer?: ReactNode
}

export function SmartTable<T>({
	columns,
	rows,
	footer,
	background,
	borderColor,
	noBorder,
}: Readonly<SmartTableProps<T>>) {
	const boxId = useId()
	return (
		<Box
			id={boxId}
			background={background}
			borderColor={borderColor}
			noBorder={noBorder}
			className="rounded-lg shadow-sm overflow-hidden"
		>
			<Box className="block md:hidden divide-y divide-slate-100">
				{rows.map((row, i) => (
					<Box key={i} className="p-4 space-y-2">
						{columns.map((column) => (
							<Box key={String(column.key)} className="flex justify-between">
								<Text>{column.label}</Text>

								<Text>
									{column.render ? column.render(row[column.key], row) : String(row[column.key])}
								</Text>
							</Box>
						))}
					</Box>
				))}
			</Box>

			<Box className="hidden md:block overflow-x-auto">
				<Table className="w-full">
					<thead>
						<TableRow>
							{columns.map((column) => (
								<TableData as="header" key={String(column.key)}>
									{column.label}
								</TableData>
							))}
						</TableRow>
					</thead>
					<tbody>
						{rows.map((row, i) => (
							<TableRow key={i}>
								{columns.map((column) => (
									<TableData as="data" key={String(column.key)}>
										{column.render ? column.render(row[column.key], row) : String(row[column.key])}
									</TableData>
								))}
							</TableRow>
						))}
					</tbody>
				</Table>
			</Box>
			{footer}
		</Box>
	)
}
