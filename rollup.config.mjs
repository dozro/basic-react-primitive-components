import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import alias from '@rollup/plugin-alias'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { readFileSync } from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'))

export default defineConfig({
	input: 'src/index.ts',
	output: [
		{
			dir: 'lib',
			format: 'cjs',
			entryFileNames: '[name].js',
			preserveModules: true,
			preserveModulesRoot: 'src',
			sourcemap: true,
			exports: 'named',
			interop: 'auto',
		},
		{
			dir: 'lib',
			format: 'esm',
			entryFileNames: '[name].mjs',
			preserveModules: true,
			preserveModulesRoot: 'src',
			sourcemap: true,
		},
	],
	external: (id) => {
		if (id.startsWith('.') || id.startsWith('$') || id.startsWith('src/')) {
			return false
		}
		if (path.isAbsolute(id)) {
			return id.includes('node_modules')
		}
		return true
	},
	plugins: [
		alias({
			entries: [
				{ find: '$components', replacement: path.resolve(__dirname, 'src/components') },
				{ find: '$types', replacement: path.resolve(__dirname, 'src/types') },
				{ find: '$styles', replacement: path.resolve(__dirname, 'src/styles') },
			],
		}),
		resolve(),
		commonjs(),
		postcss({
			extract: 'index.css', // Extrahiert alles gebündelt in lib/index.css
			minimize: true,
			use: [['sass', { silenceDeprecations: ['legacy-js-api'] }]],
		}),
		typescript({
			tsconfig: './tsconfig.json',
			declaration: true,
			declarationMap: true,
			declarationDir: './lib',
			outDir: './lib',
			compilerOptions: {
				composite: false,
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
	],
})
