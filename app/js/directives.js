'use strict';

var dirs = angular.module('allOurRelApp.directives', [ 'allOurRelApp.services' ]);



dirs.directive('pageNav', [ '$rootScope', function( $rootScope ){
	return {
		restrict: 'E',
		templateUrl: 'partials/_pageNav.html',
		link: function( $scope, element, attrs ) {

		}
	}
}]);


dirs.directive('block', function( $animate ){
	return {
		restrict: 'C',
		link: function( $scope, element, attrs ){
		
			if( attrs.bgImg )
				element.css( 'background-image', 'url(' + attrs.bgImg + ')' );	
			
			if( attrs.bgCol )
				element.css( 'background-color', attrs.bgCol );
			else
				element.css( 'background-color', 'rgba(0,0,0,0)' );

			if( !attrs.id ){
				$(element).attr( 'id', 'block' + element.index() );
			}

			$(element).attr( 'index', element.index() )

		}
	}
});

dirs.directive('portrait', function( $animate ){
	return {
		restrict: 'C',
		link: function( $scope, element, attrs ){
		
			if( attrs.bgImg )
				element.css( 'background-image', 'url(' + attrs.bgImg + ')' );	
			
			if( attrs.bgCol )
				element.css( 'background-color', attrs.bgCol );
			else
				element.css( 'background-color', 'rgba(0,0,0,0)' );

			// var blah= angular.element('.familytree');

			// switch($rootScope.day) {
			//     case 'elijahHarper':
			//     	console.log(angular.element('.familytree')[0]);
			//         // angular.element('.familytree')[0].addClass('off');
			//         break;
			//     default:
			//         console.log('');
			// }

			// if ($rootScope.day=='elijahHarper') {
				// angular.element(element).addClass('off');
			// };
 
		}
	}
});

dirs.directive('dob', function( $animate ){
	return {
		restrict: 'C',
		link: function( $scope, element, attrs ){

			$rootScope.lifedates[0]=parseFloat(angular.element(element).text());

		}
	}
});
dirs.directive('dod', function( $animate ){
	return {
		restrict: 'C',
		link: function( $scope, element, attrs ){



			$rootScope.lifedates[1]=parseFloat(angular.element(element).text());

		}
	}
});

dirs.directive('bargraph', function( $animate ){
	return {
		restrict: 'C',
		link: function( $scope, element, attrs ){

				// blah = (($rootScope.lifedates[1] - $rootScope.lifedates[0])/2014) * 100 ;
			// var width = blah/2014*100;

			setTimeout(function() {
				var dod = $rootScope.lifedates[1];
				var dob = $rootScope.lifedates[0];

				// var width =  ((2014-dod) - (2014-dob))/200 * 100;
				var width =  ((dod-dob)/200) * 100;


				var startDod = (dod/200) * 100;

				var startDob = ((dob-1814)/200)*100;

				// (((200/dob)*100) + width)

				console.log(angular.element(element));

				angular.element(element).css('left',''+startDob+'%');
				angular.element(element).css('width',''+width+'%');

				console.log(startDob,width);
			}, 100);

			

		}
	}
});




// dirs.directive('portrait', function( $animate ){
// 	return {
// 		restrict: 'C',
// 		link: function( $scope, element, attrs ){
		
// 			if( attrs.bgImg )
// 				element.css( 'background-image', 'url(' + attrs.bgImg + ')' );	
			
// 			if( attrs.bgCol )
// 				element.css( 'background-color', attrs.bgCol );
// 			else
// 				element.css( 'background-color', 'rgba(0,0,0,0)' );
 
// 		}
// 	}
// });


dirs.directive('content', function( $animate ){
	return {
		restrict: 'C',
		link: function( $scope, element, attrs ){
			
			angular.element(element[0]).bind("scroll", function() {
			    var scrollX = (this.x || element[0].scrollLeft) - element[0].scrollLeft;
			    var scrollY = (this.y || element[0].scrollTop) - element[0].scrollTop;
			    
			    this.x = element[0].scrollLeft;
			    this.y = element[0].scrollTop;
			    
			    test(scrollX, scrollY);

			});

			function test(scrollX, scrollY){
			    
			    var directionX = !scrollX ? "NONE" : scrollX>0 ? "LEFT" : "RIGHT";
			    var directionY = !scrollY ? "NONE" : scrollY>0 ? "UP" : "DOWN";

			    var timerCheck=true;

			    if (directionY=="UP" || scrollY == 0) {
			    	$rootScope.$apply(function() {
			    		if (timerCheck===true) {
			    			// $rootScope.states.shouldCollapseNav=true;
			    			// $rootScope.states.logoCollapse=false;
			    			timerCheck=false
			    		};
			    		
			    	});
			    }else{
			    	$rootScope.$apply(function() {
			    		$rootScope.slideup();
			    		// $rootScope.states.shouldCollapseNav=false;
			    		// $rootScope.states.logoCollapse=true;

			    		setTimeout(function() {
			    			if(timerCheck===false){
			    				timerCheck=true;
			    			}
			    		}, 5000);
			    	});
			    	

			    };
			   
			}
		}
	}
});

// dirs.directive('metadata', function( $animate ){
// 	return {
// 		restrict: 'C',
// 		link: function( $scope, element, attrs ){
// 			if ($rootScope.states.shouldCollapseNav===false) {
// 				// console.log($rootScope.states.shouldCollapseNav);
// 					angular.element(element[0]).addClass('shadowOn');

// 			}else{
// 				angular.element(element[0]).removeClass('shadowOn');
// 			};
			
// 		}
// 	}
// });




dirs.directive('youtubePlayer',function(){
	return {
		restrict: 'E',
		priority: 10,
		scope: {},
		template: '<div id="v-player-{{id}}" class="video-player pos-fill-yt"></div>',

		link: function( $scope, element, attrs ){
			if( !attrs.vidSrc ) return;
			$scope.id = attrs.vidSrc;


		// },

		// controller: function( $scope, $element, $attrs ){

			var player,
				isReady = false,
				state = 0;

			window.onYouTubeIframeAPIReady = function(){

				function onPlayerReady(){	
					// console.log("player ready")		
					isReady = true;
				}

				function onPlayerStateChange(evt){
					// console.log(evt.data)

				}

				setTimeout(function(){	
					player = new YT.Player( 'v-player-' + attrs.vidSrc, {
					videoId: attrs.vidSrc,
					playerVars: {rel: 0, showinfo: 0},
					events: {
                    	'onReady': onPlayerReady,
                    	'onStateChange': onPlayerStateChange
					}
				});},1000)

			}


			YT.ready( onYouTubeIframeAPIReady )


			// auto play/pause

			var blockIndex = element.closest('.block').index();


			 $scope.$parent.$parent.$watch( 'currentBlock', function(n,o){
				// console.log('BLOCK CHANGE -> ' + n)
				
				if( n == blockIndex ){
				
					if( isReady ) 
						player.playVideo();
						
				} else if( n != blockIndex ){
					if( isReady ) 
						player.pauseVideo();
				}

			});

		}
	}
});








dirs.directive('day',function( $location, $rootScope, $animate, $document, $timeout ){
	return {
		restrict: 'E',
		priority: 1000,
		transclude: true,
		templateUrl: 'partials/_day.html',
		link: function( $scope, element, attrs ){



			if( $rootScope.debug ) window.$scope = $scope;


			// Metadata
			// ~~~~~~~~

			window.document.title = ((attrs.title) ? attrs.title : 'Day ' + $rootScope.day) + $rootScope.baseTitle;

			$rootScope.currentDay = {
				relatedDays: (attrs.relatedDays) ? attrs.relatedDays.split(',') : [],
				category:    (attrs.category) ? attrs.category : ''
			}


			// Day Nav
			// ~~~~~~~

			$scope.blocks = $(element).find('.block');
			$scope.totalBlocks  = $scope.blocks.length;
			$scope.currentBlock = 0;
	
			var search = $location.search();

			if( search.block ){

				var block = parseInt( search.block );

				if( block < 0 || block > $scope.totalBlocks || !block )
					$location.search( 'block', 0 )
				else
					$scope.currentBlock = block;
			}
			
			$scope.blocks.eq($scope.currentBlock).addClass('active')

			if( $( $scope.blocks[ $scope.currentBlock + 1 ] ) ){

				$( $scope.blocks[ $scope.currentBlock + 1 ] ).addClass('next')

			}
			angular.element('.content').addClass('unhide');


			// $rootScope.unpeek();

			// if ($rootScope.day !== 'introduction' || $rootScope.day !== 'title') {
			// 	$rootScope.slideDown();
			// }else{
			// 	$rootScope.slideUp();
			// };

			


			// if($rootScope.day < 3){
			// 	$rootScope.states.shouldCollapseNav = true;
			// }else{
			// 	$rootScope.states.shouldCollapseNav = false;
			// }

			
				


				
			$scope.down = function(){
				
				$scope.currentBlock += 1;
				
				if( $scope.currentBlock >= $scope.totalBlocks ){
					$scope.currentBlock = $scope.totalBlocks-1;
					return;
				}

			}

			$scope.innerjump = function(theindex){

				if ($scope.currentBlock != theindex) {
					$scope.currentBlock = theindex;
				};
				
			}


			$scope.up = function(){
				
				$scope.currentBlock -= 1;
				
				if( $scope.currentBlock < 0 ){
					$scope.currentBlock = 0;
					return;
				}
			}

			$document.on('keyup',function(e){
				if( e.keyCode === 40 ) $timeout(function(){ $scope.down() });
				if( e.keyCode === 38 ) $timeout(function(){ $scope.up()   });

				if( e.keyCode === 37 ) $timeout(function(){ $rootScope.prevDay() } )
				if( e.keyCode === 39 ) $timeout(function(){ 
					$rootScope.nextDay()
				} )
			})





			// Animated block transition
			// ~~~~~~~~~~~~~~~~~~~~~~~~~

			$rootScope.blockAnimDirection = 'slideDown';

			$scope.$watch( 'currentBlock', function(n,o){

				// console.log("block change: " + o + " -> " +n)

				if( n === o ) return;

				var $newBlock = $( $scope.blocks[ n ] ),
					$oldBlock = $( $scope.blocks[ o ] );

				$rootScope.blockAnimDirection = ( (n-o) > 0 ) ? 'slideDown' : 'slideUp';

				$location.search( 'block', n )

				var $iframe = $newBlock.find('iframe')
				
				if ($iframe[0] && typeof $iframe[0].contentWindow.resetMap !== "undefined") {
  					$iframe[0].contentWindow.resetMap()
				}
			
				// activate active element
				$newBlock.removeClass('next')
				$animate.addClass( $newBlock, 'active', function(){
				})

				// going down/forwards
				if( $rootScope.blockAnimDirection === 'slideDown') {
					$animate.removeClass( $oldBlock, 'active', function(){
						$animate.addClass( $( $scope.blocks[n+1] ), 'next' )
					})
				}

				// going up/backwards
				else {
					$animate.removeClass( $oldBlock, 'active', function(){
						$oldBlock.addClass('next')

					})

					$animate.removeClass( $( $scope.blocks[o+1] ), 'next' )
					
				}
				// $root.states.shouldCollapseNav

				// if( n > 1 ) $rootScope.states.shouldCollapseNav = true;
				// else        $rootScope.states.shouldCollapseNav = false;

				



				// if( n > 0 ) $rootScope.shouldCollapseNav = false;
				// else        $rootScope.shouldCollapseNav = true;



			});

			// if($rootScope.day < 3){
			// 	$rootScope.states.shouldCollapseNav = true;
			// }else{
			// 	$rootScope.states.shouldCollapseNav = false;
			// }


			$scope.$on('$destroy',function(){
				$document.off('keyup')

			})

		}
	}
});



