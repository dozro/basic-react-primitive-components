import plugin from 'tailwindcss/plugin'

export const ryThemePlugin = plugin(function ({ addBase }) {}, {
	theme: {
		extend: {
			colors: {
				primary: 'var(--ry-primary)',
				secondary: 'var(--ry-secondary)',
				accent: 'var(--ry-accent)',
				'secondary-accent': 'var(--ry-secondary-accent)',
				success: 'var(--ry-success)',
				info: 'var(--ry-info)',
				warning: 'var(--ry-warning)',
				error: 'var(--ry-error)',
				neutral: 'var(--ry-neutral)',
				background: 'var(--ry-background)',
				surface: 'var(--ry-surface)',
			},
		},
	},
})

export default ryThemePlugin
