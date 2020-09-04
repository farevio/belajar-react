const livereload = require("connect-livereload");

module.exports = function(grunt) {
    grunt.config.set("browserify", {
      buildReact: {
        files: [
          {
            expand: true,
            cwd: "assets/src",
            src: ["**/*.js*"],
            dest: ".tmp/public/dist",
            ext: '.js'
          }
        ],
        options: {
          transform: [
            ["babelify", { presets: ["@babel/react", "@babel/preset-env"] }],
          ],
          browserifyOptions: {
            debug: process.env.NODE_ENV != 'production'
          },
          watch: true,
          //keepAlive:true

        }
      },
      
      buildReactProd: {
        files: [
          {
            expand: true,
            cwd: "assets/src",
            src: ["**/*.js*"],
            dest: ".tmp/public/dist",
            ext: '.js'
          }
        ],
        options: {
          transform: [
            ["babelify", { presets: ["@babel/react", "@babel/preset-env"] }],
            ['envify', {NODE_ENV: 'production', global: true}],
            ['uglifyify', {global: true}],
          ],
        }
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: ".tmp/public",
            src: ['js/**/*.js'],
            dest: '.tmp/public',
            ext: '.js'
          }
        ],
        options: {
          transform: [['babelify', { presets: ['@babel/preset-env'] }]]
        }
      }
    });
  
    grunt.loadNpmTasks("grunt-browserify");
  
  };
  