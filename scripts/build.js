import pkg from '../package.json'
import fs from 'fs'
import 'shelljs/global'

import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import babelrc from 'babelrc-rollup'
import uglify from 'rollup-plugin-uglify'

const rollup = require('rollup')

import gu from 'gulp'
import size from 'gulp-size'

rm('-rf', 'npm')
mkdir('-p', 'npm/dist/')
cp('-R', 'README.md', 'npm')

rollup.rollup({
  entry: 'src/index.js',
  plugins: [
    babel(babelrc({
      addExternalHelpersPlugin: false,
    })),
    commonjs(),
  ],
}).then((bundle) => {
  const dest = `npm/dist/${pkg.name}.js`
  bundle.write({
    dest,
    format: 'umd',
    moduleName: 'DelegateTo',
  })

  return dest
})
.then((entry) => {
  delete pkg.devDependencies
  delete pkg.scripts

  fs.writeFile(`npm/package.json`, JSON.stringify(pkg, null, 2))

  rollup.rollup({
    entry,
    plugins: [
      uglify()
    ],
  }).then((bundle) => {
    bundle.write({
      dest: `npm/${pkg.main}`,
      format: 'umd',
      moduleName: 'DelegateTo',
    })

    gu.src('npm/**')
      .pipe(size({
        pretty: true,
        showFiles: true,
        gzip: true,
      }))
  })
})
