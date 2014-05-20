'use strict';

var dirs = angular.module('redCrossApp.directives', [ 'redCrossApp.services' ]);



dirs.directive('pageNav', [ '$rootScope', function( $rootScope ){
	return {
		restrict: 'E',
		templateUrl: 'partials/_pageNav.html',
		link: function( $scope, element, attrs ) {

		}
	}
}]);

dirs.directive('wir', ['$rootScope', '$timeout', 'jumpTo', function($rootScope, $timeout, jumpTo) {
	return {
		restrict: 'E',
		templateUrl: 'partials/_whatIsResilience.html',
		link: function( $scope, element, attrs ) {
			attrs.$observe('wirSection', function(newVal) {
				if (+newVal > 0) {
					var s = angular.element(element).find('section').eq(newVal-1);

					/**
					 * This timeout is needed to make sure the element is in the DOM first.
					 */
					$timeout(function() {
						jumpTo(s, 'what-is-resilience');
					});
					
					
				}		
			});
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
				element.css( 'background-color', '#000' );

			if( !attrs.id ){
				$(element).attr( 'id', 'block' + element.index() );
			}

			$(element).attr( 'index', element.index() )
		}
	}
});



dirs.directive('poster', [ function(){
	return {
		link: function( $scope, element, attrs ){

		}
	}
}]);


// cover/contain

dirs.directive('cover',function( $parse ){
	return {
		restrict: 'A',
		priority: -100,
		link: function( $scope, element, attrs ){
			if( typeof attrs.cover === 'undefined' ) return;

			var ratio  = $parse(attrs.cover)(),
				w, h, t, l;
			if( !ratio ) return;

			var resize = function(){

				w = window.innerWidth;
				h = w * ratio;
				    
			    if(h < window.innerHeight) {
			        h = window.innerHeight;
			        w = h / ratio;
			    }

			    t = (window.innerHeight - h) / 2;
			    l = (window.innerWidth - w) / 2;

			    // element[0].style.transform = 
				element.css({
					'transform':         'translate(' + l + 'px, ' + t + 'px)',
					'-webkit-transform': 'translate(' + l + 'px, ' + t + 'px)',
					'-moz-transform':    'translate(' + l + 'px, ' + t + 'px)',

					'width':  w + 'px',
					'height': h + 'px'
				})
			}	

			$scope.$on( 'resize', resize )
			resize();

		}
	}
});


dirs.directive('contain',function( $parse ){
	return {
		restrict: 'A',
		priority: -100,
		link: function( $scope, element, attrs ){
			if( typeof attrs.contain === 'undefined' ) return;

			var ratio  = $parse(attrs.contain)(),
				w, h, t, l;
			if( !ratio ) return;

			var resize = function(){

				w = window.innerWidth;
			  	h = w * ratio;
			  
			  	if(h > window.innerHeight) {
			  		h = window.innerHeight;
			  		w = h / ratio;
			  	}
			  
			  	t = (window.innerHeight - h) / 2;
				l = (window.innerWidth - w) / 2;

			    // element[0].style.transform = 
				element.css({
					'transform':         'translate(' + l + 'px, ' + t + 'px)',
					'-webkit-transform': 'translate(' + l + 'px, ' + t + 'px)',
					'-moz-transform':    'translate(' + l + 'px, ' + t + 'px)',

					'width':  w + 'px',
					'height': h + 'px'
				})
			}	

			$scope.$on( 'resize', resize )
			resize();

		}
	}
});



dirs.directive('videoPlayer', function(){
	return {
		restrict: 'E',
		priority: 10,
		scope: {},
		template: '<div class="video-player pos-fill"><video width=100% loop=true src="{{src}}"></video></div>',

		link: function( $scope, element, attrs ){

			if( !attrs.vidSrc ) return;

			// FIX ME proper ratio passing
			if( !attrs.ratio ) attrs.ratio = 9/16;
			$scope.ratio = attrs.ratio;

			$scope.src = attrs.vidSrc;
		},

		controller: function( $scope, $element ){

			var video = $element.find('video')[0]

			// auto play/pause

			var blockIndex = $element.closest('.block').index();

			 $scope.$parent.$parent.$watch( 'currentBlock', function(n,o){
				console.log('BLOCK CHANGE -> ' + n)
				
				if( n == blockIndex ){
					console.log('PLAY')
					
					setTimeout(function() {
						video.play();
					}, 500);

				} else if( n != blockIndex && !video.paused ){
					console.log('PAUSE')
					video.pause();
				}
			});

		}
	}
});

dirs.directive('imgPan',function($animate){
	return {
		restrict: 'E',
		priority: 10,
		scope: {},
		template: '<div class="img-pan-vert"><img id="{{id}}" src="{{src}}"></></div>',

		link: function( $scope, element, attrs ){
			if( !attrs.imgSrc ) return;
			$scope.src = attrs.imgSrc;
			$scope.id = attrs.imgId;

			$scope.panImg = $(element).find('img');

			console.log($scope.panImg)

			// $animate.addClass( $scope.panImg, 'pan-down', function(){
			// //console.log($animate)
			// })

			setTimeout(function(){$scope.panImg.addClass('pan-down')},1000)

			//$scope.panImg.addClass('pan-down')
		}
	}
})


dirs.directive('youtubePlayer',function(){
	return {
		restrict: 'E',
		priority: 10,
		scope: {},
		template: '<div id="v-player-{{id}}" class="video-player pos-fill"></div>',

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
					console.log("player ready")		
					isReady = true;
				}

				function onPlayerStateChange(evt){
					console.log(evt.data)

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
				console.log('BLOCK CHANGE -> ' + n)
				
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
					if ($rootScope.day != $rootScope.redCrossDay) {
						$rootScope.nextDay()
					}else{$rootScope.tomorrow()}
					 
				} )
			})





			// Animated block transition
			// ~~~~~~~~~~~~~~~~~~~~~~~~~

			$rootScope.blockAnimDirection = 'slideDown';

			$scope.$watch( 'currentBlock', function(n,o){

				console.log("block change: " + o + " -> " +n)

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

				if( n > 0 ) $rootScope.shouldCollapseNav = true;
				else        $rootScope.shouldCollapseNav = false;

			});


			$scope.$on('$destroy',function(){
				$document.off('keyup')
			})

		}
	}
});

dirs.directive('bgPan',function( $timeout ){
	return {
		restrict: 'E',
		scope: {},
		template: '<div class="bg-pan pos-fill"><img width="{{imgW}}" height="{{imgH}}" ng-src="{{src}}"></div>',

		link: function( $scope, element, attrs ){
			if( !attrs.img && !attrs.direction ) return;
			
			console.log( 'bg-pan: ' + attrs.img )

			$scope.src = attrs.img;
			$scope.imgW = 0;
			$scope.imgH = 0;

			var imgRatio = 0,
				windowRatio = 0,
				windowW,
				windowH,
				mouseX = 0.5,
				mouseY = 0.5;

			var scrollDirection = 'horizontal';

			// get image width and height
			var img = new Image();
			img.src = $scope.src;

			img.onload = function(){

				var that = this;

				getWindowSize();

				$timeout(function(){

					$scope.imgW  = that.width;
					$scope.imgH = that.height;	

					imgRatio = $scope.imgH / $scope.imgW;

					setImagePos();
				})
			}

			element.on('mousemove',function(e){
				var mouseX = e.pageX / windowW,
					mouseY = e.pageY / windowH;
				
				console.log( mouseX + ' ' + mouseY)


			})


			var setImagePos = function(){



			}

			var getWindowSize = function(){
				windowW = window.innerWidth;
				windowH = window.innerHeight;

				windowRatio = windowH / windowW;

			}

			$scope.$parent.$on('resize', function(){
				getWindowSize();
				setImagePos();
			});
			

			$scope.$on('$destroy',function(){
				element.off('mousemove');
			})
		}
	}
});

dirs.directive('hotSpot', ['$rootScope', function($rootScope) {
	return {
		restrict: 'E',
		scope: {
			hotSpotActive: '@'
		},
		transclude: true,
		replace: true,
		template: '<div class="hot-spot" ng-class="{active: hotSpotActive}">' +
					'<div class="hot-spot-content" ng-transclude></div>' +
					'<div class="hot-spot-toggle">' +
						'<svg class="icon" viewBox="0 0 100 100"><use xlink:href="#icon-cross" class="icon-plus"></use><use xlink:href="#icon-minus" class="icon-minus"></use></svg>' +
					'</div>' +
				  '</div>',
		link: function( $scope, element, attrs ) {
			$scope.el = element;
			element[0].style.top = attrs.top + '%';
			element[0].style.right = attrs.right + '%';

			element.bind('click', function() {
				$scope.$apply(function() {
					$scope.hotSpotActive = !$scope.hotSpotActive;
				});
			});
		}
	}
}]);

dirs.directive('modal', function(){
	return {
		restrict: 'E',
		scope: true,
		//replace: true,
		template: '<div class="modal-outer" ng-show="modalContent.indexOf(\'.html\') > 0"><div class="modal-content" ng-include="modalContent"></div><div class="modal-close" ng-click="closeModal();">Close</div></div>',
		controller: function($scope, $rootScope) {
			$scope.closeModal = function() {
        		$rootScope.modalContent = null;
    		}
		}
	}
});

