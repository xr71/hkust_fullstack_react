'use strict'

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

gulp.task('sass', () => {
    return gulp.src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', () => {
    gulp.watch('./css/*.scss', ['sass']);
});

gulp.task('browser-sync', () => {
    var files = [
        './*.html',
        './css/*.css',
        './img/*.{png,jpg,jpeg,gif}',
        './js/*.js'
    ]

    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    })
})

gulp.task('default', ['browser-sync'], () => {
    gulp.start('sass:watch')
});