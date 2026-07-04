export type TextVariant = 'default' | 'title' | 'wavy' | 'muted'
export const VARIANT_MAP: Record<TextVariant, string> = {
	default: 'text-sm text-neutral-600',
	title: 'text-2xl font-medium text-amber-900',
	wavy: 'text-sm text-neutral-600 decoration-wavy',
	muted: 'text-sm text-neutral-400',
}
