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

    grunt.registerTask('dev', [
        'less:dev',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:build',
        'less:build',
        'useminPrepare',
        'concat',
        'uglify',
        'copy',
        'filerev',
        'usemin',
        'clean:tmp'
    ]);

    grunt.initConfig({
        clean: {
            build: ['build'],
            generated: ['src/css'],
            tmp: ['.tmp']
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {}
        },

        copy: {
            build: {
                files: {'build/index.html': 'src/index.html'}
            }
        },

        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
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
            dev: {
                src: [
                    'src/less/bootstrap.less',
                    'src/less/application.less'
                ],
                dest: 'src/css/application.css'
            },
            build: {
                options: {
                    cleancss: true
                },
                src: [
                    'src/less/bootstrap.less',
                    'src/less/application.less'
                ],
                dest: 'build/css/application.css'
            }
        },

        uglify: {
            dist: {}
        },

        usemin: {
            html: ['build/*.html'],
            css: ['build/css/*.css']
            /*options: {
                assetsDirs: ['build', 'build/css']
            }*/
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
                tasks: ['less:dev']
            }
        }
    });
};
