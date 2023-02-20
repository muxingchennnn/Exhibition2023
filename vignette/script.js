var width = document.querySelector("#chart").clientWidth;
var height = document.querySelector("#chart").clientHeight;
var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

console.log(width, height)

d3.csv("../data/project_keywords - V1.csv").then(function (linkValues) {

    let nodes = [];
    let links = [];

    const uniqueNames = [...new Set(linkValues.map(item => item.name))];
    const uniqueKeys = [...new Set(linkValues.map(item => item.keyword))];
    const nodeValues = [...new Set(uniqueNames.concat(uniqueKeys))];

    console.log(linkValues);
    console.log(uniqueNames.concat(uniqueKeys))
    console.log([...new Set(uniqueNames.concat(uniqueKeys))])

    for (let n in nodeValues) {
        nodes.push({"id": +n,
                  "name": nodeValues[n]})
    }

    for (let i = 0; i < linkValues.length; i++) {
        let t = nodes.find(d => d.name === linkValues[i].name);
        let s = nodes.find(d => d.name === linkValues[i].keyword);
        links.push({"target": t.id, "source": s.id})
    }

    let data = {"nodes": nodes, "links": links};

    console.log(data)
    /* 
    MAKE SOME SCALES
    */

    // let allZones = data.nodes.map(function(d) {
    //     return d.zone;
    // });

    // const uniqueZones = [...new Set(allZones)];
    // uniqueZones.sort((a, b) => a - b);

    // const influenceXtnt = d3.extent(data.nodes, function(d) {
    //     return d.influence;
    // });

    // const weightXtnt = d3.extent(data.links, function(d) {
    //     return d.weight;
    // });

    // let colorScale = d3.scaleOrdinal()
    //     .domain(uniqueZones)
    //     .range(["#383867", "#33431e", "#a36629", "#92462f", "#b63e36", "#b74a70", "#946943"]);

    // let sizeScale = d3.scaleLinear()
    //     .domain(influenceXtnt)
    //     .range([1, 10]);

    // let strokeScale = d3.scaleLinear()
    //     .domain(weightXtnt)
    //     .range([1, 10]);

    // /* 
    // INITIALIZE FORCE SIMULATION 
    // Find a layout that you like by tweaking the parameters. 
    // For a useful tool, see:
    // https://bl.ocks.org/steveharoz/8c3e2524079a8c440df60c1ab72b5d03
    // */
    var simulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink(data.links).id(function (d) { return d.id; }).distance(10).strength(2))
        // .force('y', d3.forceY().y(function (d) {
        //     return height/2;
        // }).strength(3))
        .force("charge", d3.forceManyBody().strength(-20))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide().radius(15));

    // /* DRAW THE LINES FOR LINKS */
    var link = svg.append("g")
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .attr("stroke", "#FFFFFF")
        // .attr("stroke-width", function(d) {return strokeScale(d.weight); });

    // /* 
    // DRAW THE CIRCLES FOR THE NODES
    // Why do we draw these after the links?
    // */
    var node = svg.append("g")
        .selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("circle")
        // .attr("stroke", "#fff")
        // .attr("stroke-width", 0.5)
        // .attr("fill", function(d) { return colorScale(d.zone); })
        // .attr("r", function(d) { return sizeScale(d.influence); })
        .attr("r", 5)
        .attr("stroke", "grey")
        .attr("stroke-width", 2);

    // /* 
    // TICK THE SIMULATION 
    // Each time the simulation iterates ("ticks"), we will
    // update the positions of the nodes (circles) and links (lines)
    // in the network
    // */

    simulation.on("tick", function () {
        link.attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; })

            // .attr("stroke-width", function(d) {return strokeScale(d.weight); });

        node
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; })
            // .attr("fill", function(d) { return colorScale(d.zone); })
            // .attr("r", function(d) { return sizeScale(d.influence); })
            // .attr("stroke", "grey");
    });

    // /* ADD A TOOLTIP */
    // var tooltip = d3.select("#chart")
    //     .append("div")
    //     .attr("class", "tooltip");

    // node.on("mouseover", function (e, d) {
    //     var cx = d.x + 20;
    //     var cy = d.y - 10;
    //     // console.log(d)

    //     tooltip.style("visibility", "visible")
    //         .style("left", cx + "px")
    //         .style("top", cy + "px")
    //         .html(`Character: ${d.character}<br> Zone: ${d.zone}`);

    // }).on("mouseout", function () {
    //     tooltip.style("visibility", "hidden");
    // });

    // svg.append("text")
    // .attr("x", 25)
    // .attr("y", 25)
    // .text("Character zone")
})
