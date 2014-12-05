module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        autoprefixer: {
            options: {
                // Task-specific options go here.
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 8', 'ie 9']
            },
            
            dist: {
                src: 'dist/assets/css/app.css',
                dest: 'dist/assets/css/app.css'
            },

            diff: {
                options: {
                    diff: true
                },
                src: 'dist/assets/css/app.css',
                dest: 'dist/assets/css/file.css'
            },
        },

        scsslint: {
            allFiles: [
                'app/scss/**/*.scss',
            ]
        },

        sass: {
            dev: {
                options: {
                    style: 'expanded',    // nested, compact, compressed, expanded
                    sourcemap: 'none'
                },
                files: {
                    'dist/assets/css/app.css': 'app/scss/app.scss'
                }
            },
            
            dist: {
                options: {
                    style: 'compressed',    // nested, compact, compressed, expanded
                    sourcemap: 'none'
                },
                files: {
                    'dist/assets/css/app.css': 'app/scss/app.scss'
                }
             }
        },

        watch: {
            css: {
                files: 'app/**/*.scss',
                tasks: ['build:css']
            },

            js: {
                files: 'app/**/*.js',
                tasks: ['build:js']
            }
        },

        concat: {
            dist: {
                src: [
                    'app/js/application.js',
                    'app/js/application/utils.js',
                    'app/js/application/*',
                    'app/js/vendor/*'
                ],
                dest: 'dist/assets/js/application.js',
            }
        },

        uglify: {
            build: {
                src: 'dist/assets/js/application.js',
                dest: 'dist/assets/js/application.min.js'
            }
        },

        'ftp-deploy': {
            build: {
                auth: {
                    host: 's2777.gridserver.com',
                    port: 21,
                    authKey: 'responsive-form.visualunderground.co.uk'
                },
                src: 'dist',
                dest: '/domains/responsive-form.visualunderground.co.uk/html',
                exclusions: ['dist/**/.DS_Store', 'dist/**/Thumbs.db']
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.min.html': 'dist/index.html',     // 'destination': 'source'
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify'); 
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-scss-lint');
    

    grunt.registerTask('build:css', ['scsslint', 'sass:dist', 'autoprefixer:dist']);
    grunt.registerTask('build:js', ['concat', 'uglify']);
    grunt.registerTask('build', ['build:css', 'build:js', 'htmlmin', 'ftp']);

    grunt.registerTask('default', ['sass:dist', 'autoprefixer:dist']);

    grunt.registerTask('ftp', ['ftp-deploy']);

    grunt
}
