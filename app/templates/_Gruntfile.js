module.exports = function(grunt) {
  // Load all tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        // Import Sass depedencies
        // includePaths: ['']
      },
      dev: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          'assets/admin.css': 'assets/sass/mcm-admin.scss',
          'assets/datepicker.css': 'assets/sass/datepicker.scss',
          'assets/uploader.css': 'assets/sass/uploader.scss',
          'assets/wordpress/main.css': 'assets/sass/wordpress/main.scss'
        }
      },
      build: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'assets/admin.min.css': 'assets/sass/admin.scss',
          'assets/datepicker.min.css': 'assets/sass/datepicker.scss',
          'assets/uploader.min.css': 'assets/sass/uploader.scss',
          'assets/wordpress/main.min.css': 'assets/sass/wordpress/main.scss'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      dev: {
        options: {
          map: {
            prev: 'assets/'
          }
        },
        src: 'assets/*.css'
      },
      build: {
        src: 'assets/*.css'
      }
    },
    notify: {
      sass: {
        options: {
          title: 'Grunt, grunt!',
          message: 'Sass is Sassy'
        }
      },
      dev: {
        options: {
          title: 'Grunt, grunt!',
          message: 'Development proccessed without errors.'
        }
      },
      build: {
        options: {
          title: 'Grunt, grunt!',
          message: 'We\'ll do it live!'
        }
      }
    },
    watch: {
      sass: {
        files: [
          'assets/sass/*.scss',
          'assets/sass/**/*.scss'
        ],
        tasks: [
          'sass:dev',
          'autoprefixer:dev',
          'notify:sass'
        ]
      }
    }
  });

  // Register tasks
  grunt.registerTask('default', [
    'dev'
  ]);
  grunt.registerTask('dev', [
    'sass:dev',
    'autoprefixer:dev',
    'notify:dev'
  ]);
  grunt.registerTask('build', [
    'sass:build',
    'autoprefixer:build',
    'notify:build'
  ]);
}