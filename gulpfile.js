'use strict';

const gulp = require('gulp');
const util = require('gulp-util');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const haml = require('gulp-ruby-haml');
const livereload = require('gulp-livereload');
const babel = require('gulp-babel');

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

gulp.task('html', () => {
  return gulp.src('./src/index.html').pipe(gulp.dest('./build'));
});

gulp.task('babel', () => {
  gulp.src('src/script.js')
      .pipe(babel({ presets: ['es2015'] }))
      .on('error', function(err) {
        console.error(err);
        this.emit('end');
      }).pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
  livereload.listen({ reloadPage: 'build/index.html' });
  gulp.watch('./src/*.scss', ['sass']);
  gulp.watch('./src/*.html', ['html']);
  gulp.watch('./src/*.js', ['babel']);
});

gulp.task('default', ['watch', 'sass', 'html', 'babel']);
