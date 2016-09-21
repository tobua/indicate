var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    eslint = require('gulp-eslint'),
    pleeease = require('gulp-pleeease'),
    replace = require('gulp-replace'),
    fs = require('fs'),
    del = require('del');

gulp.task('sass', function () {
    return gulp.src('src/**/*.scss')
        .pipe(sass({style: 'compressed'}).on('error', sass.logError))
        .pipe(pleeease())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('temp'))
});

gulp.task('js', function() {
    return gulp.src('src/plugin.js')
        .pipe(eslint({
            fix: true,
            extends:'eslint:recommended',
            rules: {
                // Add semicolons
                semi: 1
            }
        }))
        .pipe(eslint.format())
        .pipe(gulp.dest('temp'));
});

gulp.task('combine', ['sass', 'js'], function() {
    var target = gulp.src('temp/plugin.js');
    var source = gulp.src('temp/styles.css');

    return target.pipe(replace('<!-- inject css here -->', fs.readFileSync('temp/styles.css', 'utf8')))
        .pipe(concat('jquery.indicate.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('minify', ['combine'], function() {
    return gulp.src('dist/jquery.indicate.js')
        .pipe(uglify())
        .pipe(concat('jquery.indicate.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('d', ['develop']);

gulp.task('develop', ['default'], function() {
    gulp.watch('src/*', ['default']);
});

gulp.task('default', ['minify'], function() {
    return del(['temp'], {force: true});
});
