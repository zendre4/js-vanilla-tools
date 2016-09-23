
var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc3');

gulp.task('generateApi', function () {
    gulp.src([
            './src/VanillaTools.js'
        ],{read: false})
        .pipe(jsdoc(
            {
                "opts": {
                    destination:"./docs/api/",
                    'private':true
                },
                templates : {
                    theme: "lumen",
                    includeDate:false
                }
            }
        ));

});