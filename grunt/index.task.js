/**
 * Created by chuckconway on 2/19/14.
 */
module.exports = {

    /**
     * The `index` task compiles the `index.html` file as a Grunt template. CSS
     * and JS files co-exist here but they get split apart later.
     */
    index: {

        /**
         * During development, we don't want to have wait for compilation,
         * concatenation, minification, etc. So to avoid these steps, we simply
         * add all script files directly to the `<head>` of `index.html`. The
         * `src` property contains the list of included files.
         */
        build: {
            dir: '<%= bin_directory %>',
            src: [
                '<%= dependencies.js %>',
                '<%= build_directory %>/src/**/*.js'
                //'<%= html2js.common.dest %>',
                //'<%= html2js.app.dest %>',
                //'<%= vendor_files.css %>',
                //'<%= recess.build.dest %>'
            ]
        },

        /**
         * When it is time to have a completely compiled application, we can
         * alter the above to include only a single JavaScript and a single CSS
         * file. Now we're back!
         */
        compile: {
            dir: '<%= bin_directory %>',
            src: [
                //'<%= concat.compile_js.dest %>',
                '<%= dependencies.css %>'
                //'//<%= recess.compile.dest %>'
            ]
        }
    }

};