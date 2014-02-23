
angular.module( 'ngBoilerplate', [
        'templates-app',
        'templates-common',
        'ngBoilerplate.home',
        'ngBoilerplate.about',
        'ui.state',
        'ui.route'
    ])

    .config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
        "use strict";
        $urlRouterProvider.otherwise( '/home' );
    })

    .run( function run () {
    })

    .controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
        "use strict";
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            if ( angular.isDefined( toState.data.pageTitle ) ) {
                $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
            }
        });
    })

;