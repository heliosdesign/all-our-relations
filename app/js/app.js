'use strict';

var redCrossApp = angular.module('redCrossApp', [
	'ngRoute', 'ngAnimate', 'ngTouch',

	'redCrossApp.services',
	'redCrossApp.filters',
	'redCrossApp.controllers',
	'redCrossApp.directives',

	'duScroll' // https://github.com/durated/angular-scroll
]);


redCrossApp.constant('redCrossArticles', [
]);

redCrossApp.constant('redCrossDay', '10');

// app.module( function( $routeProvider, $depency2 ){

// })

// app.module([ '$routeProvider', function( $routeProvider ){

// }])


redCrossApp.config(['$routeProvider', 'redCrossArticles', 'redCrossDay', function( $routeProvider, articles, redCrossDay ){

	// $routeProvider.redCrossDay=redCrossDay;

	$routeProvider.when( '/:lang/day/:dayId', {

		controller: 'day',

		templateUrl: function( params ){
			return 'partials/day-' + articles[params.dayId-1] + '.html';
		},

		//before changes
		// templateUrl: function( params ){ 
		// 	return 'partials/day-' + params.dayId + '.html';
		// },

		reloadOnSearch: false,

		resolve: {

			// validate lang param
			langExists: function( $q, $route, $rootScope ){
				var deferred = $q.defer(),
					lang = $route.current.params.lang;

				if( $rootScope.languages.indexOf( lang ) != -1 )
					deferred.resolve();
				else
					deferred.reject('invalid route parameter');

				return deferred.promise;
			},

			// Validate dayID param
			dayExists: function( $q, $route, $rootScope ){
				var deferred = $q.defer(),
					dayId = $route.current.params.dayId;

				if( dayId > 0 && dayId <= $rootScope.numDays ){
					// $rootScope.currentarticle = $rootScope.articles[$rootScope.dayId];
					deferred.resolve(
						$rootScope.currentarticle = articles[dayId-1]
					);
				}
					
				else{
					deferred.reject('invalid route parameter');
				}
					

				return deferred.promise;
			},

			wirExists: function( $q, $route, $rootScope ) {
				var deferred = $q.defer(),
					wir = $route.current.params.wir;

				deferred.resolve( wir || false );

				return deferred.promise;
			},

			// Preloader
			preload: function( $q, $timeout ){
				var p = $q.defer();
				p.resolve();
				return p.promise;
			}
		}
	});
	//last day call to action
	$routeProvider.when( '/:lang/tomorrow/:dayId', {

		controller: 'day',

		// templateUrl: function( params ){
		// 	return 'partials/tomorrow_' + articles[params.dayId-1] + '.html';
		// },

		templateUrl: function( params ){
			return 'partials/tomorrow_tomorrow.html';
		},

		//before changes
		// templateUrl: function( params ){ 
		// 	return 'partials/day-' + params.dayId + '.html';
		// },

		reloadOnSearch: false,

		resolve: {

			// validate lang param
			langExists: function( $q, $route, $rootScope ){
				var deferred = $q.defer(),
					lang = $route.current.params.lang;

				if( $rootScope.languages.indexOf( lang ) != -1 )
					deferred.resolve();
				else
					deferred.reject('invalid route parameter');

				return deferred.promise;
			},

			// Validate dayID param
			dayExists: function( $q, $route, $rootScope ){
				var deferred = $q.defer(),
					dayId = $route.current.params.dayId;

				if( dayId > 0 && dayId <= $rootScope.numDays ){
					// $rootScope.currentarticle = $rootScope.articles[$rootScope.dayId];
					deferred.resolve(
						$rootScope.currentarticle = articles[dayId-1]
					);
				}
					
				else{
					deferred.reject('invalid route parameter');
				}
					

				return deferred.promise;
			},

			wirExists: function( $q, $route, $rootScope ) {
				var deferred = $q.defer(),
					wir = $route.current.params.wir;

				deferred.resolve( wir || false );

				return deferred.promise;
			},

			// Preloader
			preload: function( $q, $timeout ){
				var p = $q.defer();
				p.resolve();
				return p.promise;
			}
		}
	});

	// $routeProvider.when( '/:lang/day/1', {
	// 	templateUrl: 'partials/day-1.html',
	// 	controller:  'day1',
	// 	resolve: {
	// 		setVars : function( $rootScope ){
	// 			$rootScope.day = 1;
	// 		},
	// 		// dummy promise
	// 		preload: function( $q ){
	// 			var dummy = $q.defer();
	// 			dummy.resolve();
	// 			return dummy.promise;
	// 		}
	// 	},
	// 	reloadOnSearch: false
	// });

	// $routeProvider.when( '/:lang/day/2', {
	// 	templateUrl: 'partials/day-2.html',
	// 	controller:  'day2',
	// 	resolve: {
	// 		setVars : function( $rootScope ){
	// 			$rootScope.day = 2;
	// 		},
	// 		// // dummy promise
	// 		// preload: function( $q ){
	// 		// 	var dummy = $q.defer();
	// 		// 	dummy.resolve();
	// 		// 	return dummy.promise;
	// 		// }
	// 	},
	// 	reloadOnSearch: false
	// });

	// $routeProvider.when( '/:lang/day/3', {
	// 	templateUrl: 'partials/day-3.html',
	// 	controller:  'day3',
	// 	resolve: {
	// 		setVars : function( $rootScope ){
	// 			$rootScope.day = 3;
	// 		},
	// 		// // dummy promise
	// 		// preload: function( $q ){
	// 		// 	var dummy = $q.defer();
	// 		// 	dummy.resolve();
	// 		// 	return dummy.promise;
	// 		// }
	// 	},
	// 	reloadOnSearch: false
	// });

	// $routeProvider.when( '/:lang/day/4', {
	// 	templateUrl: 'partials/day-4.html',
	// 	controller:  'day4',
	// 	resolve: {
	// 		setVars : function( $rootScope ){
	// 			$rootScope.day = 4;
	// 		},
	// 		// // dummy promise
	// 		// preload: function( $q ){
	// 		// 	var dummy = $q.defer();
	// 		// 	dummy.resolve();
	// 		// 	return dummy.promise;
	// 		// }
	// 	},
	// 	reloadOnSearch: false
	// });

	$routeProvider.otherwise({ redirectTo: '/en/day/1' });
	// $rootScope.tomorrowCheck = false;
}])



// Cache Bust
redCrossApp.config(['$provide', function($provide) {
    return $provide.decorator('$http', ['$delegate', function($delegate) {
        var get = $delegate.get;
        $delegate.get = function(url, config) {

            // Check is to avoid breaking AngularUI ui-bootstrap-tpls.js: "template/accordion/accordion-group.html"
            // if (url.indexOf('partials/')) {
                // Append ?v=[cacheBustVersion] to url
                url += (url.indexOf('?') === -1 ? '?' : '&');
                url += 'v=' + Math.round( (new Date()).getTime() / 1000 );
            // }
            return get(url, config);
        };
        return $delegate;
    }]);
}])

// CORS
redCrossApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

redCrossApp.config(function($sceDelegateProvider, $sceProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from outer templates domain.
    'http://*.205.186.156.50/**'
  ]); 

  $sceProvider.enabled(false)
});

redCrossApp.run(['$rootScope', '$location', '$route', '$routeParams', 'redCrossArticles', 'redCrossDay',  function($rootScope, $location, $route, $routeParams, articles, redCrossDay){

	// Debug
	// ~~~~~

	if( window.location.host == 'localhost' || window.location.host == '205.186.156.50' || window.location.host == '192.168.1.50:8888' )
		$rootScope.debug = true;
	else
		$rootScope.debug = false;

	if ( $rootScope.debug ){

		console.log('/* DEBUG */')

		window.$rootScope = $rootScope;
		window.$location = $location;
	}
	
	// Global Variables
	// ~~~~~~~~~~~~~~~~

	$rootScope.currentarticle= 1;
	$rootScope.articles = articles;
	$rootScope.numDays = articles.length;
	$rootScope.languages = ['en', 'fr', 'de', 'es'];
	$rootScope.day = 0;
	$rootScope.baseTitle = ' - Resilience Journal';
	$rootScope.states = {};
	$rootScope.tomorrowCheck = false;
	$rootScope.redCrossDay = redCrossDay;



	// Resize Handler
	// ~~~~~~~~~~~~~~

	var windowResize = _.debounce(function(){
		$rootScope.$broadcast( 'resize', { data: false } )
		// $rootScope.$emit( 'resize', { data: false } )
	}, 50, true);

	window.addEventListener('resize', windowResize, false);


	// Base URL
	// ~~~~~~~~

	// for loading assets from CDN. include trailing slash!

	// $rootScope.baseURL = './assets/';
	$rootScope.baseURL = 'http://205.186.156.50/rceu/cdn/';



	// Next/Prev Day
	// ~~~~~~~~~~~~~

	$rootScope.nextDay = function(){
		// if( $rootScope.routeChangeInProgress ) return;
		if( $rootScope.day >= $rootScope.numDays ) return;
		$location.search( 'block', 0 );
		$location.search( 'wir', 0 );


		$location.path( $rootScope.nextDayUrl );
		if ($rootScope.tomorrowCheck) {
			$rootScope.tomorrowCheck = false;
		};
		// console.log('next day');

		// if ( ($rootScope.day+1 )== $rootScope.numDays) {

		// 	console.log('last day!!!!');
		// 	// console.log('day-'+( $rootScope.day+1) +', totaldays-'+ $rootScope.numDays);
		// }

	}

	$rootScope.prevDay = function(){
		// if( $rootScope.routeChangeInProgress ) return;
		if( $rootScope.day <= 1) return;
		$location.search( 'block', 0 );
		$location.search( 'wir', 0 );

		$location.path( $rootScope.prevDayUrl );

		if ($rootScope.tomorrowCheck) {
			$rootScope.tomorrowCheck = false;
		};
			
	}

	$rootScope.updateWir = function(loc) {
		var s = loc || 0;
		$location.search( 'wir', s );
	}

	$rootScope.tomorrow = function() {
		$location.path('/en/tomorrow/'+ ($rootScope.day+1));
		$rootScope.tomorrowCheck = true;
	
	}


	// Route Handling
	// ~~~~~~~~~~~~~~

	// go to default route on error (invalid route param, ie day that doesn’t exist yet)
	$rootScope.$on('$routeChangeError', function( event, current, previous, rejection ){
		$location.path('/en/day/1');
		console.log($rootScope.day);
	})

	// set global vars on route change
	$rootScope.$on('$routeChangeSuccess', function( event, current, previous ){

		/**
		 * Hide the grid menu if it's showing.
		 * Unhide the branding if it's collapsed.
		 */
		$rootScope.states.showGrid = false;
		$rootScope.states.shouldCollapseNav = false;

		$rootScope.lang = $routeParams.lang;
		$rootScope.day  = parseInt( $routeParams.dayId );

		$rootScope.currentDayUrl = '/' + $rootScope.lang + '/day/' + $rootScope.day;
		$rootScope.nextDayUrl = '/' + $rootScope.lang + '/day/' + ($rootScope.day + 1);
		$rootScope.prevDayUrl = '/' + $rootScope.lang + '/day/' + ($rootScope.day - 1);
		$rootScope.tomorrowCheck =false;

	})


	// Animate views left or right

	$rootScope.$on('$routeChangeStart',function( e, newRoute, oldRoute ){
		
		if( newRoute && oldRoute ){

			if( newRoute.controller && oldRoute.controller ){

				var currIndex = parseInt( newRoute.params.dayId ),
					prevIndex = parseInt( oldRoute.params.dayId );

				var forwards = ((currIndex - prevIndex) > 0) ? true : false;

				if( forwards )
					$rootScope.viewAnimationClass = 'slideLeft'	
					
				else
					$rootScope.viewAnimationClass = 'slideRight'	

			}	
		} else {
			$rootScope.viewAnimationClass = '';
		}
		
	})

}])

