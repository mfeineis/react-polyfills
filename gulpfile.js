var path = require('path');

var chalk = require('chalk');

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

var options = {
    distDir: 'dist/',
    fileName: 'react-polyfills',
    uglify: {
        compress: {
            global_defs: {
                //DEBUG: false
            }
        },
        preserveComments: 'license'
    }
}

gulp.task('js-raw', function () {
    return gulp.src('src/index.js')
        .pipe(rename(options.fileName + '.debug.js'))
        .pipe(gulp.dest(options.distDir));
});

gulp.task('js-min', function () {
    return gulp.src('src/index.js')
        .pipe(uglify(options.uglify))
        .pipe(rename(options.fileName + '.js'))
        .pipe(gulp.dest(options.distDir));
});

// Not a fan of the *.min.js thingy but it may be useful
// in a gulp script
gulp.task('js-min2', function () {
    return gulp.src('src/index.js')
        .pipe(uglify(options.uglify))
        .pipe(rename(options.fileName + '.min.js'))
        .pipe(gulp.dest(options.distDir));
});

gulp.task('default', ['js-raw', 'js-min', 'js-min2'], function (next) {
    next();
    console.log('Optimized files put into ' + chalk.magenta(options.distDir) + '.');
})