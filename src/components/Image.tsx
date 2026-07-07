import React, { HTMLProps } from 'react'
import { Box, type BoxProps } from '$components/Box'

type ImageProps = HTMLProps<HTMLImageElement> &
	Pick<BoxProps, 'orientation' | 'background' | 'justify' | 'align'> & {
		loading?: 'eager' | 'lazy'
	}

const Image = ({
	loading = 'lazy',
	orientation,
	background,
	justify,
	align,
	...props
}: ImageProps) => {
	return (
		<Box orientation={orientation} background={background} justify={justify}>
			<img loading={loading} {...props} />
		</Box>
	)
}

export { Image, ImageProps }
export default Image
