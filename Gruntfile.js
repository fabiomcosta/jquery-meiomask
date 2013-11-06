'use strict';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('meiomask.json'),
    concat: {
      build: {
        src:  ['src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      build: {
        src:  'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jasmine: {
      pivotal: {
        src: ['src/<%= pkg.name %>.js', 'spec/javascripts/helpers', 'spec/javascripts/fixtures'],
        options: {
          specs: 'spec/javascripts/*_spec.js',
          helpers: 'spec/javascripts/helpers/*.js'
        }
      }
    }
  });

  // Loaded Plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Build Task(s)
  grunt.registerTask('build', ['concat', 'uglify']);

  // Test Task(s)
  grunt.registerTask('test', ['jasmine']);

  // Travis CI
  grunt.registerTask('travis', ['jasmine']);
};
