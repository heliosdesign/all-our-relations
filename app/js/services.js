'use strict';

var services = angular.module('allOurRelApp.services', [ 'allOurRelApp.services' ]);

services.factory('jumpTo', function() {
    return function(t, wrapper) {
        /**
         * T stands for top.
         * This parameter can be a pixel value or an element.
         * If it is an element we will find out how far from the top it is.
         *
         * Pass in the scrolling wrapper if you would like that to scroll
         * instead of the body.
         */

        var scrollTarget = document.getElementById(wrapper) || window;
        var top = typeof t == 'number' ? t : t.offset().top + scrollTarget.scrollTop;        
        
        scrollTarget.scrollTop = top;

    }
});

// services.factory('loadPromises', [
// 	'$rootScope', '$timeout', '$http', 
// function(
// 	$rootScope, $timeout, $http
// ){
// 	return {
		
// 	}
// }])


