/* jshint node:true */

'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-menu');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-coveralls');

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
            report: {
                type: 'lcov',
                options: {
                    dir: 'test/coverage/lcov'
                }
            }
          }
        }
      }
    },

    coveralls: {
      push: {
        src: 'test/coverage/lcov/lcov.info'
      },
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

  grunt.registerTask('test', ['jasmine:dev', 'jasmine:minified']);

  grunt.registerTask('coverage', ['jasmine:coverage', 'coveralls:push']);

  grunt.registerTask('default', ['menu']);

};

