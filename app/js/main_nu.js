// if(!console) {console={}; console.log = function(){};}
var mobile = false;
$(function(){
	if ($(window).innerWidth() < 600 || bowser.ios || bowser.android) {
		// $('body').addClass('lock');
		// console.log('lksajdlksajdlkjasdslkjalj');
		$('.dsk').addClass('mobile');
		if (bowser.ios || bowser.android) {
			// console.log('!!!!!!!!!!!',$('.dsk'));

			$('.ios').addClass('iosactive');
			$('.btn-timeline').remove();
			// console.log(window);
			if (window.screen.lockOrientation) {
				window.screen.lockOrientation('landscape');
			};

		};
		mobile = true;
		$('.aboutcontainer').css('display','none');

		// $('.unsupported').addClass('show');
	}else{
		// $('body').removeClass('lock');
		$('.dsk').removeClass('mobile');
		$('.ios').removeClass('iosactive');
	

		mobile = false;
		// $('.unsupported').removeClass('show');
	}
	$( window ).resize(function() {
		console.log('resize');
		if ($(window).innerWidth() < 600 || bowser.ios || bowser.android) {
			$('body').addClass('lock');
			$('.dsk').addClass('mobile');
			$('.side-menu').css('display','flex')
			if (bowser.ios || bowser.android) {
				$('.ios').addClass('iosactive');
			};
			mobile = true;
			// $('.unsupported').addClass('show');
		}else{
			$('body').removeClass('lock');
			$('.dsk').removeClass('mobile');
			$('.ios').removeClass('iosactive');
			$('.side-menu').css('display','table-cell')

			mobile = false;
			// $('.unsupported').removeClass('show');
		}
	});
	var canPlayVid = false; 
	if (!mobile) {
		$('#bg-video')[0].play();
	};

	var v = document.createElement('video');

	if(v.canPlayType && v.canPlayType('video/mp4').replace(/no/, '')) {
	    canPlayVid = true;
	}


	var margin = {top: 0, right: 0, bottom: 0, left: 100},
	    width = window.innerWidth,
	    iconHeight= 90
	    height = window.innerHeight;
	    var clicked

	    var canvas = document.getElementById('background')
	    var underCanvas = document.getElementById('under-background')

	    var baseHeight,baseWidth, ratio, hasViewed

		var resetZoom = function(){
			$('#background').css('left',0)
			$('#background').css('top', 0)
		}

		var zoomMap = function(z, loc){
			if(!$('#background').hasClass('background-shifter')){
				$('#background').addClass('background-shifter')
			}

			if (!z) z = 1.2

			
			var targetV = baseHeight/2,targetH = baseWidth/2 

			if(loc=="manitoba"){
			 targetV = baseHeight/2 - 200
			 targetH = baseWidth/2 - 400
			}

			if(loc=="manitoba-s"){
			 targetV = baseHeight/2 - 300
			 targetH = baseWidth/2 - 400
			}

			if(loc=="ontario"){
			 targetV = baseHeight/2 - 200
			 targetH = baseWidth/2 
			}

			if(loc=="ontario-s"){
			 targetV = baseHeight/2 - 100
			 targetH = baseWidth/2  -100
			}

			if(loc=="alberta-s"){
			 targetV = baseHeight/2 - 200
			 targetH = baseWidth/2  - 600
			}			

			if(loc=="sask"){
			 targetV = baseHeight/2 - 180
			 targetH = baseWidth/2  - 500
			}	

			$('#background').css('width', baseWidth * z)
			$('#background').css('height', baseHeight * z * (ratio *2))

			$('#background').css('left', -targetH * z)
			$('#background').css('top', -targetV * z * (ratio *2))

		}
	    
		
		var drawBG = function(_url){

		var overlayImg = new Image()

		var overlay=document.getElementById("overlay");
		
		var parchment=document.getElementById("parchment");

		var underCtx=underCanvas.getContext("2d");

		var ctx=canvas.getContext("2d");



		$('#background').removeClass('background-shifter')
		

		var cw = window.innerWidth, multix = parchment.height/parchment.width


		overlayImg.onload = function(){

			var stepDown = window.innerWidth / overlayImg.width

			canvas.height = overlayImg.height
	    	canvas.width = overlayImg.width

	    	ratio = overlayImg.height / overlayImg.width

	    	baseHeight= window.innerWidth
	    	baseWidth = overlayImg.height * stepDown

	    	$('#background').css('width',window.innerWidth)
			$('#background').css('height',overlayImg.height * stepDown)
			// $('#background').css('height',window.innerHeight)

			document.getElementById("overlay").src = _url	

			draw(overlayImg.height * stepDown)

		}

		overlayImg.src = _url

		var counter = 0


		function draw(h){

			var startDraw = window.innerWidth/4 * counter

			ctx.clearRect(0,0,canvas.width,canvas.height)
			
			ctx.drawImage(overlay,0,0);	
			ctx.globalCompositeOperation ="darker";

			if(hasViewed){$('#all-container').fadeIn()}

			counter ++
		}
}
					
		drawBG('images/title_page.jpg')

		var loadPartial = function(_partial) {

			$( "#contentPanel" ).fadeOut(1000,function(){



				$( "#contentPanel" ).html('')

				var _status = "200"

				$( "#contentPanel" ).load( "partials/" + _partial +".html", function( response, status, xhr ) {

			  		if ( status == "error" ) {
				  		status = "404"
						$( "#contentPanel" ).css('display','none')
			  		}else{
			  			$('.ancestor').fadeIn()
			  			$( "#contentPanel" ).fadeIn()
			  		}

			  		$('#contentPanel').on('click',function(){

						$('.fader').fadeIn()

						$('.text-bucket').fadeOut()

						$('.content-bucket').fadeOut()

			  		})
					

			  	
			});			
			})
		}	

		var buildTimeline = function() {


			$('.text-bucket').css('display','none')


			$('.timeline').css('display','table-cell')

			setTimeout(function() {
				$('#all-container').css('display','table')
			}, 500);

			$('.showwrapper').css('display','none')

			$('.resourcewrapper').css('display','none')

			$('.portraitwrapper').css('display','table')

			$('#portrait-gallery').css('display','table-cell')

			$('.resources').css('display','none')
			

			$('.fader').css('display','none')
			$('.steps').fadeOut();

			$('.resourcecontainer').fadeOut();
			$('.aboutcontainer').fadeOut();
			$('.showscontainer').fadeOut();

			drawBG('images/main_map_pan.jpg')

		}

		var buildIntro = function() {
			$('#svg-container').css('display','none');

			resetZoom()

			var w = window.innerWidth
			var h = window.innerHeight

			var ratio = window.innerWidth/window.innerHeight

			var vw, vh

			if (ratio > 1){

				//landscape

				vh = window.innerHeight
				vw = window.innerWidth * ratio



			}

			var mobiletime = 500;


			if(!hasViewed ){
				$('#header').css('display','none');
				if (!mobile) {
					if (canPlayVid===false ) {
						
						$('#bg-video')[0].src="assets/video/aor4.webm"
						$('#bg-video')[0].play();

					}else{
						
						$('#bg-video')[0].src="assets/video/aor4.mp4"
						$('#bg-video')[0].play();

					};

					$('#bg-video')[0].play();
					$('all-container').css('display','none');

				}else{
					mobiletime = 0;
					$('#parchment-scrim').css('display','none')

					$('#header').fadeIn();
				}
				
				hasViewed = true
			}

			

			$('.timeline').css('display','none')

			$('.portraitwrapper').css('display','none')

			$('.showwrapper').css('display','none')

			$('.aboutwrapper').css('display','none')
			$('.aboutcontainer').css('display','none')

			$('.resourcewrapper').css('display','none')

			$('.side-menu').css('display','none')


			$('.resources').css('display','none')

			$('.text-bucket').css('display','none')

			$('.content-bucket').css('display','none')


			$('.intro').css('display','block')

			setTimeout(function() {
				$('#all-container').css('display','table')
				// $('#header').fadeIn();
			}, mobiletime);

			$('.fader').css('display','none')

			$('.steps').fadeOut();

			$('.resourcecontainer').fadeOut();

			$('.showscontainer').fadeOut();

			drawBG('images/intro_bg.jpg')

		}

		var buildAbout = function() {
			resetZoom()

			$('.resources').css('display','none')

			$('.timeline').css('display','none')

			$('.resources').css('display','table')

			$('.resourcewrapper').css('display','none')
			$('.showwrapper').css('display','none')
			$('.portraitwrapper').css('display','none')
			$('.aboutwrapper').css('display','table')

			$('#resource-menu').css('display','none')
			if (bowser.ios || bowser.android || mobile) {
				$('#about-menu').css('display','flex')
			}else{
				$('#about-menu').css('display','table-cell')
			}
			

			$('.text-bucket').css('display','none')


			$('.fader').css('display','none')

			
			$('.showscontainer').fadeOut();
			$('.resourcecontainer').fadeOut();
			$('.aboutcontainer').fadeIn();
			$('#about1').fadeIn();


			drawBG('images/resources_bg.jpg')

		}

		var buildResources = function() {

			resetZoom()


			$('.resources').css('display','none')

			$('.timeline').css('display','none')

			$('.resources').css('display','table')

			$('.resourcewrapper').css('display','table')
			$('.showwrapper').css('display','none')
			$('.portraitwrapper').css('display','none')
			$('.aboutwrapper').css('display','none')


			if (bowser.ios || bowser.android || mobile) {
				$('#resource-menu').css('display','flex')
			}else{
				$('#resource-menu').css('display','table-cell')
			}
			$('#about-menu').css('display','none')

			$('.text-bucket').css('display','none')


			$('.fader').css('display','none')

			
			$('.showscontainer').fadeOut();
			$('.aboutcontainer').fadeOut();
			$('.resourcecontainer').fadeIn();
			$('#step1').fadeIn();


			drawBG('images/resources_bg.jpg')

		}

		var buildShow = function() {

			resetZoom()

			$('.timeline').css('display','none')

			$('.portraitwrapper').css('display','none')
			$('.resourcewrapper').css('display','none')
			$('.aboutwrapper').css('display','none')
			$('.showwrapper').css('display','table')

			if (bowser.ios || bowser.android || mobile) {
				$('#show-menu').css('display','flex')
			}else{
				$('#show-menu').css('display','table-cell')
			}
			$('#about-menu').css('display','none')
			$('#resource-menu').css('display','none')

			$('.text-bucket').css('display','none')
			

			$('.fader').css('display','none')

			$('.resourcecontainer').fadeOut();
			$('.aboutcontainer').fadeOut();
			$('.showscontainer').fadeIn();
			$('#show1').fadeIn();

			drawBG('images/shows_bg.jpg')

		}

		$('#mosaic').children().click(function(){
			var index= $(this).index();
			$('#enlargedtile').addClass('changing')
			setTimeout(function() {
				$('#enlargedtile').css('display','block');
				$('#enlargedtile').attr('src','http://205.186.156.50/all-our-relations/cdn/assets/img/behind/'+index+'.jpg');
				$('#enlargedtile').removeClass('changing')
			}, 500);
			
		});
		


/////////EVENTS and LOCATION HASHES

		

		var AORloc = window.location.hash;



			if (AORloc) {

				$('#parchment-scrim').css('display','none')
				$('#all-container').css('display','block')
				$('#bg-video').css('display','none')
				$('#svg-container').css('display','block');


				switch (AORloc) {

					case "#timeline":
						$('.btn-timeline a').addClass('btn-active');
						$('#header').fadeIn();

						buildTimeline();
					break;

					case "#intro":
						$('.btn-intro a').addClass('btn-active');

						if($('#header').css('display') == 'none'){
							$('#header').fadeIn();
						}
						buildIntro();
					break;	

					case "#resource":
						$('.btn-resources a').addClass('btn-active');
						$('#header').fadeIn();
						buildResources();
					break;	

					case "#about":
						$('.btn-about a').addClass('btn-active');
						$('#header').fadeIn();
						buildAbout();
					break;	

					case "#shows":
						$('.btn-about a').addClass('btn-active');
						$('#header').fadeIn();
						buildShow();
					break;	

				}	

			} else {
				$('.btn-intro').addClass('btn-active')
				buildIntro()
				
			}

		$( "#contentPanel" ).hover (
		  function() {

		  	if ($('#contentPanel').height() > 600) {
		  		$('#contentPanel').addClass('tootall')
		  	}else{
		  		$('#contentPanel').removeClass('tootall')
		  	};

		  	$('#contentPanel').addClass('onhover')

		  	if($("#contentPanel:has(img)").length > 0){
		  	    $('.titleblock').slideUp();
				$('.titleblock').fadeOut();
		  	}

		  }, function() {


		  	$('#contentPanel').removeClass('tootall')

		    $('#contentPanel').removeClass('onhover')

		    if($("#contentPanel:has(img)").length > 0){
		        $('.titleblock').slideDown();
		    	$('.titleblock').fadeIn();
		    }

		  }
		);
		

		document.getElementById('bg-video').addEventListener('canplay',function(){
			//$('#bg-video').fadeIn(500)
		},false);

		document.getElementById('bg-video').addEventListener('ended',function(){
			$('#parchment-scrim').css('display','none')
			$('#bg-video').fadeOut(1500).delay(1500)
			$('#header').fadeIn().delay(1500);
		},false);

		$('.resource-btn').on('click',function(){

			var showcheck= $(this).parent().is("#show-menu");
			var aboutcheck= $(this).parent().is("#about-menu");

			var startCheck = {}
			$('.resource-btn').removeClass('btn-active')
			$(this).addClass('btn-active')

			if (!showcheck && !aboutcheck) {
				$('.resourcecontainer').fadeIn()

				startCheck = {
					1: function() {
						//step1
						
						$('.steps').fadeOut();
						$('#step1').fadeIn();
						
					},
					2: function() {
						//step2
						
						$('.steps').fadeOut();
						$('#step2').fadeIn();
						
					},
					3: function() {
						//chellenges
						
						$('.steps').fadeOut();
						$('#step3').fadeIn();
						
					},
					5: function() {
						//west
						
						$('.steps').fadeOut();
						$('#step4').fadeIn();

						drawBG('images/map/west.jpg')
						
					},
					6: function() {
						//central
						
						$('.steps').fadeOut();
						$('#step5').fadeIn();
						drawBG('images/map/central.jpg')
						
					},
					7: function() {
						//east
						$('.steps').fadeOut();
						$('#step6').fadeIn();
						drawBG('images/map/east.jpg')
						
					},
					8: function() {
						//north
						
						$('.steps').fadeOut();
						$('#step7').fadeIn();
						drawBG('images/map/north.jpg')
						
					}
								
				}
			}else if(aboutcheck && !showcheck){

				$('.aboutcontainer').fadeIn()

				startCheck = {
					0: function() {
						
						$('.aboutcat').fadeOut();
						$('#about1').fadeIn();
						
					},
					1: function() {
						
						$('.aboutcat').fadeOut();
						$('#about2').fadeIn();
						
					},
					2: function() {
						
						$('.aboutcat').fadeOut();
						$('#about3').fadeIn();
						
					},
					3: function() {
						
						$('.aboutcat').fadeOut();
						$('#about4').fadeIn();
						
					}
				}
			}else{

				$('.showcontainer').fadeIn()

				startCheck = {
					1: function() {
						
						$('.shows').fadeOut();
						$('#show1').fadeIn();
						
					},
					2: function() {
						
						$('.shows').fadeOut();
						$('#show2').fadeIn();
						
					},
					3: function() {
						
						$('.shows').fadeOut();
						$('#show3').fadeIn();
						
					},
					4: function() {
						
						$('.shows').fadeOut();
						$('#show4').fadeIn();
						
					},
					5: function() {
						
						$('.shows').fadeOut();
						$('#show5').fadeIn();
						
					},
					6: function() {
						
						$('.shows').fadeOut();
						$('#show6').fadeIn();
						
					}
				}

			}

			startCheck[ $(this).index() ]();

		})


		$('.portrait').on('click',function(){



			$('#fullscreen-background').fadeOut()
		
			clicked = null

			zoomMap(1.5,$(this).data('homeland'))

			loadTree($(this).data('subject'), this.getBoundingClientRect().top-20);


			$('.portrait').removeClass('active')

			$(this).addClass('active')

			$('.fader').fadeIn()

			$('.text-bucket').fadeOut()

			

			$('.content-bucket').fadeOut()
			setTimeout(function() {
				$('#all-container').css('display','block');
			}, 500);

		})

		$('#logo-main').on('click',function(){
			buildIntro()
		});

		$('#header li').on('click',function(){

			var _this = this

			clicked = null

			hasViewed = true

			$('.top-nuke').fadeOut()

			$('#all-container').fadeOut(function(){

			switch ($(_this).data('action')) {
				case "timeline":
					buildTimeline()
				break;
				case "resources":
					buildResources()
				break;
				case "shows":
					buildShow()
				break;
				case "about":
					buildAbout()
				break;															
			}	
					
			})

			$('#header li a').removeClass('btn-active')
			$($(this).children()).addClass('btn-active')

		})		
	var i = 0,
	    duration = 650,
	    root,rootCache;

	var tree = d3.layout.tree()
	    .size([height/3, width])


	var diagonal = d3.svg.diagonal()
	    .projection(function(d) { return [d.y, d.x]; });

	var svg = d3.select("#svg-container").append("svg")
	    .attr("width", width + margin.right + margin.left)
	    .attr("height", height + margin.top + margin.bottom)
	    .classed('fader',true)
	    .classed('just-svg',true)
	    .classed('timeline',true)
	  	.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


 var loadTree = function(_subject,startX, noTimeline){

	d3.json("data/"+_subject+".json", function(error, flare) {
	  	root = flare;
	  	rootCache = flare;
	  	root.x0 = startX-100 ;
	  	root.y0 = -180;
	  	var treePos = 0
	  	//collapse

	  	clicked = root.name

	  	

	  	if(root.page) {
	  		loadPartial(root.page)
	  	}


		var defs = svg.append("defs");
		var filter = defs.append("filter")
		    .attr("id", "drop-shadow")
		    .attr("height", "200%");
		filter.append("feGaussianBlur")
		    .attr("in", "SourceAlpha")
		    .attr("stdDeviation", 2)
		    .attr("result", "blur");
		filter.append("feOffset")
		    .attr("in", "blur")
		    .attr("dx", 5)
		    .attr("dy", 5)
		    .attr("result", "offsetBlur");

		var feMerge = filter.append("feMerge");

		feMerge.append("feMergeNode")
		    .attr("in", "offsetBlur")
		feMerge.append("feMergeNode")
		    .attr("in", "SourceGraphic");
	  
		function collapse(d) {
			d.storage=[]; 
			if (d.children) {
				d._children = d.children;
				d._children.forEach(collapse);
				d.children = null;
			}
		}

	  	root.children.forEach(collapse);

	  	root.storage = []

	  	//collapse(root)

	  	update(root);

	});

	d3.select(self.frameElement).style("height", "380px");
	// d3.select(self.frameElement).style("height", "1000px");


	function update(source) {

	  // Compute the new tree layout.
	  var nodes = tree.nodes(root).reverse(),
	      links = tree.links(nodes);
	  
		nodes.forEach(function(d) {

			var spacer =   6


			d.y = d.depth * width/8 + spacer *.5; 

			if(d.depth == 0) {
				d.x = startX + 20
				d.y = -90 
			}else{
				if(d.depth%2 == 0){
					d.x = d.x + 30
			} 

			}
		});

		nodes.forEach(function(d) {d.x = d.x });
	  // Update the nodes…
	  	var node = svg.selectAll("g.node")
	      .data(nodes, function(d) { return d.id || (d.id = ++i); });

	  // Enter any new nodes at the parent's previous position.

	  	var nodeEnter = node.enter().append("g")
	      .attr("class", "node")
	      .attr("transform", function(d) { return "translate(" + source.y0  + "," + source.x0 + ")"; })
	      .on("click", click);

	  	nodeEnter.append("rect")
	  	      .attr("width", 360)
	  	      .attr("height", 30)
	      	  .style("fill", 'none')


		nodeEnter.append("text")
		  	.attr('class','title')
		  	.style('font-size','16px')
	      	.text(function(d) { 
	
	      		return d.name 

	      	})
			.style("fill-opacity", function(d){
				d.computedWidth = this.getComputedTextLength() + 20
				return 1e-6
			})	      	
			.attr("x", function(d) { 
	      		return 	-30
	      	})
			.attr("dy", function(d) { 
				return 	-5	
			})


		nodeEnter.append("text")
		  	.attr('class','date')
	      	.attr("x", 0)
	      	.attr("dy", 15)	      
			.text(function(d) { 
				if(d.dob && d.dod){
					return "b: " + d.dob  + ", d: " +  d.dod
				}else if(d.dob && !d.dod){
					return "b: " + d.dob 
				}else if(!d.dob && d.dod){
					return "d: " + d.dod 
				}
			      	return ""
			})
	      	.style("fill-opacity", 1e-6)

	  	// Transition nodes to their new position.
	  	var nodeUpdate = node.transition()
	      .duration(duration)
	      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });


		nodeUpdate.select("rect")
			.attr("width", function(d){
				return d.computedWidth
			})
			.attr("height", 50)
			.attr('y', -30)
			.attr('x', -10)
			.style("fill", function(d) {
				//if(d.name==clicked) return '#af040a'
			  	return "rgba(255,255,255,.9)"; 
			 })
			.style("filter", "url(#drop-shadow)")

		nodeUpdate.select(".date")
		  	.style("fill-opacity", 1)
		  	.style("fill", "#7a7a7a")
		  	.style('font-size','12px')

		nodeUpdate.select(".plus")
		  	.style("fill-opacity", function(d){
		  		if (d.name == clicked) return 1
		  			return 0
		  	})
		nodeUpdate.select(".title")
			.attr('x', 0)	  
		  	.style("fill-opacity", 1)
		  	.style("fill", function(d) {
				if (d.name == clicked ) return '#eb8823'
		  		return "#7a7a7a"

		  	})
		  	//.style("filter", "url(#drop-shadow)")

	  var nodeExit = node.exit().transition()
	      	.duration(duration)
	      	.attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	      	.remove();

	  nodeExit.select("rect")
	      .style("fill-opacity", 0);

	  nodeExit.select("text")
	      .style("fill-opacity", 0);

	  // Update the links…
	  var link = svg.selectAll("path.link")
	      .data(links, function(d) { return d.target.id; });



	  link.enter().insert("path", "g")
	      .attr("class", "link")
	      .attr("stroke", function(d){
			if(d.target.gender =="f") return "#27709d"
			return "black"
	      })
	      .attr("d", function(d) {      	
	        var o = {x: source.x0, y: source.y0};
	        return diagonal({source: o, target: o});
	      });

	  // Transition links to their new position.
	  link.transition()
	      .duration(duration)
	      .attr("d", diagonal);

	  // Transition exiting nodes to the parent's new position.
	  link.exit().transition()
	      .duration(duration)
	      .attr("d", function(d) {
	        var o = {x: source.x, y: source.y};
	        return diagonal({source: o, target: o});
	      })
	      .remove();

	  // Stash the old positions for transition.
	  nodes.forEach(function(d) {
	    d.x0 = d.x;
	    d.y0 = d.y;
	  });
	}

var childToggle = function(d){

	  if (d.children) {

	    d._children = d.children;
	    if(d.storage.length>0) d._children = d.storage
	    //d.storage = []
	    d.children = null;
	  } else {
	    d.children = d._children;
	    if(d.storage.length>0) d.children = d.storage
	    //d._children = [];
	    
	  }
	

}

var recursiveClose = function(d){
	
		d.isBranch = null

	  if (d.children) {
	    d._children = d.children;
	    d.children = null;
	    d._children.forEach(function(e){
	    	recursiveClose(e)
	    })	
	  } 

}
	// Toggle children on click.
	var childCounter = 0

Array.prototype.uniqueObjects = function(){
    function compare(a, b){
        for(var prop in a){
            if(a[prop] != b[prop]){
                return false;
            }
        }
        return true;
    }
    return this.filter(function(item, index, list){
        for(var i=0; i<index;i++){
            if(compare(item,list[i])){
                return false;
            }
        }
        return true;
    });
}

	function click(d) {


		if(d.page) {

			loadPartial(d.page)
			$('.ancestor').fadeIn()
			$('.bottom-shelf').css("bottom", -120)

			if(d.bg) {

				var bgImage = new Image()

				bgImage.onload = function(){

					$('#fullscreen-background').fadeIn()

					$('#fullscreen-background img')[0].src= bgImage.src

				}
				bgImage.src=d.bg

			} 
				
			//return
		}


		var storageTrigger = ""

		var temp = d.storage		

		d.storage = temp.uniqueObjects();
		
		recursiveClose(d)
	
		childToggle(d)

		clicked = d.name

		d.isBranch = true
			  	
	  	if(d.parent && d._children){

			if(d.parent.children){

		  		d.parent.children.forEach(function (_d,i){

		  			if(d.parent.storage && storageTrigger.indexOf(_d.name) === -1) {
		  				d.parent.storage.push(_d)
		  				
		  			}
		  			storageTrigger += _d.name 
		  		})

		  		d.parent.children.forEach(function (_d,i){
		  			if(!_d.isBranch) {

		  			    d.parent.children.splice(i,1)
		  			}
		  		})
	  		}
	  	}

		childCounter = 0

	  
	  	update(d);
	}

	}
	var introtimer ;

	// mobile ? introtimer = 500 : introtimer = 0; 
	if (mobile) {
		introtimer = 500;
	}else{
		introtimer = 0;
	}

	setTimeout(function() {
		$('.intro').addClass('active')
	},mobile);
})