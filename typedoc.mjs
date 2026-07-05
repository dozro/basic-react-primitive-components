/** @type { import('typedoc').TypeDocOptionMap } */
export default {
	entryPoints: ['./src/**/*.ts', './src/**/*.tsx'],
	tsconfig: 'tsconfig.json',
	out: './docs',
	name: 'RyLib - React Primitive Components',
	includeVersion: true,
	exclude: ['**/*.test.ts', '**/*.spec.ts', 'node_modules', '**/*.stories.tsx', '**/*.stories.ts'],
	excludeInternal: false,
	excludePrivate: false,
	excludeProtected: false,
	sort: ['kind', 'instance-first', 'alphabetical'],
	commentStyle: 'jsdoc',
	searchInComments: true,
	validation: {
		invalidLink: true,
		notExported: true,
	},
	theme: 'default',
	cleanOutputDir: true,
	hideGenerator: true,
}
