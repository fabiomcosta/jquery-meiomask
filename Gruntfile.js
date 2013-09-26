'use strict';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('meiomask.jquery.json'),
    concat: {
      build: {
        src:  ['src/<%= pkg.name %>.js'],
        dest: '<%= pkg.name %>.js'
      }
    },
    uglify: {
      build: {
        src:  '<%= pkg.name %>.js',
        dest: '<%= pkg.name %>.min.js'
      }
    }
  });

  // Loaded Plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default Task(s)
  grunt.registerTask('default', ['concat', 'uglify'])
};
