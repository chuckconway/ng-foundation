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
    //tokens in the taskConfig object. Also load other grunt tasks.
    var config = extend(['./grunt/build.config.js',
                         './grunt/jsmin.task.js',
                         './grunt/copy.task.js',
                         './grunt/less.task.js',
                         './grunt/index.task.js',
                         './grunt/misc.task.js']);

    grunt.initConfig(config);

    //Define Grunt tasks.

    //Copies the files javascript files from the src folder into the build directory and then combines, minifies and
    //copies them into the bin/assets folder.
    grunt.registerTask( 'jsmin', ['copy:copy_app_javascript_files_to_build_javascript_directory',
                                  'copy:copy_dependencies_javascript_files_to_build_javascript_directory',
                                  'html2js',
                                  'uglify:local_javascript',
                                  'wrap:wrap_local_javascript',
                                  'uglify:compile_all_files' ]);


    grunt.registerTask('local',[]);
    grunt.registerTask('qa',[]);
    grunt.registerTask('production',[]);

    /**
     * The index.html template includes the stylesheet and javascript sources
     * based on dynamic names calculated in this Gruntfile. This task assembles
     * the list into variables for the template to use and then runs the
     * compilation.
     */
    grunt.registerMultiTask( 'index', 'Process index.html template', function () {
        var dirRE = new RegExp( '^('+grunt.config('build_directory')+'|'+grunt.config('bin_directory')+')\/', 'g' );
        var jsFiles = filterForJS( this.filesSrc ).map( function ( file ) {
            return file.replace( dirRE, '' );
        });
        var cssFiles = filterForCSS( this.filesSrc ).map( function ( file ) {
            return file.replace( dirRE, '' );
        });

        grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
            process: function ( contents, path ) {
                return grunt.template.process( contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config( 'pkg.version' )
                    }
                });
            }
        });
    });

    function extend(tasks) {
        var _ = require('lodash');
        var config = {pkg: grunt.file.readJSON("package.json")};

        for(var i=0; i< tasks.length; i++) {
            config = _.extend(config, require(tasks[i]));
        }
        return config;
    };

    /**
     * A utility function to get all app JavaScript sources.
     */
    function filterForJS ( files ) {
        return files.filter( function ( file ) {
            return file.match( /\.js$/ );
        });
    }

    /**
     * A utility function to get all app CSS sources.
     */
    function filterForCSS ( files ) {
        return files.filter( function ( file ) {
            return file.match( /\.css$/ );
        });
    }
};
