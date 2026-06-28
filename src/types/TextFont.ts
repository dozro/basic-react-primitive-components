/**
 * Defines the allowed font weights for the Text component.
 * @type {TextFontWeight}
 * @typedef {'normal' | 'medium' | 'semibold' | 'bold'} TextFontWeight
 */
export type TextFontWeight = 'normal' | 'medium' | 'semibold' | 'bold'
/**
 * Maps font weights to their corresponding CSS classes.
 * @type {Record<TextFontWeight, string>}
 * @constant
 */
export const FONT_MAP: Record<TextFontWeight, string> = {
	normal: 'font-normal',
	medium: 'font-medium',
	semibold: 'font-semibold',
	bold: 'font-bold',
}
