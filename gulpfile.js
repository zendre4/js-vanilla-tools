const gulp = require('gulp');
const requireDir = require('require-dir');
requireDir('./gulp/', { recurse: true });

gulp.task('default',gulp.parallel('generateDist'));

