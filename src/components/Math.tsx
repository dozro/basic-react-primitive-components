import katex from 'katex'
import 'katex/dist/katex.min.css'
import React, { useEffect, useRef } from 'react'
import { Text, type TextProps } from '$components/Text'
import { type BoxProps, Box } from '$components/Box'

const renderBlock = (latex: string, container: HTMLElement, displayMode = true) => {
	try {
		katex.render(latex, container, {
			throwOnError: false,
			displayMode: displayMode,
		})
	} catch (err: any) {
		container.innerHTML = `<span style="color:red;">${err.message}</span>`
	}
}

type InlineMathProps = TextProps<'span'> & {
	latex: string
}

export const InlineMath = ({ latex, ...props }: InlineMathProps) => {
	const containerRef = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		if (containerRef.current) {
			renderBlock(latex, containerRef.current, false)
		}
	}, [latex])

	return (
		<Text {...props}>
			<span ref={containerRef} />{' '}
		</Text>
	)
}

type BlockMathProps = BoxProps & {
	latex: string
}

export const BlockMath = ({ latex, ...props }: BlockMathProps) => {
	const containerRef = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		if (containerRef.current) {
			renderBlock(latex, containerRef.current, true)
		}
	}, [latex])

	return (
		<Box {...props}>
			<Text>
				<span ref={containerRef} />{' '}
			</Text>
		</Box>
	)
}
