'use strict';

var controllers = angular.module('redCrossApp.controllers', [ 'redCrossApp.services' ]);


// controllers.controller('navCtrl', [
// 	'$scope', '$rootScope',
// function(
// 	$scope, $rootScope
// ){

	

// }])


controllers.controller('day', ['$scope', '$rootScope', '$location', 'wirExists', function( $scope, $rootScope, $location, wir ){

	console.log( 'Hello this the day controller' );
    $scope.loc = $location;
    $scope.$watch('(loc.search()).wir', function(newVal, oldVal) {
        if (newVal === oldVal) { return; }
        $rootScope.wir = newVal;
    });
    /**
     * Tell the app whether it show be showing a section
     * from What is Resilience.
     */
    $rootScope.wir = wir || false;

}]);


// controllers.controller('day1', [
// 	'$scope', '$rootScope', '$routeParams', 
// function(
// 	$scope, $rootScope, $routeParams
// ){
// 	console.log( 'Hello this is day one controller' )
// }])


// controllers.controller('day2', [
// 	'$scope', '$rootScope', '$routeParams', 
// function(
// 	$scope, $rootScope, $routeParams
// ){
// 	console.log( 'Hello this is day two controller' )
// }])


// controllers.controller('day3', [
// 	'$scope', '$rootScope', '$routeParams', 
// function(
// 	$scope, $rootScope, $routeParams
// ){
// 	console.log( 'Hello this is day three controller' )
// }])

// controllers.controller('day4', [
// 	'$scope', '$rootScope', '$routeParams', 
// function(
// 	$scope, $rootScope, $routeParams
// ){
// 	console.log( 'Hello this is day three controller' )
// }])

