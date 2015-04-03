/* jshint node:true */

'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-menu');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({

    jasmine: {
      options: {
        specs: ['test/test.js']
      },
      dev: {
        src: 'src/dom-i18n.js',
      },
      minified: {
        src: 'dist/dom-i18n.min.js',
      },
      coverage: {
        src: ['src/dom-i18n.js'],
        options: {
          specs: ['test/test.js'],
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'test/coverage/coverage.json',
            report: 'test/coverage',
            thresholds: {
              lines: 75,
              statements: 75,
              branches: 75,
              functions: 90
            }
          }
        }
      }
    },

    uglify: {
      options: {
        compress: {
          warnings: true
        }
      },
      dist: {
        src: 'src/dom-i18n.js',
        dest: 'dist/dom-i18n.min.js'
      }
    }

  });

  grunt.registerTask('release', [
    'jasmine:dev',
    'uglify:dist',
    'jasmine:minified'
  ]);

  grunt.registerTask('default', ['menu']);

};

