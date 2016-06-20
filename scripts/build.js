import gu from 'gulp'
import rename from 'gulp-rename'
import uglify from 'gulp-uglify'
import pkg from '../package.json'
import del from 'del'
import webpack from 'webpack'
import webpackConf from '../webpack.config'
import fs from 'fs'

del.sync('npm')
webpack(webpackConf, (er, stats)=> {
  console.log(stats.toString({
    colors: true,
  }))

  gu.src('npm/dist/*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gu.dest('npm/dist'))

  ;(()=> {
    const {devDependencies, ava, nyc, scripts, ...pkgJSON} = pkg

    fs.writeFile(`npm/package.json`, JSON.stringify(pkgJSON, null, 2))
  })()
})

gu.src('README.md')
  .pipe(gu.dest('npm'))

