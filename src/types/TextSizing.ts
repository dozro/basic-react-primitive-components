export type TextSize = 'xs' | 'small' | 'base' | 'large' | 'xl' | '2xl'
export const SIZE_MAP: Record<TextSize, string> = {
	xs: 'text-xs',
	small: 'text-sm',
	base: 'text-base',
	large: 'text-lg',
	xl: 'text-xl',
	'2xl': 'text-2xl',
}
