'use strict'

const gulp = require('gulp')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConf = require('./webpack-config')

const browserSync = require('browser-sync').create()

const sass = require('gulp-sass')

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  })
  gulp.watch('src/*.html', ['html'])
  gulp.watch('src/sass/*.scss', ['sass'])
  gulp.watch('src/**/**/*.js', ['js'])
  gulp.watch('src/img/*', ['images'])
})

gulp.task('js', () => {
  gulp.src('./src/js/index.js')
    .pipe(webpackStream(webpackConf), webpack)
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream())
})

gulp.task('html', function () {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream())
})

gulp.task('sass', function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream())
})


gulp.task(
  'default',
  ['browserSync',
    'html',
    'js',
    'sass'
  ]
)