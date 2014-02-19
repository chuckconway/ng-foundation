/**
 * Created by chuckconway on 2/19/14.
 */

module.exports = {
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  This is the jsmin task secion. It includes uglifying local and dependencies and wrapping local javascript in a self executing method.
//  compiled js is saved to bin/assets/
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Minify the sources!
 */
        uglify: {
        local_javascript: {
            files: {
                '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js': [
                    '<%= build_directory %>/src/**/*.js',
                    '<%= html2js.app.dest %>',
                    '<%= html2js.common.dest %>'
                ]
            }
        },
        compile_all_files: {
            options: {
                banner: '<%= meta.banner %>'
            },
            files: {
                '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js': [
                    '<%= dependencies.js %>',
                    '<%= build_directory %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
                ]
            }
        }
    },

    wrap:{
        wrap_local_javascript:{
            src:['<%= build_directory %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'],
                dest:'<%= build_directory %>/assets/<%= pkg.name %>-<%= pkg.version %>.js',
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
                base: 'src/app',
                    htmlmin: {
                    collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: false,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                }
            },
            src: [ '<%= app.app_templates %>' ],
                dest: '<%= build_directory %>/assets/templates-app-<%= pkg.version %>.js'
        },

        /**
         * These are the templates from `src/common`.
         */
        common: {
            options: {
                base: 'src/common',
                    htmlmin: {
                    collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: false,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                }
            },
            src: [ '<%= app.common_templates %>' ],
                dest: '<%= build_directory %>/assets/templates-common-<%= pkg.version %>.js'
        }
    }
};