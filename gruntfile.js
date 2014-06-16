"use strict";

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-usemin');

    grunt.registerTask('development', [
        'less:development',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:build',
        'less:build',
        'useminPrepare',
        'concat:generated',
        'uglify:generated',
        'copy:build',
        'filerev:build',
        'usemin',
        'clean:tmp'
    ]);

    grunt.registerTask('deploy', [
        'build',
    ]);

    grunt.initConfig({
        clean: {
            build: [
                'build',
                'build.tgz'
            ],
            css: ['src/css'],
            tmp: ['.tmp']
        },

        copy: {
            build: {
                files: {'build/index.html': 'src/index.html'}
            }
        },

        filerev: {
            options: {
                algorithm: 'sha1',
                length: 10
            },
            build: {
                files: [{
                    src: [
                        'build/js/*.js',
                        'build/css/*.css'
                    ]
                }]
            }
        },

        less: {
            development: {
                src: 'src/less/application.less',
                dest: 'src/css/application.css'
            },
            build: {
                src: 'src/less/application.less',
                dest: 'build/css/application.css'
            }
        },

        usemin: {
            html: ['build/*.html']
        },

        useminPrepare: {
            html: 'src/index.html',
            options: {
                dest: 'build'
            }
        },

        watch: {
            less: {
                files: ['src/less/**/*.less'],
                tasks: [
                    'clean:css',
                    'less:development'
                ]
            }
        }
    });
};
