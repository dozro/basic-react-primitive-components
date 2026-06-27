// rollup.config.mjs
import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));

const sharedPlugins = [
    resolve(),
    commonjs(),
    postcss({
        extract: 'index.css',
        minimize: true,
        use: [
            ['sass', {
                silenceDeprecations: ['legacy-js-api']
            }]
        ]
    }),
];

const external = [
    ...Object.keys(pkg.peerDependencies || {}),
    'react/jsx-runtime'
];

export default defineConfig([
    {
        input: 'src/index.ts',
        output: {
            dir: 'lib',               // Switch from 'file' to 'dir'
            format: 'cjs',
            entryFileNames: '[name].js',
            preserveModules: true,    // Restores Box.js, Button.js, etc.
            preserveModulesRoot: 'src',
            sourcemap: true,
        },
        external,
        plugins: [
            ...sharedPlugins,
            typescript({
                tsconfig: './tsconfig.json',
                compilerOptions: {
                    declaration: true,
                    declarationMap: true,
                    declarationDir: './lib',
                    outDir: './lib'
                },
                exclude: ['**/*.test.tsx', '**/*.stories.tsx'],
            }),
        ],
    },
    {
        input: 'src/index.ts',
        output: {
            dir: 'lib',               // Switch from 'file' to 'dir'
            format: 'esm',
            entryFileNames: '[name].mjs',
            preserveModules: true,    // Restores Box.mjs, Button.mjs, etc.
            preserveModulesRoot: 'src',
            sourcemap: true,
        },
        external,
        plugins: [
            ...sharedPlugins,
            typescript({
                tsconfig: './tsconfig.json',
                compilerOptions: {
                    declaration: false,
                    declarationMap: false,
                    outDir: './lib'
                },
                exclude: ['**/*.test.tsx', '**/*.stories.tsx'],
            }),
        ],
    }
]);