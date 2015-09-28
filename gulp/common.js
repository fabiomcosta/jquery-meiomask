'use strict';

// export common require
exports.gulp        = require('gulp');
exports.gulp_util   = require('gulp-util');
exports.gulp_concat = require('gulp-concat');
exports.gulp_uglify = require('gulp-uglify');
exports.gulp_rename = require('gulp-rename');
exports.gulp_jshint = require('gulp-jshint');
exports.gulp_clean  = require('gulp-clean');
exports.gulp_bower  = require('gulp-bower');
exports.gulp_watch  = require('gulp-watch');
exports.gulp_wrench = require('wrench');

// export common dirs
exports.dirs = {
  src: [
    './src/'
  ],
  dist: [
    './dist/'
  ],
  bower: [
    './bower_components/'
  ]
};

// export common logger
exports.log = function(log) {
  this.gulp_util.log(log);
};
