import { Box, BoxProps } from '$components/Box'
import { IconButton } from '$components/IconButton'
import { Text } from '$components/Text'
import { generateShortId } from '@1ry/short-id'
import React, { ReactNode, useMemo } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import MODALSTYLES from '../styles/Modal.module.scss'
import clsx from 'clsx'

const modalStyles = tv({
	variants: {
		variant: {
			default: '',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

export type ModalProps = BoxProps &
	VariantProps<typeof modalStyles> & {
		onClose?: () => void
		onSubmit?: () => void
		modalTitle?: ReactNode
		modalSubTitle?: ReactNode
		children?: ReactNode
		closeIcon?: ReactNode
		closeText?: string
		showSubmitButton?: boolean
		submitText?: string
		submitIcon?: ReactNode
	}
export const Modal = ({
	onClose,
	onSubmit,
	id: customId,
	modalTitle,
	modalSubTitle = 'Press ESC key or click the button below to close',
	children,
	closeText = 'Close',
	closeIcon = (
		<Text as="span" variant="wavy">
			✖
		</Text>
	),
	showSubmitButton,
	submitText,
	submitIcon,
	...props
}: ModalProps) => {
	const id = useMemo(() => customId ?? generateShortId(7), [customId])
	return (
		<dialog
			id={id}
			className={clsx(MODALSTYLES.modalBase, modalStyles({ variant: 'default' }), props.className)}
		>
			<Box
				orientation="none"
				id={`${id}_modal_box`}
				{...props}
				className={clsx(MODALSTYLES.modalBase, modalStyles({ variant: 'default' }), props.className)}
			>
				{modalTitle && <Box>{modalTitle}</Box>}
				{modalSubTitle && <Box>{modalSubTitle}</Box>}
				<Box
					orientation="vertical"
					id={`${id}_modal_inner`}
					className={modalStyles({ variant: 'default' })}
				>
					<Box orientation="vertical">{children}</Box>
					<Box align="right" orientation="horizontal" justify="spaceBetween" gap={4}>
						{showSubmitButton && (
							<IconButton
								onClick={() => (onSubmit ? onSubmit() : null)}
								label={submitText}
								className="ps-8"
							>
								{submitIcon}
							</IconButton>
						)}
						<IconButton
							onClick={() => (document.getElementById(id) as HTMLDialogElement).close()}
							label={closeText}
						>
							{closeIcon}
						</IconButton>
					</Box>
				</Box>
			</Box>
		</dialog>
	)
}
