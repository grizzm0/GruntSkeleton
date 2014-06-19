"use strict";

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-usemin');

    grunt.registerTask('development', [
        'less',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:build',
        'less',
        'useminPrepare',
        'concat:generated',
        'uglify:generated',
        'cssmin:generated',
        'copy:build',
        'filerev:build',
        'usemin',
        'clean:tmp'
    ]);

    /*grunt.registerTask('deploy', [
     'build',
     ]);*/

    grunt.initConfig({
        clean: {
            build: ['build'],
            css: ['src/css'],
            tmp: ['.tmp']
        },

        copy: {
            build: {
                expand: true,
                cwd: 'src/',
                src: '**/*.html',
                dest: 'build/'
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: 0
            }
        },

        filerev: {
            options: {
                algorithm: 'sha1',
                length: 10
            },
            build: {
                src: [
                    'build/js/*.js',
                    'build/css/*.css'
                ]
            }
        },

        less: {
            compile: {
                expand: true,
                cwd: 'src/less',
                src: [
                    '**/*.less',
                    '!config/*.less'
                ],
                ext: '.css',
                dest: 'src/css'
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
                    'less'
                ]
            }
        }
    });
};
