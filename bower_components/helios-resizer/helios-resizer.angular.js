(function(window, angular, undefined) {'use strict';

angular.module('heliosResizer', ['ng'])
    .factory('resizer', function($window, $rootScope) {

        
var functions = [], // registered functions to call on resize
	ratio = 9/16,   // default 16:9 ratio
	timeout = 0,    // 
	data = {		// size data in pixels: width height top left

		// fill screen
		cover : { 
			w : 0,
			h : 0,
			t : 0,
			l : 0
		},

		// maintain visibility of entire element
		contain : { 
			w : 0,
			h : 0,
			t : 0,
			l : 0
		}
	};

var add = function(name, func){
	if(!functions[name]) {
		console.log('[resize] adding function "'+name+'"');
		functions[name] = func;
		functions[name](data);
	}
}

var remove = function(name){
	if(functions[name]) {
		console.log('[resize] removing "'+name+'"');
		delete functions[name];
	}
}

// ********************************************************

var doit = function(){

	// refresh data object
	var h,w,t,l;

	// CONTAIN
    w = window.innerWidth;
  	h = w * ratio;
  
  	if(h > window.innerHeight) {
  		h = window.innerHeight;
  		w = h / ratio;
  	}
  
  	t = (window.innerHeight - h) / 2;
	l = (window.innerWidth - w) / 2;
  
  	data.contain.w = Math.round(w)
  	data.contain.h = Math.round(h)
  	data.contain.t = Math.round(t)
  	data.contain.l = Math.round(l)
  	
  	// COVER
  	w = window.innerWidth;
	h = w * ratio;
	    
    if(h < window.innerHeight) {
        h = window.innerHeight;
        w = h / ratio;
    }

    t = (window.innerHeight - h) / 2;
    l = (window.innerWidth - w) / 2;
	    	
  	data.cover.w = Math.round(w)
  	data.cover.h = Math.round(h)
  	data.cover.t = Math.round(t)
  	data.cover.l = Math.round(l)


	// call registered functions
	for (var func in functions) {
		if (functions.hasOwnProperty(func)) {
			functions[func](data);
		}
	}		
	
}

var onresize = function(){
	if(timeout) clearTimeout(timeout);
	timeout = setTimeout(doit, 100);
}

window.addEventListener('resize',onresize,false);
doit();


return {
	add : add,
	remove : remove,
	ratio : ratio
};
            
    });

})(window, window.angular);