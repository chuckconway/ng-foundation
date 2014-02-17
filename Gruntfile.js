//This is the Gruntjs build file for ng-node-foundation.
//The intent of this Gruntjs build file is to put into place all the
//build plumbing for a new project using nodejs and angularjs.

module.exports = function(grunt){

    grunt.loadNpmTasks('grunt-conventional-changelog');

    //This reads the existing package.json so we can use the version and other metadata
    //as we build the application.
    pkg: grunt.file.readJSON("package.json")

    //Load the build.config.js file. This file contains build specific information that will replace
    //tokens in the taskConfig object.
    var buildConfig = require('./build.config.js');

    //This defines the tasks and the sub-tasks.
    var taskConfig = {

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
        }

    };

    var template = grunt.template.process( taskConfig, buildConfig)

    grunt.initConfig(template);

};
