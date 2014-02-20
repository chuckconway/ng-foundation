/**
 * Created by chuckconway on 2/20/14.
 */
module.exports = {

    karma: {
        options: {
            configFile: '<%= build_directory %>/karma-unit.js'
        },
        unit: {
            runnerPort: 9101,
            background: true
        },
        continuous: {
            singleRun: true
        }
    },

    /**
     * This task compiles the karma template so that changes to its file array
     * don't have to be managed manually.
     */
    karmaconfig: {
        unit: {
            dir: '<%= build_directory %>',
            src: [
                '<%= dependencies.js %>',
                '<%= html2js.app.dest %>',
                '<%= html2js.common.dest %>',
                '<%= tests.js %>'
            ]
        }
    }
};