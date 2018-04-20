import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import localResolve from 'rollup-plugin-local-resolve';
import filesize from 'rollup-plugin-filesize';
import minify from 'rollup-plugin-babel-minify';

const config = {
  input: 'src/index.js',
  output: [
    {
      file: 'build/index.js',
      format: 'umd',
      name: "{{packageName}}",
    },
    {
      file: 'build/index.cjs.js',
      format: 'cjs',
      name: "{{packageName}}",
    },
    {
      file: 'build/index.esm.js',
      format: 'es',
    },
  ],
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    minify(),
    localResolve(),
    resolve(),
    commonjs(),
    filesize(),
  ],
};

export default config;
