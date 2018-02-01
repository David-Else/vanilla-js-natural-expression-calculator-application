import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife', // change to 'iife' for production
    sourcemap: true,
    banner: '/* https://www.elsewebdevelopment.com/ */',
  },
  plugins: [
    nodeResolve({
      jsnext: true, // Default: false
      main: true,
      browser: true, // Default: false
    }),
    commonjs({
      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: true, // Default: true
    }),
    postcss({
      plugins: [
        autoprefixer(),
      ],
      sourceMap: true,
      extract: true,
      // minimize: true,
    }),
  ],
};