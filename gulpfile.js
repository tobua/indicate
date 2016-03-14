var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    eslint = require('gulp-eslint'),
    pleeease = require('gulp-pleeease'),
    replace = require('gulp-replace'),
    fs = require('fs');

gulp.task('sass', function () {
    return gulp.src('src/**/*.scss')
        .pipe(sass({style: 'compressed'}).on('error', sass.logError))
        .pipe(pleeease())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('temp'))
});

gulp.task('js', function() {
    gulp.src('temp/plugin.js')
        .pipe(uglify())
        .pipe(concat('jquery.indicate.min.js'))
        .pipe(gulp.dest('dist'));
        
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

gulp.task('default', ['sass', 'js'], function() {
    var target = gulp.src('temp/plugin.js');
    var source = gulp.src('temp/styles.css');

    return target.pipe(replace('<!-- inject css here -->', fs.readFileSync('temp/styles.css', 'utf8')))
        .pipe(concat('jquery.indicate.js'))
        .pipe(gulp.dest('dist'));
});
