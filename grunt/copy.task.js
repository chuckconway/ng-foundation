/**
 * Created by chuckconway on 2/19/14.
 */

module.exports = {

    //copy all the files from the various locations (src, dependencies) into the build folder
    copy: {
        // Copy the local files found in the assets folder to the assets folder in the build directory.
        //The build directory is a staging area where we can freely manuliplate the files without changing the source
        copy_local_assets_from_src_to_build_directory:{
            files:[
                {
                    cwd:'src/assets',
                    src:['**'],
                    dest:'<%= build_directory %>/assets/',
                    expand:true
                }
            ]
        },
        //copy all the dependencies defined in the build.config.js into the build assets directory
        copy_dependencies_assets_to_build_assets_directory: {
            files: [
                {
                    src: [ '<%= dependencies.assets %>' ],
                    dest: '<%= build_directory %>/assets/',
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
                    src: [ '<%= app.js %>' ],
                    dest: '<%= build_directory %>/',
                    cwd: '.',
                    expand: true
                }
            ]
        },
        //copy the declared dependencies in the build.config.js to the build directory
        copy_dependencies_javascript_files_to_build_javascript_directory: {
            files: [
                {
                    src: [ '<%= dependencies.js %>' ],
                    dest: '<%= build_directory %>/',
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
                    dest: '<%= bin_directory %>/assets',
                    cwd: '<%= build_directory %>/assets',
                    expand: true
                }
            ]
        }
    }

};