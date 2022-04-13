var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename=require('gulp-rename');

gulp.task('generateDist', function() {

    return gulp.src(
        "./src/js-vanilla-tools.js"
    ).pipe(uglify({
        output: {
            comments: 'some'
        }
    }))
        .pipe(rename({suffix: ".min"}))
     .pipe(gulp.dest("./dist"));
});
