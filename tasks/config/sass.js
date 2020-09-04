module.exports = function(grunt) {                  // Create new Grunt task

    grunt.config.set('sass', {                        // Task sass
      dev: {
        files: [{
          expand: true,                               // 'expand directory'
          cwd: 'assets/styles/',                      // 'source folder'
          src: ['style.scss'],    // 'source files'
          dest: '.tmp/public/styles/',                // 'destination folder'
          ext: '.css'                                 // 'extension of compiled file'
        }]
      }
    });
  
    grunt.loadNpmTasks('grunt-contrib-sass');                 // Load task Grunt-sass  
  };

  