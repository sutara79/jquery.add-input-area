"use strict";

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON("package.json"),
    banner: "/**\n" +
      " * @file <%= pkg.name %>\n" +
      " * @version <%= pkg.version %>\n" +
      " * @author <%= pkg.author %>\n" +
      " * @license <%= pkg.license %>\n" +
      " */",

    // Task configuration.
    uglify: {
      options: {
        banner: "<%= banner %>"
      },
      dist: {
        files: [
          {
            src: "dist/<%= pkg.name %>.js",
            dest: "dist/<%= pkg.name %>.min.js"
          }
        ]
      }
    },
    qunit: {
      options: {
        timeout: 30000,
        "--web-security": "no",
        coverage: {
          src: ["dist/<%= pkg.name %>.js"],
          instrumentedFiles: "temp/",
          lcovReport: "coverage/",
          linesThresholdPct: 0
        }
      },
      files: ["test/index.html"]
    },
    coveralls: {
      options: {
        // dont fail if coveralls fails
        force: true
      },
      main_target: {
        src: "coverage/lcov.info"
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-coveralls");
  grunt.loadNpmTasks("grunt-qunit-istanbul");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // Default task.
  grunt.registerTask("default", ["qunit", "uglify"]);

};
