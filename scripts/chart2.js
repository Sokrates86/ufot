

// Margins
//
var margin2 = {top: 50, right: 70, bottom: 50, left: 50},
    width2 = 850 - margin2.left - margin2.right,
    height2 = 2000 - margin2.top - margin2.bottom;

var svg2 = d3.select(".chart2")
	.append("svg")
	.attr("height", height2)
	.attr("width", width2)
	.append("g")
	.attr("transform", "translate(40,0)")

var x2 = d3.scaleLinear()
    .rangeRound([100, width-margin.right-170])

var y2 = d3.scaleLinear()
    .rangeRound([height, 50])




var simulation2 = d3.forceSimulation()
	.force("x", d3.forceX(function(d) { return x2(d.placingX)}).strength(forceStrength))
	.force("y", d3.forceY(function(d) { return y2(d.placingY)}).strength(forceStrength))
	.force("collide", d3.forceCollide(4));


d3.queue()
	.defer(d3.tsv, "data/ufotietokanta22122016.tsv")
	.await(ready2)


function ready2 (error, data2) {

	data2.forEach(function(d) { 
		d.pvm = parseDate(d["Päivämäärä"]),
		d.paikka = d["Kunta tai kaupunki"],
		d.year = d.pvm.getFullYear(),
		d.month = d.pvm.getMonth(),
		d.placingX = d.month % 5,
		d.placingY = Math.floor(d.month / 5);
	})

	console.log(data2)

	datasee = data2;

	y2.domain([15, 0]);
	x2.domain([0, 3]);

	var fillColor2 = function(d) {
		if(d["Valoisuus"] == "kirkas päivänvalo") {
			return yesColor;
		} else if (d["Valoisuus"] == "auringonlasku_tai_nousu") {
			return "#059451";	
		} else if (d["Valoisuus"] == "hämärä") {
				return "#BE3AF9";
		} else {
				return "#7505a8";
			}
	}



	var circles2 = svg2.selectAll(".havainnot2")
		.data(data2)
		.enter().append("circle")
		.attr("class", "havainnot2")
		.attr("r", 3)
		.attr("fill", fillColor2)
        .on("dblclick", dblclick);


	simulation2.nodes(data2)
		.on("tick", ticked)

	circles2.on("click", function(d) {
		console.log(d);
	})



	//Update colors based on filter selection
	function updateColors() {
		circles2.attr("fill", fillColor)
	}



	function ticked() {
		circles2
			.attr("cx", function(d) {
				return d.x;
			})
			.attr("cy", function(d) {
				return d.y;
			})
	}

	function dblclick(a){
    	window.open(a.URL, '_blank');
 	}

}