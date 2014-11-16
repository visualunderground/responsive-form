module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        autoprefixer: {
            options: {
                // Task-specific options go here.
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 8', 'ie 9']
            },
            single_file: {
                src: 'assets/css/app.css',
                dest: 'assets/css/app.css'
            },
            diff: {
                options: {
                    diff: true
                },
                src: 'assets/css/app.css',
                dest: 'assets/css/file.css'
            },
        },

        sass: {
            dev: {
                options: {
                    style: 'expanded',    // nested, compact, compressed, expanded
                    sourcemap: 'none'
                },
                files: {
                    'assets/css/app.css': 'assets/css/src/app.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed',    // nested, compact, compressed, expanded
                    sourcemap: 'none'
                },
                files: {
                    'assets/css/app.css': 'assets/css/src/app.scss'
                }
            }
        },

        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('prefix', ['autoprefixer']);
    grunt.registerTask('default', ['sass:dist', 'autoprefixer:single_file']);
}
