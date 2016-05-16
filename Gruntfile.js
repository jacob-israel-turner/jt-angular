module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: ['src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {},
          browser: true,
          devel: true,
          jshintrc: true,
      }
    },
    browserify: {
      vendor: {
        src: [],
        dest: 'dist/vendor.js',
        options: {
          require: [],
        }
      },
      client: {
        src: ['src/**/*.js'],
        dest: 'dist/library.js',
        options: {
          external: [],
          transform: [['babelify', {presets: ['es2015', 'stage-1']}]],
          watch: true
        }
      },
      test: {
        src: ['test/**/*.js'],
        dest: 'test-dist/test.js',
        options: {
          external: [],
          transform: [['babelify', {presets: ['es2015', 'stage-1']}]],
        }
      }
    },
    concat: {
      'dist/jt-angular.js': ['dist/vendor.js', 'dist/library.js']
    },
    watch: {
      concat: {
        files: ['dist/library.js'],
        tasks: ['concat']
      }
    },
    testem: {
      unit: {
        options: {
          framework: 'jasmine2',
          launch_in_dev: ['PhantomJS'],
          before_tests: 'grunt jshint',
          serve_files: ['test-dist/test.js'],
          watch_files: ['test-dist/test.js'],
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-testem');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.registerTask('test', ['browserify:test', 'testem:run:unit']);
  grunt.registerTask('default', ['browserify:vendor', 'browserify:client', 'watch:concat']);
};
