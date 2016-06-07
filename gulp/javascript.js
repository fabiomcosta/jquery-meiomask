'use strict';

// Import common
var common = require('./gulp/common.js');

/**
 * Implements javascript task
 */
common.gulp.task('javascript', function() {
  common.gulp.src(common.dirs.src)
    .pipe(common.gulp.gulp_concat())
    .pipe(common.gulp.gulp_uglify())
    .pipe(common.gulp.dest(common.dirs.dist);
});

/**
 * Implements javascript:hint task
 */
common.gulp.task('javascript:hint', function() {
  common.gulp.src(common.dirs.src)
    .pipe(common.gulp_jshint())
    .pipe(common.gulp_jshint.reporter('default'));
});
