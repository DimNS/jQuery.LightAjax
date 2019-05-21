var gulp     = require('gulp');
var cleanCSS = require('gulp-clean-css');
var rename   = require('gulp-rename');
var uglify   = require('gulp-uglify');

function CSS() {
    return gulp.src('src/jquery.lightajax.css')
        .pipe(gulp.dest('dist'));
}

function JS() {
    return gulp.src('src/jquery.lightajax.js')
        .pipe(gulp.dest('dist'));
}

function minCSS() {
    return gulp.src('src/jquery.lightajax.css')
        .pipe(cleanCSS())
        .pipe(rename('jquery.lightajax.min.css'))
        .pipe(gulp.dest('dist'));
}

function minJS() {
    return gulp.src('src/jquery.lightajax.js')
        .pipe(uglify())
        .pipe(rename('jquery.lightajax.min.js'))
        .pipe(gulp.dest('dist'));
}

gulp.task('build', gulp.series(
    gulp.parallel(
        CSS,
        JS
    ),
    gulp.parallel(
        minCSS,
        minJS
    )
));