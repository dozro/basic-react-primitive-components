import Box, { type BoxProps } from '$components/Box'
import React, { useMemo } from 'react'
import 'prismjs/themes/prism-twilight.css'
import Prism from 'prismjs'

type CodeBlockProps = BoxProps & {
	code: string
	language?: string
}

const CodeBlock = ({ code, language, ...props }: CodeBlockProps) => {
	const highlightedCode = useMemo(() => {
		return Prism.highlight(
			code,
			Prism.languages[language ?? 'plain'] || Prism.languages.plain,
			language ?? 'plain',
		)
	}, [language, code])
	return (
		<Box isolate {...props}>
			<Box dangerouslySetInnerHTML={{ __html: highlightedCode }} />
		</Box>
	)
}

export { CodeBlock }
export default CodeBlock
