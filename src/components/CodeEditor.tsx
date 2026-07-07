import 'prismjs/themes/prism-twilight.css'
import Prism from 'prismjs'
import * as ReactSimpleEditor from 'react-simple-code-editor'
import React, { useState } from 'react'
import { Box } from '$components/Box'
import { Text } from '$components/Text'

const EditorComponent = (ReactSimpleEditor as any).default
const Editor = EditorComponent.default || EditorComponent
import { TextAreaProps, textAreaStyles } from '$components/Textarea'

export type CodeEditorProps = Pick<
	TextAreaProps,
	'classNames' | 'className' | 'variant' | 'isInvalid' | 'label' | 'disabled'
> & {
	language?: string
	placeholder?: string
}

const CodeEditor = ({
	language,
	classNames,
	variant,
	isInvalid,
	className,
	label,
	disabled,
	placeholder,
	...props
}: CodeEditorProps) => {
	const [code, setCode] = useState(placeholder ?? '')

	const { root, label: labelSlot, textarea } = textAreaStyles({ variant, isInvalid })

	const highlightCode = (input: string) => {
		return Prism.highlight(
			input,
			Prism.languages[language ?? 'plain'] || Prism.languages.plain,
			language ?? 'plain',
		)
	}
	return (
		<Box className={root({ class: classNames?.root ?? className })}>
			{label && (
				<Text as="label" className={labelSlot({ class: classNames?.label })}>
					{label}
				</Text>
			)}
			<Editor
				value={code}
				onValueChange={(code: string) => setCode(code)}
				highlight={(code: string) => highlightCode(code)}
				disabled={disabled}
				className={textarea({ class: classNames?.textarea })}
				style={{
					fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
					fontSize: '14px',
				}}
				padding={10}
				{...props}
			/>
		</Box>
	)
}

export { CodeEditor }
export default CodeEditor
