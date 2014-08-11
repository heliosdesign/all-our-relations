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
	'ellenDaleGenevieveMorin',
	// 'resources',
	'resources'
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

	$rootScope.historyarray = [];
	$rootScope.lifedates = [0,0];
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

	// if ($rootScope.currentDayUrl==) {};
	// $rootScope.prevDayUrl = ; 


	// Next/Prev Day
	// ~~~~~~~~~~~~~

	$rootScope.nextDay = function(){
		$rootScope.viewAnimationClass = 'slideLeft'

		$location.path( $rootScope.nextDayUrl );

	}

	$rootScope.prevDay = function(){
		$rootScope.viewAnimationClass = 'slideRight'

		if( $rootScope.day == 'introduction' || $rootScope.day == 'title' || $rootScope.day == 'elijahHarper'){
			$location.path( $rootScope.prevDayUrl );
			$rootScope.slideup();
			// $rootScope.peek();
		}else if($rootScope.day == 'resources'){
			$location.path('/introduction');
		}else{
			$rootScope.slidedown();
			history.back(); 
			// console.log(history.back());
			return false;
		}
	}


	$rootScope.slidedown = function(){
		// console.log('declare');
		angular.element('.metadata').addClass('unhide');
		angular.element('.content').addClass('unhide');
	}

	$rootScope.slideup = function(){
		// console.log('declare');
		angular.element('.metadata').removeClass('unhide');
		angular.element('.content').removeClass('unhide');
	}

	$rootScope.familytree = function(){
		console.log(event.srcElement.parentNode.parentNode.parentNode);

		var child_element  = event.srcElement.parentNode.parentNode;
		var parent_element = event.srcElement.parentNode.parentNode.parentNode;
		var i = Array.prototype.indexOf.call(parent_element.children, child_element);

		function therest () {
			$rootScope.states.shouldCollapseNav = false;
			setTimeout(function() {
				$rootScope.slidedown();
				angular.element('.metadata').addClass('unhide');
			}, 500);
		};
		console.log(i);

		switch(i) {
			    case 0:
			    	$location.path('/elijahHarper');
			    	therest();
			    	// console.log('its working');
			        break;
			    case 1:
			        alert('this has been disabled for the prototype');
			        break;
			    case 2:
			        alert('this has been disabled for the prototype');
			        break;
			    case 3:
			        alert('this has been disabled for the prototype');
			        break;
			    case 4:
			        alert('this has been disabled for the prototype');
			        break;
			    case 5:
			        alert('this has been disabled for the prototype');
			        break;
			    default:
			        $location.path('/resources');
			        $rootScope.states.shouldCollapseNav = false;
			        setTimeout(function() {
			        	$rootScope.slideup();
			        }, 500);

			}

		
	}

	// // DELETE THIS AFTER PROTOTYPE
	// $rootScope.familytreeTemp = function(){
	// 	alert('this has been disabled for the prototype');
	// 	// $location.path('/en/6');
	// 	// $rootScope.states.shouldCollapseNav = false;

	// }

	$rootScope.timeline = function(){
		// if(angular.element('.dob').text()=="???"){
		// }else{

		// }
		
		$rootScope.lifedates[0]=parseFloat(angular.element('.dob').text());

		$rootScope.lifedates[1]=parseFloat(angular.element('.dod').text());

		setTimeout(function() {
			var dod = $rootScope.lifedates[1];
			var dob = $rootScope.lifedates[0];
			// angular.element('.bargraph').removeClass('missingB')
			// angular.element('.bargraph').removeClass('missingD')

			if (isNaN(dod)) {
				dod = 2014;
				angular.element('.bargraph').removeClass('missingB');
				angular.element('.bargraph').addClass('missingD');
			}else if (isNaN(dob)) {
				dob = 1814;
				angular.element('.bargraph').removeClass('missingD');
				angular.element('.bargraph').addClass('missingB');

			}else{ 

				angular.element('.bargraph').removeClass('missingB');
				angular.element('.bargraph').removeClass('missingD');

			};

			// var width =  ((2014-dod) - (2014-dob))/200 * 100;
			var width =  ((dod-dob)/200) * 100;


			var startDod = ((2014-dod)/200)*100;

			var startDob = ((dob-1814)/200)*100;

			// (((200/dob)*100) + width)

			// console.log(angular.element(element));

			angular.element('.bargraph').css('left',''+startDob+'%');
			angular.element('.bargraph').css('width',''+width+'%');

			console.log("overhere=",startDob,width);
		}, 100);
	}

	$rootScope.homebtn = function(){
		$rootScope.viewAnimationClass = 'slideRight'
		$location.path('/introduction');
		$rootScope.slideup();
		$rootScope.states.shouldCollapseNav = false;
	}

	$rootScope.resources = function(){
		$rootScope.viewAnimationClass = 'slideLeft'
		$location.path('/resources');
		$rootScope.slideup();
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
		
		
		$rootScope.historyarray.push($location.$$path);
		$rootScope.timeline();

		/**
		 * Hide the grid menu if it's showing.
		 * Unhide the branding if it's collapsed.
		 */

		$rootScope.states.showGrid = false;

		$rootScope.day = $routeParams.dayId ;
		// console.log($rootScope.day);

		var tempDayIndex = $rootScope.articles.indexOf($rootScope.day);
		// console.log("look at this:::",tempDayIndex);


		$rootScope.currentDayUrl = '/' + $rootScope.day;
		$rootScope.nextDayUrl = '/' + $rootScope.articles[tempDayIndex+1];
		$rootScope.prevDayUrl = '/' + $rootScope.articles[tempDayIndex-1];


		if($rootScope.day == 'introduction' || $rootScope.day == 'title' || $rootScope.day == 'resources' ){
			// console.log('== introduction or title');
			$rootScope.states.logoCollapse = true;

		}else{
			$rootScope.states.logoCollapse = false;
		}
		
		if($rootScope.day !== 'introduction' || $rootScope.day !== 'title' || $rootScope.day !== 'resources' ){
			// console.log('!== introduction or title');
			$rootScope.states.shouldCollapseNav = true;
			// $rootScope.slidedown();

		}else{
			$rootScope.states.shouldCollapseNav = false;


		}

		// if($rootScope.day !== 'introduction'){
		// 	$rootScope.unpeek();
		// }

		// if($rootScope.prevDayUrl == '/introduction'){
		// 	console.log('== elijah');
		// 	$rootScope.unpeek();
		// }
		// $rootScope.unpeek();

		// }

	})


	// Animate views left or right

	

	$rootScope.$on('$routeChangeStart',function( e, newRoute, oldRoute ){

		$rootScope.historyarray.push($location.$$path);

		// $rootScope.viewAnimationClass = 'slideLeft'	


		// console.log("this is it::",$rootScope.historyarray);

		if( newRoute && oldRoute ){

			if( newRoute.controller && oldRoute.controller ){

				var length= $rootScope.historyarray.length;
						
				var prevUrl =""+ $rootScope.historyarray[(length - 2)]  +"";
				var currUrl =""+ $rootScope.historyarray[(length - 1)]  +"";

				prevUrl = prevUrl.replace('/','');
				currUrl = currUrl.replace('/','');

				// console.log("previous=",prevUrl," current=",currUrl);


				var currIndex = $rootScope.articles.indexOf(currUrl),
					prevIndex = $rootScope.articles.indexOf(prevUrl);

				var forwards = ((currIndex - prevIndex) > 0) ? true : false;

					// console.log(forwards,currIndex,prevIndex);

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

