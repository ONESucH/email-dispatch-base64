/* WARNING!! GULP сборка под mail рассылку */
'use strict';
var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    base64 = require('gulp-inline-base64');

gulp.task('connect', function () {
    browserSync.init({
        server: 'app/'
    });
    gulp.watch([
        'app/img/**/*.*'
    ], ['reduce']);
    gulp.watch([
        'app/*.html'
    ], ['htmlBuilder']);
});

gulp.task('htmlBuilder', function () {
    gulp.src('app/*.html')
        .pipe(plumber())
        .pipe(base64({
            baseDir: 'app/', // корень проекта
            maxSize: 14 * 1024,
            debug: false
        }))
        .pipe(gulp.dest('build/'));
    browserSync.reload();
});

gulp.task('reduce', function () {
    gulp.src('app/img/**/*.*')
        .pipe(plumber())
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [{removeViewBox: true}]
        }))
        .pipe(gulp.dest('build/img/'));
    browserSync.reload();
});

gulp.task('default', ['connect', 'htmlBuilder', 'reduce']);