'use strict';

var filters = angular.module('redCrossApp.filters', [ 'redCrossApp.services' ]);

filters.filter('zeroPad', function(){
	return function(input){
		if( parseInt(input) < 10 )
			return '0' + input;
		else
			return input;
	}
});