$(function(){

	var margin = {top: 0, right: 0, bottom: 0, left: 100},
	    width = window.innerWidth,
	    iconHeight= 90
	    height = window.innerHeight;
	    var clicked

	    var canvas = document.getElementById('background')
	    var underCanvas = document.getElementById('under-background')

	    var baseHeight,baseWidth, ratio

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

	    	baseHeight=window.innerWidth
	    	baseWidth = overlayImg.height * stepDown

	    	$('#background').css('width',window.innerWidth)
			$('#background').css('height',overlayImg.height * stepDown)
		   	

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

				$('#all-container').fadeIn()

				counter ++


		}
	
}
					

		drawBG('images/title_page.jpg')


		var buildTimeline = function() {
			$('.text-bucket').css('display','none')
			$('.timeline').css('display','block')
			

			$('.fader').css('display','none')

			drawBG('images/main_map_pan.jpg')

		}

		var buildIntro = function() {

			resetZoom()

			$('.timeline').css('display','none')

			$('.text-bucket').css('display','none')
			$('.intro').css('display','block')

			$('.fader').css('display','none')

			drawBG('images/intro_bg.jpg')

		}

		var buildResources = function() {

			resetZoom()

			$('.timeline').css('display','none')

			$('.text-bucket').css('display','none')

			$('.resources').css('display','block')

			$('.fader').css('display','none')

			drawBG('images/central_NA.jpg')

		}

		var buildShow = function() {

			resetZoom()

			$('.timeline').css('display','none')

			$('.text-bucket').css('display','none')
			
			//$('.intro').css('display','block')

			$('.fader').css('display','none')

			drawBG('images/shows.jpg')

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
			}	

		} else {
			$('.btn-intro').addClass('btn-active')
			buildIntro()
		}


		$('.portrait').on('click',function(){

			

			

			if(!clicked || $(this).css('opacity') < 1){

				clicked = null

				//$(this).data('homeland')

				zoomMap(1.5,$(this).data('homeland'))
				loadTree($(this).data('subject'), this.getBoundingClientRect().top);

			}
			$('.portrait').css('opacity',.5)

			$(this).css('opacity',1)

			$('.fader').fadeIn()

			$('.text-bucket').fadeOut()

		})

		$('#header li').on('click',function(){

			var _this = this

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
			}	
					
			})



			$('#header li').removeClass('btn-active')
			$(this).addClass('btn-active')

		})		
	var i = 0,
	    duration = 650,
	    root,rootCache;

	var tree = d3.layout.tree()
	    .size([height, width])


	var diagonal = d3.svg.diagonal()
	    .projection(function(d) { return [d.y, d.x]; });

	// var diagonal = d3.svg.line().interpolation("step")
 //        .x(function(d) { return d.y; })
 //    	.y(function(d) { return d.x; });

	var svg = d3.select("#all-container").append("svg")
	    .attr("width", width + margin.right + margin.left)
	    .attr("height", height + margin.top + margin.bottom)
	    .classed('fader',true)
	    .classed('timeline',true)
	  	.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


 var loadTree = function(_subject,startX){
	d3.json("data/"+_subject+"_family-tree.json", function(error, flare) {
	  	root = flare;
	  	rootCache = flare;
	  	root.x0 = startX-100 ;
	  	root.y0 = -180;


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
	  collapse(root)
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





		// nodeEnter.append("text")
		//   	.attr('class','plus')
	 //      	.attr("x", 130)
	 //      	.attr("y", 28)  
	 //      	.text("+")
	 //      	.style("fill-opacity", 1e-6)
	 //      	.style("fill", "af040a")
		//   	.style('font-size','70px')
		//   	.style("filter", "url(#drop-shadow)")

		nodeEnter.append("text")
		  	.attr('class','date')
	      	.attr("x", 0)
	      	.attr("dy", 15)	      
			.text(function(d) { 
				if(d.dob && d.dod){return "b: " + d.dob  + ", d: " +  d.dod}
			      	return "n/a"
			})
	      	.style("fill-opacity", 1e-6)

	  	nodeEnter.append("image")
	  		.attr('class','img')
	      	.attr("xlink:href", "images/document.png")
	      	.attr("y", -45)
	      	.attr("x", function(d){
	      		return d.computedWidth
	      	})

	      	.attr("width", 0)
      		.attr("height", 0)



	  	// Transition nodes to their new position.
	  	var nodeUpdate = node.transition()
	      .duration(duration)
	      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

		nodeUpdate.select("image")
	      	.attr("width", function(d){ 
	      		console.log(d.name)
	      		if (d.name==clicked) {
	      			return 25; 
	      		}
	      			
	      		//return 0
	      	})
      		.attr("height", function(d){ 
      			if (d.name==clicked) return 25; 
      			//return 0
      		})
      		.style("filter", "url(#drop-shadow)")

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

		if(clicked == d.name) {

			$('.fader').fadeOut(1000)
			$('.ancestor').fadeIn()
			$('.bottom-shelf').css("bottom", -120)
				
				console.log(d.page)

			return
		}


		var storageTrigger = ""

		clicked = d.name

		var left = (thisyear-d.dod)*spanMultix
		var right = (thisyear-d.dob)*spanMultix

		$('#milestone-marker').css('left',left + 'px')
		$('#milestone-marker').css('width', right - left + 'px')

		var temp = d.storage		

		d.storage = temp.uniqueObjects();


		recursiveClose(d)

		childToggle(d)

		d.isBranch = true
			  	
	  	if(d.parent){
			if(d.parent.children){

		  		d.parent.children.forEach(function (_d,i){

		  			if(storageTrigger.indexOf(_d.name) === -1) {
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
	  	window.parent.location = "/all-our-relations/app/#/"+d.page
	  	// console.log(d.page)
	  }else{
	  	// alert('disabled for prototype');
	  }
	  
	  	update(d);

  
	}

	}
})
