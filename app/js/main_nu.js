$(function(){

	var canPlayVid = false;
	console.log(canPlayVid)
	var v = document.createElement('video');
	if(v.canPlayType && v.canPlayType('video/mp4').replace(/no/, '')) {
	    canPlayVid = true;
	}
	console.log(canPlayVid)

	// if(!canPlayVid){
	// 	alert('hello')
	// 	$('#bg-video').attr("src", "assets/video/aor4.webm"​​​​)​
	// }
	// $('#bg-video')[0].attr("src", "assets/video/aor4.webm"​​​​)​

	// alert(canPlayVid);
	

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

			console.log(loc)
			
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
			console.log(overlayImg.height)

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

			console.log(cw)

			var startDraw = window.innerWidth/4 * counter

			ctx.clearRect(0,0,canvas.width,canvas.height)
			

			//ctx.drawImage(overlay,0,0,cw,cw * multix, startDraw,window.innerWidth/4,0,window.innerHeight);
			//ctx.drawImage(overlay,0,0,cw,cw * multix);

			ctx.drawImage(overlay,0,0);	
			ctx.globalCompositeOperation ="darker";
			//ctx.drawImage(parchment,0,0,canvas.width,canvas.height);

			if(hasViewed){$('#all-container').fadeIn()}

			

			counter ++
		}

		
	
}
					

		drawBG('images/title_page.jpg')

		var loadPartial = function(_partial) {


			$( "#contentPanel" ).fadeOut(1000,function(){

				$( "#contentPanel" ).html('')

				$( "#contentPanel" ).load( "partials/" + _partial +".html", function( response, status, xhr ) {

			  		if ( status == "error" ) {
			    		var msg = "Sorry but there was an error: ";
			    		$('#contentPanel').html( msg + xhr.status + " " + xhr.statusText );
			  		}

		  			$('#contentPanel').prepend('<div class="exitbtn">X</div>');
		  		
			  		$('.exitbtn').on('click',function(){

						$('.fader').fadeIn()

						$('.text-bucket').fadeOut()

						$('.content-bucket').fadeOut()

			  		})
			  	$( "#contentPanel" ).fadeIn()
			});			
			})
		}	

		var buildTimeline = function() {


			$('.text-bucket').css('display','none')

			$('.timeline').css('display','table')

			$('.showwrapper').css('display','none')

			$('.resourcewrapper').css('display','none')

			$('.portraitwrapper').css('display','table')

			$('#portrait-gallery').css('display','table-cell')

			$('.resources').css('display','none')
			

			$('.fader').css('display','none')
			$('.steps').fadeOut();

			$('.resourcecontainer').fadeOut();

			$('.showscontainer').fadeOut();

			drawBG('images/main_map_pan.jpg')

		}

		var buildIntro = function() {

			resetZoom()


			if(!hasViewed){
				if (canPlayVid===false) {
					console.log('HEYHEY')
					$('#bg-video')[0].src="assets/video/aor4.webm"
					$('#bg-video')[0].play();
				}else{
					console.log('HEYHEY')
					$('#bg-video')[0].src="assets/video/aor4.mp4"
				};
				
				$('all-container').css('display','none')
				hasViewed = true
			}

			

			$('.timeline').css('display','none')

			$('.portraitwrapper').css('display','none')

			$('.showwrapper').css('display','none')

			$('.resourcewrapper').css('display','none')

			$('.side-menu').css('display','none')

			$('.resources').css('display','none')

			$('.text-bucket').css('display','none')

			$('.content-bucket').css('display','none')


			$('.intro').css('display','table')

			$('.fader').css('display','none')

			$('.steps').fadeOut();

			$('.resourcecontainer').fadeOut();

			$('.showscontainer').fadeOut();

			drawBG('images/intro_bg.jpg')

		}

		var buildAbout = function() {
			console.log('ABOUTABOUTABOut222')
			resetZoom()

			$('.resources').css('display','none')

			$('.timeline').css('display','none')

			$('.resources').css('display','table')

			$('.resourcewrapper').css('display','none')
			$('.showwrapper').css('display','none')
			$('.portraitwrapper').css('display','none')
			$('.aboutwrapper').css('display','table')

			$('#resource-menu').css('display','none')
			$('#about-menu').css('display','table-cell')

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

			$('#resource-menu').css('display','table-cell')
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

			$('#show-menu').css('display','table-cell')
			$('#about-menu').css('display','none')
			$('#resource-menu').css('display','none')

			$('.text-bucket').css('display','none')
			

			$('.fader').css('display','none')

			// $('.shows').fadeOut();
			// $('#shows1').fadeIn();

			$('.resourcecontainer').fadeOut();
			$('.aboutcontainer').fadeOut();
			$('.showscontainer').fadeIn();
			$('#show1').fadeIn();
			// $('.showwrapper').fadeIn();

			drawBG('images/shows_bg.jpg')

		}

		var Milestones = {
			"Nunavut Act":1999, 
			"Oka Land Dispute":1990,
			"Indian Act Revisions (end)":1985,
			"Meech Lake Accord ":1982,

			"Native Right to Vote ":1960,
			"Indian Act Revisions (start))":1951,		
			"Land Numbered Treaty (end)":1921,
			"Riel Uprising ":1885,
			"Land Numbered Treaty (start)":1871,
			"Confederation & British North America Acts":1867
		}

		var milestoneWidth = window.innerWidth//$('#milestones')[0].getBoundingClientRect().width

		var d = new Date()

		var thisyear = d.getFullYear()

		var spanMultix = milestoneWidth / (thisyear - 1815)

		var counter = 0

		var marker = '<div id="milestone-marker" style="position:absolute;background:#af040a;width:0px;left:0px;height:60px;-webkit-transition: all 2s; transition: all 2s;"></div>'

		$('#mosaic').children().click(function(){
			var index= $(this).index();
			$('#enlargedtile').addClass('changing')
			setTimeout(function() {
				$('#enlargedtile').css('display','block');
				$('#enlargedtile').attr('src','http://205.186.156.50/all-our-relations/cdn/assets/img/behind/'+index+'.jpg');
				$('#enlargedtile').removeClass('changing')
			}, 500);
			
		});
		
		$('#milestones').append(marker)
		$.each(Milestones,function(k,v){

			 var vOffSet = 0
			 var yearOffset = 0

			 var ticker =  counter % 3

			if(ticker === 0){
				vOffSet = 2
				yearOffset = 65
			}
			if(ticker === 1){
				vOffSet = 22
				yearOffset = 80
			}
			if(ticker === 2){
				vOffSet = 42
				yearOffset = 80
			}
	
			var html = '<div class="milestone-edge" style="bottom:' + vOffSet + 'px;left:' + spanMultix* (thisyear - v) + 'px"></div>'
			html +='<div class="milestone" style="bottom:' + vOffSet + 'px;left:' + spanMultix* (thisyear - v) + 'px">' + k +'</div>'
			html += '<div class="milestone-year" style="bottom:' + yearOffset   + 'px;left:' + spanMultix* (thisyear - v) + 'px">' + v +'</div>'
			$('#milestones').append(html)
			counter++
		})

/////////EVENTS and LOCATION HASHES

		var AORloc = window.location.hash;

		if (AORloc) {
			switch (AORloc) {

				case "#timeline":
				$('.btn-timeline').addClass('btn-active')
				buildTimeline()
				break;

				case "#intro":
				$('.btn-intro').addClass('btn-active')

				buildIntro()
				break;	

				case "#resource":
				$('.btn-resources').addClass('btn-active')
				buildResources()
				break;	

				case "#about":
				$('.btn-about').addClass('btn-active')
				buildAbout()
				break;	

			}	

		} else {
			$('.btn-intro').addClass('btn-active')
			buildIntro()
		}


		$( "#contentPanel" ).hover(
		  function() {
		  	$('.titleblock').slideUp();
		  	$('.titleblock').fadeOut();
		    // $('.titleblock').addClass('active')
		  }, function() {
		    // $('.titleblock').removeClass('active')
		    $('.titleblock').slideDown();
		    $('.titleblock').fadeIn();
		  }
		);

		document.getElementById('bg-video').addEventListener('canplay',function(){
			//$('#bg-video').fadeIn(500)
		},false);

		document.getElementById('bg-video').addEventListener('ended',function(){
			$('#parchment-scrim').css('display','none')
			$('#bg-video').fadeOut(1500).delay(1500)
		},false);

		$('.resource-btn').on('click',function(){

			var showcheck= $(this).parent().is("#show-menu");
			var aboutcheck= $(this).parent().is("#about-menu");
			// console.log(check)

			var startCheck = {}
			$('.resource-btn').removeClass('btn-active')
			$(this).addClass('btn-active')

			if (!showcheck && !aboutcheck) {
				$('.resourcecontainer').fadeIn()

				startCheck = {
					0: function() {
						//step1
						
						$('.steps').fadeOut();
						$('#step1').fadeIn();
						
					},
					1: function() {
						//step2
						
						$('.steps').fadeOut();
						$('#step2').fadeIn();
						
					},
					2: function() {
						//step3
						
						$('.steps').fadeOut();
						$('#step3').fadeIn();
						
					},
					3: function() {
						//step4
						
						$('.steps').fadeOut();
						$('#step4').fadeIn();
						
					},
					4: function() {
						//step4
						
						$('.steps').fadeOut();
						$('#step4').fadeIn();
						
					},
					5: function() {
						//step4
						
						$('.steps').fadeOut();
						$('#step5').fadeIn();
						
					},
					6: function() {
						//step4
						
						$('.steps').fadeOut();
						$('#step6').fadeIn();
						
					},
					7: function() {
						//step4
						
						$('.steps').fadeOut();
						$('#step7').fadeIn();
						
					}
								
				}
			}else if(aboutcheck && !showcheck){

				$('.aboutcontainer').fadeIn()

				console.log('ABOUTBAOUT')

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

				// console.log($(this).index())

				startCheck = {
					0: function() {
						
						$('.shows').fadeOut();
						$('#show1').fadeIn();
						
					},
					1: function() {
						
						$('.shows').fadeOut();
						$('#show2').fadeIn();
						
					},
					2: function() {
						
						$('.shows').fadeOut();
						$('#show3').fadeIn();
						
					},
					3: function() {
						
						$('.shows').fadeOut();
						$('#show4').fadeIn();
						
					},
					4: function() {
						
						$('.shows').fadeOut();
						$('#show5').fadeIn();
						
					},
					5: function() {
						
						$('.shows').fadeOut();
						$('#show6').fadeIn();
						
					}
				}

			}
			// console.log(startCheck)
			


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

		})

		$('#header li').on('click',function(){

			var _this = this
			clicked = null

			$('.top-nuke').fadeOut()

			$('#all-container').fadeOut(function(){
			switch ($(_this).data('action')) {
				case "timeline":
					buildTimeline()
				break;
				case "intro":
					buildIntro()
				break;
				case "resources":
					buildResources()
				break;
				case "shows":
					buildShow()
				break;
				case "about":
					console.log('ABOUTABOUTABOut')
					buildAbout()
				break;															
			}	
					
			})

			$('#header li').removeClass('btn-active')
			$(this).addClass('btn-active')

		})		
	var i = 0,
	    duration = 650,
	    root,rootCache;

	var tree = d3.layout.tree()
	    .size([height/3, width])


	var diagonal = d3.svg.diagonal()
	    .projection(function(d) { return [d.y, d.x]; });

	// var diagonal = d3.svg.line().interpolation("step")
 //        .x(function(d) { return d.y; })
 //    	.y(function(d) { return d.x; });

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
	  		console.log(root.page)
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

	function update(source) {

	  // Compute the new tree layout.
	  var nodes = tree.nodes(root).reverse(),
	      links = tree.links(nodes);
	  
		nodes.forEach(function(d) {
			var spacer =   6


			d.y = d.depth * width/8 + spacer *.5; 
			if(d.depth == 0) {
				d.x = startX
				d.y = -90
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
		  	.style('font-size','20px')
	      	.text(function(d) { return d.name })
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
				if(d.dob && d.dod){return "b: " + d.dob  + ", d: " +  d.dod}
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
			.attr('x', -5)
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
	  	//console.log("_children" + d.name)
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
			//$('.fader').fadeOut(1000)
			$('.ancestor').fadeIn()
			$('.bottom-shelf').css("bottom", -120)

			if(d.bg) {

				console.log(d.bg)
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

		

		var left = (thisyear-d.dod)*spanMultix
		var right = (thisyear-d.dob)*spanMultix

		$('#milestone-marker').css('left',left + 'px')
		$('#milestone-marker').css('width', right - left + 'px')

		var temp = d.storage		

		d.storage = temp.uniqueObjects();
		
		recursiveClose(d)
	
		childToggle(d)

		clicked = d.name

		d.isBranch = true
			  	
	  	if(d.parent && d._children){

			if(d.parent.children){

		  		d.parent.children.forEach(function (_d,i){

		  			console.log(_d)

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

	  //URL//
	  if(d.page && !window.parent){
	  	//window.parent.location = "/all-our-relations/app/#/"+d.page
	  	// console.log(d.page)
	  }else{
	  	// alert('disabled for prototype');
	  }
	  
	  	update(d);

  
	}

	}

	setTimeout(function() {
		$('.intro').addClass('active')
	},500);
})
