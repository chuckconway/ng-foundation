
angular.module( 'ngfoundation', [
        'templates-app',
        'templates-common',
        'ngfoundation.home',
        'ngfoundation.about',

        'ui.route'
    ])

    .config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
        "use strict";
        $urlRouterProvider.otherwise( '/home' );
    })

    .run( function run () {
    })

;