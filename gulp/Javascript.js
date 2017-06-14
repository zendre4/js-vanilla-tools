var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename=require('gulp-rename');

gulp.task('generateDist', function() {

    return gulp.src(
        "./src/js-vanilla-tools.js"
    ).pipe(uglify({preserveComments:"license"}))
        .pipe(rename({suffix: ".min"}))
     .pipe(gulp.dest("./dist"));
});
