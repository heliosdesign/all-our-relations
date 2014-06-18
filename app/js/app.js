'use strict';

var allOurRelApp = angular.module('allOurRelApp', [
	'ngRoute', 'ngAnimate', 'ngTouch',

	'allOurRelApp.services',
	'allOurRelApp.filters',
	'allOurRelApp.controllers',
	'allOurRelApp.directives',

	'duScroll' // https://github.com/durated/angular-scroll
]);


allOurRelApp.constant('redCrossArticles', [
	'title',
	'introduction',
	// 'Elijah familytree',
	'elijahHarper',
	'allanHarper',
	'ethelCatherineTaylor',
	'thomasHarper',
	'julietteWood',
	'thomasTaylor',
	'emilyMonias',
	'sinaWakaabu',
	'aLight',
	'blackman',
	'flett',
	'innahue',
	'whitePartridge',
	'mashigiu',
	'anythingSore',
	'wingsHalfWhite',
	'heCameFromEngland',
	'KaSiPaguANi',
	'peemeecheekag',
	// 'Douglas familytree',
	'douglasCardinal',
	'josephJoeCardinal',
	'francesMarguerite',
	'hilaireHenryCardinal',
	'marthaCarolineLee',
	'alvinJosephRach',
	'ellenDaleGenevieveMorin'
]);



allOurRelApp.config(['$routeProvider', 'redCrossArticles', function( $routeProvider, articles){

	$routeProvider.when( '/:dayId', {

		controller: 'day',

		templateUrl: function( params ){
			return 'partials/day-' + params.dayId + '.html';
		},

		//before changes
		// templateUrl: function( params ){ 
		// 	return 'partials/day-' + params.dayId + '.html';
		// },

		reloadOnSearch: false,

		resolve: {

			
			// Validate dayID param
			dayExists: function( $q, $route, $rootScope ){
				var deferred = $q.defer(),
					dayId = $route.current.params.dayId;

				// console.log("this right here-"+ articles[dayId-1] +"")

				// if( dayId > 0 && dayId <= $rootScope.numDays ){

					deferred.resolve(
						$rootScope.currentarticle = dayId
					);
				// }
					
				// else{
				// 	deferred.reject('invalid route parameter');
				// }
					

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
	

	$routeProvider.otherwise({ redirectTo: '/introduction' });
}])



// Cache Bust
// allOurRelApp.config(['$provide', function($provide) {
//     return $provide.decorator('$http', ['$delegate', function($delegate) {
//         var get = $delegate.get;
//         $delegate.get = function(url, config) {

//             // Check is to avoid breaking AngularUI ui-bootstrap-tpls.js: "template/accordion/accordion-group.html"
//             // if (url.indexOf('partials/')) {
//                 // Append ?v=[cacheBustVersion] to url
//                 url += (url.indexOf('?') === -1 ? '?' : '&');
//                 url += 'v=' + Math.round( (new Date()).getTime() / 1000 );
//             // }
//             return get(url, config);
//         };
//         return $delegate;
//     }]);
// }])

// CORS
// allOurRelApp.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.defaults.useXDomain = true;
//     delete $httpProvider.defaults.headers.common['X-Requested-With'];
// }]);

// allOurRelApp.config(function($sceDelegateProvider, $sceProvider) {
//   $sceDelegateProvider.resourceUrlWhitelist([
//     // Allow same origin resource loads.
//     'self',
//     // Allow loading from outer templates domain.
//     'http://*.205.186.156.50/**'
//   ]); 

//   $sceProvider.enabled(false)
// });


allOurRelApp.run(['$rootScope', '$location', '$route', '$routeParams', 'redCrossArticles',  function($rootScope, $location, $route, $routeParams, articles){

	// Debug
	// ~~~~~

	if( window.location.host == 'localhost' || window.location.host == '205.186.156.50' || window.location.host == '192.168.1.50:8888' )
		$rootScope.debug = true;
	else
		$rootScope.debug = false;

	if ( $rootScope.debug ){

		// console.log('/* DEBUG */')

		window.$rootScope = $rootScope;
		window.$location = $location;


	}
	
	// Global Variables
	// ~~~~~~~~~~~~~~~~

	$rootScope.currentarticle= 1;
	$rootScope.articles = articles;
	$rootScope.numDays = articles.length;
	$rootScope.day = 0;
	$rootScope.baseTitle = ' - All Our Relations';
	$rootScope.states = {
		logoCollapse : true
	};


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
	$rootScope.baseURL = 'http://205.186.156.50/all-our-relations/app/';



	// Next/Prev Day
	// ~~~~~~~~~~~~~

	$rootScope.nextDay = function(){
		// var tempDayIndex= $rootScope.articles.indexOf($rootScope.day);


		// if( $rootScope.day >= $rootScope.numDays ) return;

		$location.path( $rootScope.nextDayUrl );

	}

	$rootScope.prevDay = function(){
		// var tempDayIndex= $rootScope.articles.indexOf($rootScope.day);

		// if( $rootScope.day <= 1) return;
		if( $rootScope.day == 'introduction' || $rootScope.day == 'title' || $rootScope.day == 'elijahHarper' ){
			$location.path( $rootScope.prevDayUrl );
		}else{
			history.back(); 
			return false;
		}
			

	}

	// $rootScope.updateWir = function(loc) {
	// 	var s = loc || 0;
	// 	$location.search( 'wir', s );
	// }


	$rootScope.familytree = function(){
		$location.path('/elijahHarper');
		$rootScope.states.shouldCollapseNav = false;

	}
	// DELETE THIS AFTER PROTOTYPE
	$rootScope.familytreeTemp = function(){
		alert('this has been disabled for the prototype');
		// $location.path('/en/6');
		// $rootScope.states.shouldCollapseNav = false;

	}

	$rootScope.homebtn = function(){
		$location.path('/title');
		$rootScope.states.shouldCollapseNav = false;

	}

	// Route Handling
	// ~~~~~~~~~~~~~~

	// go to default route on error (invalid route param, ie day that doesn’t exist yet)
	$rootScope.$on('$routeChangeError', function( event, current, previous, rejection ){
		$location.path('/introduction');
		// console.log($rootScope.day);
	})

	// set global vars on route change
	$rootScope.$on('$routeChangeSuccess',function( event, current, previous ){

		/**
		 * Hide the grid menu if it's showing.
		 * Unhide the branding if it's collapsed.
		 */
		$rootScope.states.showGrid = false;

		$rootScope.day  =  $routeParams.dayId ;
		// console.log($rootScope.day);

		var tempDayIndex= $rootScope.articles.indexOf($rootScope.day);
		console.log("look at this:::",tempDayIndex);


		$rootScope.currentDayUrl = '/' + $rootScope.day;
		$rootScope.nextDayUrl = '/' + $rootScope.articles[tempDayIndex+1];
		$rootScope.prevDayUrl = '/' + $rootScope.articles[tempDayIndex-1];


		if($rootScope.day == 'introduction' || $rootScope.day == 'title'){
			console.log('== introduction or title');
			$rootScope.states.logoCollapse = true;
		}else{
			$rootScope.states.logoCollapse = false;
		}
		
		if($rootScope.day !== 'introduction' || $rootScope.day !== 'title'){
			console.log('!== introduction or title');
			$rootScope.states.shouldCollapseNav = true;
		}else{
			$rootScope.states.shouldCollapseNav = false;
		}




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

