//This is the Gruntjs build file for ng-node-foundation.
//The intent of this Gruntjs build file is to put into place all the
//build plumbing for a new project using nodejs and angularjs.

module.exports = function(grunt){

    //tasked used in this grunt build script
    grunt.loadNpmTasks('grunt-conventional-changelog');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-wrap');

    //Load the build.config.js file. This file contains build specific information that will replace
    //tokens in the taskConfig object.
    var buildConfig = require('./build.config.js');

    //Including lodash.
    var _ = require('lodash');

    //This defines the tasks and the sub-tasks.
    var taskConfig = {

        //This reads the existing package.json so we can use the version and other metadata
        //as we build the application.
        pkg: grunt.file.readJSON("package.json"),

        //Inserts the copyright header into the compiled(uglified) js files.
        meta: {
            banner:
                '/**\n' +
                    ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    ' * <%= pkg.homepage %>\n' +
                    ' *\n' +
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                    ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
                    ' */\n'
        },

        //Creates the change log using the changelog.
        changelog: {
            options: {
                dest: 'CHANGELOG.md',
                template: 'changelog.tpl'
            }
        },

        //Removes all the files in the build and the compile directories
        clean: [ '<%= build_dir %>', '<%= compile_dir %>'],

        //copy all the files from the various locations (src, dependencies) into the build folder
        copy: {
            // Copy the local files found in the assets folder to the assets folder in the build directory.
            //The build directory is a staging area where we can freely manuliplate the files without changing the source
            copy_local_assets_from_src_to_build_directory:{
                files:[
                    {
                        cwd:'src/client/assets',
                        src:['**'],
                        dest:'<%= build_dir %>/assets/',
                        expand:true
                    }
                ]
            },
            //copy all the dependencies defined in the build.config.js into the build assets directory
            copy_dependencies_assets_to_build_assets_directory: {
                files: [
                    {
                        src: [ '<%= vendor_files.assets %>' ],
                        dest: '<%= build_dir %>/assets/',
                        cwd: '.',
                        expand: true,
                        flatten: true
                    }
                ]
            },
            //copy all the app javascript files into the build directory. Keeping the folder structure in place.
            copy_app_javascript_files_to_build_javascript_directory: {
                files: [
                    {
                        src: [ '<%= app_files.js %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            //copy the declared dependencies in the build.config.js to the build directory
            copy_dependencies_javascript_files_to_build_javascript_directory: {
                files: [
                    {
                        src: [ '<%= vendor_files.js %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            //We are not doing anything (compiling) with the assets, copy them into the bin/assets directory.
            copy_assets_from_build_to_bin: {
                files: [
                    {
                        src: [ '**' ],
                        dest: '<%= compile_dir %>/assets',
                        cwd: '<%= build_dir %>/assets',
                        expand: true
                    }
                ]
            }
        },
        //concatenate the less files and copy them into the build/assets folder.
        less: {
            lint_compile_concat: {
                options:{
                    compress:true,
                    sourceMap:false
                    //sourceMapFilename: '<%= build_dir %>/assets/compiled.css.map',
                    //sourceMapRootpath: 'source/less/'
                },
                files: { '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css' : ['<%= app_files.less %>']}
            }
        },
        /**
         * Minify the sources!
         */
        uglify: {
            local_javascript: {
                files: {
                    '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js': [
                        '<%= build_dir %>/src/**/*.js',
                        '<%= html2js.app.dest %>',
                        '<%= html2js.common.dest %>',
                    ]
                }
            },
            compile_all_files: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: {
                    '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js': [
                        '<%= vendor_files.js %>',
                        '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
                    ]
                }
            }
        },

        wrap:{
            wrap_local_javascript:{
                src:['<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'],
                dest:'<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js',
                options:{
                    wrapper:['(function ( window, angular) {','})( window, window.angular );']
                }
            }
        },


        /**
         * HTML2JS is a Grunt plugin that takes all of your template files and
         * places them into JavaScript files as strings that are added to
         * AngularJS's template cache. This means that the templates too become
         * part of the initial payload as one JavaScript file. Neat!
         */
        html2js: {
            /**
             * These are the templates from `src/app`.
             */
            app: {
                options: {
                    base: 'src/client/app',
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                },
                src: [ '<%= app_files.atpl %>' ],
                dest: '<%= build_dir %>/assets/templates-app-<%= pkg.version %>.js'
            },

            /**
             * These are the templates from `src/common`.
             */
            common: {
                options: {
                    base: 'src/client/common',
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                },
                src: [ '<%= app_files.ctpl %>' ],
                dest: '<%= build_dir %>/assets/templates-common-<%= pkg.version %>.js'
            }
        }
    };

    grunt.registerTask( 'jsmin', [ 'uglify:local_javascript', 'wrap:wrap_local_javascript', 'uglify:compile_all_files' ] );

    var renderedConfig = _.extend(taskConfig, buildConfig);
    grunt.initConfig(renderedConfig);
};
