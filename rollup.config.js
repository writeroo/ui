import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import tailwindcss from 'tailwindcss';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import del from 'rollup-plugin-delete'
import url from '@rollup/plugin-url'

const tailwindConfig = require('./tailwind.config.js');

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                dir: pkg.main,
                format: 'cjs',
            },
            {
                dir: pkg.module,
                format: 'es',
            },
        ],
        external: [...Object.keys(pkg.peerDependencies || {})],
        plugins: [
            //del({ targets: 'dist/*' }),
            nodeResolve(),
            url({
                include: ['**/*.ttf'],
                // setting infinite limit will ensure that the files 
                // are always bundled with the code, not copied to /dist
                limit: 0,
            }),
            commonjs(),
            typescript({
                typescript: require('typescript'),
            }),
            postcss({
                extensions: ['.css'],
                plugins: [
                    tailwindcss(tailwindConfig),
                    require('autoprefixer'),
                ],
            }),
            replace({
                preventAssignment: true,
                'process.env.NODE_ENV': JSON.stringify('dev')
            }),
            babel({
                babelHelpers: "bundled",
                exclude: 'node_modules/**',
                presets: [["@babel/preset-react", { "runtime": "automatic" }]]
            }),
        ],
    },
];