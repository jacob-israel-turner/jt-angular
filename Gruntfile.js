module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: ['src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
            _: false,
            $: false,
            jasmine: false,
            describe: false,
            it: false,
            expect: false,
            beforeEach: false
          },
          browser: true,
          devel: true,
          jshintrc: true
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
          transform: [['babelify', {presets: ['es2015', 'stage-1']}]],
          watch: true
        }
      }
    },
    concat: {
      'dist/jt-angular.js': ['dist/library.js', 'dist/vendor.js']
    },
    watch: {
      concat: {
        files: ['dist/library.js', 'dist/vendor.js'],
        tasks: ['concat']
      }
    },
    testem: {
      unit: {
        options: {
          framework: 'jasmine2',
          launch_in_dev: ['PhantomJS'],
          before_tests: 'grunt jshint',
          on_exit: 'rm -r test-dist',
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
  grunt.registerTask('default', ['browserify:vendor', 'browserify:client', 'concat', 'watch:concat']);
};
