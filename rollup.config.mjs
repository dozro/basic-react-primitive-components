// rollup.config.mjs
import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import renameNodeModules from 'rollup-plugin-rename-node-modules';
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
    renameNodeModules('external'),
];

const external = [
    ...Object.keys(pkg.peerDependencies || {}),
    'react/jsx-runtime'
];

export default defineConfig([
    {
        input: 'src/index.ts',
        output: {
            dir: 'lib',
            format: 'cjs',
            entryFileNames: '[name].js',
            preserveModules: true, 
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
                exclude: ['**/*.test.tsx', '**/*.stories.tsx', './node_modules/**', './lib/**', './dist/**'],
            }),
        ],
    },
    {
        input: 'src/index.ts',
        output: {
            dir: 'lib',   
            format: 'esm',
            entryFileNames: '[name].mjs',
            preserveModules: true,  
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
                exclude: ['**/*.test.tsx', '**/*.stories.tsx', './node_modules/**', './lib/**', './dist/**'],
            }),
        ],
    }
]);