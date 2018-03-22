var gulp     = require('gulp');
var cleanCSS = require('gulp-clean-css');
var rename   = require('gulp-rename');
var uglify   = require('gulp-uglify');

gulp.task('default', ['css', 'js'], function () {
    gulp.watch('src/*.css', ['css']);
    gulp.watch('src/*.js', ['js']);
});

gulp.task('build', ['css', 'js'], function () {

});

gulp.task('css', function () {
    gulp.src('src/jquery.lightajax.css')
        .pipe(gulp.dest('dist'));

    gulp.src('src/jquery.lightajax.css')
        .pipe(cleanCSS())
        .pipe(rename('jquery.lightajax.min.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
    gulp.src('src/jquery.lightajax.js')
        .pipe(gulp.dest('dist'));

    gulp.src('src/jquery.lightajax.js')
        .pipe(uglify())
        .pipe(rename('jquery.lightajax.min.js'))
        .pipe(gulp.dest('dist'));
});