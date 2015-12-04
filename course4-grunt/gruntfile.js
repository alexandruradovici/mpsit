
"use strict";

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        jshint:
        {
            options:
            {
                node:true,
                mocha: true
            },
            
            all: ['source/**/*.js']
        },
        
        apidoc:
        {
            all: 
            {
                src: 'source/',
                dest: 'docs/'
            }
        },
        
        mochaTest: {
            all: {
                options: {
                    reporter: 'spec',
                    //captureFile: 'results.txt', // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: true, // Optionally clear the require cache before running tests (defaults to false)
                    ignoreLeaks: false
                },
                src: ['source/tests/*.js']
            }
        },
        
        clean:
        {
            all: ['build/']
        },
        
        // copy:
        // {
        //     all:
        //     {
        //         files: [
        //             {
        //                 expand: true,
        //                 cwd: 'source/',
        //                 src: '*.js',
        //                 dest: 'build'
        //             }
        //         ]
        //     }
        // },
        
        uglify:
        {
            all:
            {
                files: [{
                        expand: true,
                        cwd: 'source/',
                        src: ['*.js'],
                        dest: 'build',
                    }]
            }
        },
        
    });
    
    grunt.loadNpmTasks ('grunt-contrib-jshint');
    // grunt.loadNpmTasks ('grunt-contrib-copy');
    grunt.loadNpmTasks ('grunt-contrib-clean');
    grunt.loadNpmTasks ('grunt-mocha-test');
    grunt.loadNpmTasks ('grunt-apidoc');
    grunt.loadNpmTasks ('grunt-contrib-uglify');
    
    
    grunt.registerTask ('default', [
            'jshint', 
            'mochaTest',
            'clean',
            // 'copy', 
            'uglify']);

};