import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import filesize from 'rollup-plugin-filesize';
import autoprefixer from 'autoprefixer';
import localResolve from 'rollup-plugin-local-resolve';
import { terser } from 'rollup-plugin-terser';
import minify from 'rollup-plugin-babel-minify';

import pkg from '../package.json';

const globals = [
  'react',
  'react-dom',
  'prop-types',
];

const external = globals;

const config = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: '{{packageName}}',
      globals,
    },
    {
      file: pkg.main,
      format: 'cjs',
      name: '{{packageName}}',
      globals,
    },
    {
      file: pkg.module,
      format: 'es',
      name: '{{packageName}}',
      globals,
    },
  ],
  external,
  plugins: [
    peerDepsExternal(),
    postcss({ extract: true, plugins: [autoprefixer] }),
    babel({ exclude: 'node_modules/**' }),
    localResolve(),
    resolve({
      extensions: [
        '.js',
        '.jsx',
      ],
    }),
    commonjs(),
    minify(),
    terser(),
    filesize(),
  ],
};

export default config;
