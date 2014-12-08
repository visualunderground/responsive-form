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
                    'app/js/application/*'
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
        },

        
        imagemin: {
            options: {
                optimizationLevel: 3
            },
            build: {
                files: [{
                    expand: true,                       // Enable dynamic expansion
                    cwd: 'app/',                        // Src matches are relative to this path
                    src: ['**/*.{png,jpg,jpeg,gif}'],   // Actual patterns to match
                    dest: 'dist/'                       // Destination path prefix
                }]
            }
        },


        modernizr: {

            dist: {
                // [REQUIRED] Path to the build you're using for development.
                "devFile" : "remote",

                // Path to save out the built file.
                "outputFile" : "app/js/application/modernizr-custom.js",

                // Based on default settings on http://modernizr.com/download/
                "extra" : {
                    "shiv" : true,
                    "printshiv" : false,
                    "load" : false,
                    "mq" : true,
                    "cssclasses" : true
                },

                // Based on default settings on http://modernizr.com/download/
                // "extensibility" : {
                //     "addtest" : false,
                //     "prefixed" : false,
                //     "teststyles" : false,
                //     "testprops" : false,
                //     "testallprops" : false,
                //     "hasevents" : false,
                //     "prefixes" : false,
                //     "domprefixes" : false,
                //     "cssclassprefix": ""
                // },

                // By default, source is uglified before saving
                // "uglify" : false,

                // Define any tests you want to implicitly include.
                //"tests" : [],

                // By default, this task will crawl your project for references to Modernizr tests.
                // Set to false to disable.
                // "parseFiles" : true,

                // When parseFiles = true, this task will crawl all *.js, *.css, *.scss and *.sass files,
                // except files that are in node_modules/.
                // You can override this by defining a "files" array below.
                "files" : {
                    "src": ['app/**/*.scss', 'app/**/*.js', '!**/modernizr-custom.js']
                },

                // This handler will be passed an array of all the test names passed to the Modernizr API, and will run after the API call has returned
                // "handler": function (tests) {},

                // When parseFiles = true, matchCommunityTests = true will attempt to
                // match user-contributed tests.
                // "matchCommunityTests" : false,

                // Have custom Modernizr tests? Add paths to their location here.
                // "customTests" : []
            }

        }

    });

    grunt.loadNpmTasks("grunt-modernizr");
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
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
