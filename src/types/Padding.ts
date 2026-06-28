/**
 * Defines the allowed padding sizes for the Text component.
 * @type {PaddingSize}
 * @typedef {'none' | '10' | '20'} PaddingSize
 */
export type PaddingSize = 'none' | '10' | '20'
/**
 * Maps padding sizes to their corresponding CSS classes.
 * @type {Record<PaddingSize, string>}
 * @constant
 */
export const PADDING_MAP: Record<PaddingSize, string> = {
	none: '',
	'10': 'ps-10',
	'20': 'ps-20',
}
