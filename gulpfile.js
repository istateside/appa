'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const haml = require('gulp-haml');
const livereload = require('gulp-livereload');

gulp.task('sass', () => {
  return gulp.src('./src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./build'))
    .pipe(livereload());
});

gulp.task('haml', () => {
  return gulp.src('./src/index.haml')
    .pipe(haml())
    .pipe(gulp.dest('./build'))
});

gulp.task('watch', function() {
  livereload.listen({ reloadPage: './build/index.html' });
  gulp.watch('./src/*.scss', ['sass']);
  gulp.watch('./src/*.haml', ['haml']);
});

gulp.task('default', ['watch', 'sass', 'haml']);