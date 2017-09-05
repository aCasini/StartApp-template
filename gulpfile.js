var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var rimraf   = require('rimraf');

var paths = {
  sass: ['./scss/**/*.scss'],
  lib: ['./www/lib', './www/**']
};

gulp.task('clean', function(cb) {
  rimraf('./build', cb);
});

// Copies everything in the client folder except templates, Sass, and JS
gulp.task('copy', function() {
  return gulp.src(paths.lib)
    .pipe(gulp.dest('./build'))
  ;
})

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
});
