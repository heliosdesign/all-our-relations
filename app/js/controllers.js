'use strict';

var controllers = angular.module('allOurRelApp.controllers', [ 'allOurRelApp.services' ]);


controllers.controller('day', ['$scope', '$rootScope', '$location', 'wirExists', function( $scope, $rootScope, $location, wir ){

    $scope.loc = $location;

}]);

