import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import alias from '@rollup/plugin-alias'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import dts from 'rollup-plugin-dts'
import { readFileSync } from 'node:fs'
import terser from '@rollup/plugin-terser'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'))

const isExternal = (id) => {
	if (id.startsWith('.') || id.startsWith('$') || id.startsWith('src/')) {
		return false
	}
	if (id.includes('@phosphor-icons/react')) {
		return false
	}
	if (id.includes('clsx')) {
		return false
	}
	if (id.includes('tailwind-variants')) {
		return false
	}
	if (path.isAbsolute(id)) {
		if (id.startsWith(__dirname)) {
			return false
		}
		return id.includes('node_modules')
	}
	return true
}

export default defineConfig([
	{
		input: 'src/index.ts',
		output: [
			{
				dir: 'lib',
				format: 'cjs',
				entryFileNames: '[name].js',
				preserveModules: false,
				preserveModulesRoot: 'src',
				sourcemap: true,
				exports: 'named',
				minifyInternalExports: false,
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
			terser({
				compress: {
					inline: 1,
					unsafe_arrows: true,
				},
				mangle: true,
				format: {
					comments: 'some',
					preamble: `/* ${pkg.name} v${pkg.version} | (c) 2024 Rye | Apache 2.0 License */`,
					webkit: true,
				},
				ie8: true,
				safari10: true,
			}),
			commonjs(),
			typescript({
				tsconfig: './tsconfig.json',
				declaration: false,
				declarationMap: false,
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
		],
	},
	{
		input: 'src/index.ts',
		output: [
			{
				file: 'lib/index.d.ts',
				format: 'esm',
			},
		],
		external: (id) =>
			!id.startsWith('.') && !id.startsWith('$') && !id.startsWith('src/') && !path.isAbsolute(id),
		plugins: [
			alias({
				entries: [
					{ find: '$components', replacement: path.resolve(__dirname, 'src/components') },
					{ find: '$types', replacement: path.resolve(__dirname, 'src/types') },
					{ find: '$styles', replacement: path.resolve(__dirname, 'src/styles') },
					{ find: '$utils', replacement: path.resolve(__dirname, 'src/utils') },
				],
				customResolver: resolve({ extensions: ['.ts', '.tsx', '.d.ts'] }),
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
			dts(),
		],
	},
])
