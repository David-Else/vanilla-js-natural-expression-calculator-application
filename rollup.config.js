import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

// code for using uglify-es modified from https://github.com/TrySound/rollup-plugin-uglify
const minify = require('uglify-es').minify; // eslint-disable-line

function uglify(userOptions) {
  const options = Object.assign({
    sourceMap: true,
  }, userOptions);

  return {
    name: 'uglify',
    transformBundle(code) {
      const result = minify(code, options);
      if (result.error) {
        throw result.error;
      }
      return result;
    },
  };
}

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife', // change to 'iife' for production, 'es' to test
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
      minimize: true,
    }),
    uglify(),
  ],
};
