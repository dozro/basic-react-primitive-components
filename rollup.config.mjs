import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import alias from '@rollup/plugin-alias'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { readFileSync } from 'node:fs'
import { globSync } from 'glob'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'))

const isExternal = (id) => {
	if (id.startsWith('.') || id.startsWith('$') || id.startsWith('src/')) return false
	if (
		id.includes('@phosphor-icons/react')
	)
		return false
	if (id.includes('katex')) return false
	if (path.isAbsolute(id)) {
		if (id.startsWith(__dirname)) {
			return false
		}
		return id.includes('node_modules')
	}
	return true
}

const inputFiles = globSync(['src/**/*.ts', 'src/**/*.tsx'], {
	ignore: [
		'src/**/*.d.ts',
		'src/**/*.test.ts',
		'src/**/*.stories.ts',
		'src/**/*.stories.tsx',
		'src/**/*.spec.ts',
	],
})

const inputObject = Object.fromEntries(
	inputFiles.map((file) => [
		path.relative('src', file).replace(/\.[^/.]+$/, ''), // schneidet .ts/.tsx ab
		file,
	]),
)

export default defineConfig([
	{
		input: inputObject,
		output: [
			{
				dir: 'lib',
				format: 'cjs',
				entryFileNames: (chunkInfo) => {
					return '[name].js'
				},
				preserveModules: true,
				preserveModulesRoot: 'src',
				sourcemap: true,
				exports: 'named',
				minifyInternalExports: false,
				interop: 'auto',
			},
			{
				dir: 'lib',
				format: 'esm',
				entryFileNames: (chunkInfo) => {
					return '[name].mjs'
				},
				preserveModules: true,
				preserveModulesRoot: 'src',
				sourcemap: true,
			},
		],
		external: isExternal,
		plugins: [
			alias({
				entries: [
					{ find: '$components', replacement: path.resolve(__dirname, 'src/components') },
					{ find: '$types', replacement: path.resolve(__dirname, 'src/types') },
					{ find: '$styles', replacement: path.resolve(__dirname, 'src/styles') },
				],
			}),
			postcss({
				extract: 'index.css',
				minimize: true,
				modules: true,
				extensions: ['.scss', '.css'],
				use: [['sass', { silenceDeprecations: ['legacy-js-api'] }]],
				writeDefinitions: false,
			}),
			resolve({
				extensions: ['.ts', '.tsx', '.d.ts', '.scss'],
				resolveOnly: [
					'@phosphor-icons/react',
					/^@phosphor-icons\/react\/.*?/,
					'clsx',
					/^clsx\/.*?/,
					'tailwind-variants',
					/^tailwind-variants\/.*?/,
				],
			}),
			commonjs(),
			typescript({
				tsconfig: './tsconfig.json',
				declaration: true,
				declarationMap: true,
				outDir: './lib',
				compilerOptions: {
					composite: false,
					ignoreDeprecations: '6.0',
					rootDir: './src',
				},
				exclude: [
					'**/*.test.tsx',
					'**/*.test.ts',
					'**/*.stories.tsx',
					'**/*.stories.ts',
					'./node_modules/**',
					'./lib/**',
				],
			}),
			{
				name: 'generate-output-index',
				generateBundle(options, bundle) {
					const files = Object.keys(bundle).filter(
						(fileName) => fileName.endsWith('.js') || fileName.endsWith('.mjs'),
					)

					const cjsRequires = []
					const esmExports = []
					const dtsExports = []

					inputFiles.forEach((file) => {
						const relPath = path.relative('src', file).replace(/\.[^/.]+$/, '')
						cjsRequires.push(`    require('./${relPath}.js')`)
						esmExports.push(`export * from './${relPath}.mjs';`)
						dtsExports.push(`export * from './${relPath}.d.ts';`)
					})

					const cjsSource =
						cjsRequires.length > 0
							? `Object.assign(\n  module.exports,\n${cjsRequires.join(',\n')}\n);\n`
							: 'module.exports = {};\n'

					this.emitFile({
						type: 'asset',
						fileName: 'index.js',
						source: cjsSource,
					})
					this.emitFile({
						type: 'asset',
						fileName: 'index.mjs',
						source: esmExports.join('\n'),
					})
					this.emitFile({
						type: 'asset',
						fileName: 'index.d.ts',
						source: dtsExports.join('\n'),
					})
				},
			},
		],
	},
])
