module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        autoprefixer: {
            options: {
                // Task-specific options go here.
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
            dist: {
                options: {
                    style: 'expanded',    // nested, compact, compressed, expanded
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
    grunt.registerTask('default', ['sass', 'autoprefixer:single_file']);
}