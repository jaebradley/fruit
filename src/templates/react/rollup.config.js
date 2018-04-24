import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import filesize from 'rollup-plugin-filesize';
import autoprefixer from 'autoprefixer';
import localResolve from 'rollup-plugin-local-resolve';
import uglify from 'rollup-plugin-uglify';
import minify from 'rollup-plugin-babel-minify';

const config = {
  input: 'src/index.js',
  output: [
    {
      file: 'build/index.js',
      format: 'umd',
      name: '{{packageName}}',
      globals: {
        react: 'React',
        'prop-types': 'PropTypes',
      },
    },
    {
      file: 'build/index.cjs.js',
      format: 'cjs',
      name: '{{packageName}}',
    },
    {
      file: 'build/index.esm.js',
      format: 'es',
    },
  ],
  external: [
    'react',
    'react-dom',
    'prop-types',
  ],
  plugins: [
    peerDepsExternal(),
    postcss({ extract: true, plugins: [autoprefixer] }),
    babel({ exclude: 'node_modules/**' }),
    localResolve(),
    resolve(),
    commonjs(),
    minify(),
    uglify(),
    filesize(),
  ],
};

export default config;
