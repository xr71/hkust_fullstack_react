'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');

function css() {
    return gulp.src('./css/*.scss')
               .pipe(sass({outputStyle: "expanded"}))
               .pipe(gulp.dest('./css'))
}

function watchFiles() {
    gulp.watch('./css/*.scss', css)
}

const watch = gulp.parallel(watchFiles)

exports.css = css;
exports.watch = watch;
