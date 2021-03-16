var width = 961,
    height = 300;

var cluster = d3.layout.tree()
    .size([width, height]);

var diagonal = d3.svg.diagonal()
    .projection(function (d) {
        return [d.x, d.y];
    });

var svgT = d3.select("#Tree").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("transform", "translate(" + -30 + "," + 5 + ")");
var tooltip = d3.select("#Tree").append("div")
    .attr("class", "tooltip")
    .attr("opacity", 0.0)

var root = {
    "name": "志愿者",
    "number": 300,
    "color": "#00aeff",
    "children": [{
            "name": "收入",
            "number": 31,
            "color": "#f76f8e",
            "type": "True",
            "children": [{
                    "name": "收入",
                    "number": 20,
                    "color": "#f76f8e",
                    "type": "High",
                    "children": [{
                            "name": "gain",
                            "number": 6,
                            "color": "#DC143C",
                            "type": "High"
                        },
                        {
                            "name": "loss",
                            "number": 14,
                            "color": "#00FF00",
                            "type": "Low"
                        }
                    ]
                },
                {
                    "name": "拖延症",
                    "number": 11,
                    "color": "#484d6d",
                    "type": "Low",
                    "children": [{
                            "name": "gain",
                            "number": 4,
                            "color": "#DC143C",
                            "type": "High"
                        },
                        {
                            "name": "loss",
                            "number": 7,
                            "color": "#00FF00",
                            "type": "Low"
                        }
                    ]
                }
            ]
        },
        {
            "name": "收入",
            "number": 269,
            "color": "#f76f8e",
            "type": "False",
            "children": [{
                    "name": "拖延症",
                    "number": 59,
                    "color": "#484d6d",
                    "type": "High",
                    "children": [{
                            "name": "loss",
                            "number": 48,
                            "color": "#00FF00",
                            "type": "High"
                        },
                        {
                            "name": "loss",
                            "color": "#00FF00",
                            "number": 11,
                            "type": "Low"
                        }
                    ]
                },
                {
                    "name": "拖延症",
                    "number": 210,
                    "color": "#484d6d",
                    "type": "Low",
                    "children": [{
                            "name": "loss",
                            "number": 157,
                            "color": "#00FF00",
                            "type": "High"
                        },
                        {
                            "name": "gain",
                            "number": 53,
                            "color": "#DC143C",
                            "type": "Low"
                        }
                    ]
                }
            ]
        }
    ]
}

var max = 300;
var min = 4;

var linear = d3.scale.linear()
    .domain([min, max])
    .range([3, 15])

var Line_linear = d3.scale.linear()
    .domain([1, 100])
    .range([3, 12])

var i = 0;

var nodes = cluster.nodes(root).reverse();

nodes.forEach(function (d) {
    d.y = d.depth * 90;
});

var links = cluster.links(nodes);

var linkEnter = svgT.selectAll("path.link")
    .data(links);

linkEnter.enter().append("path") //在指定元素之前插入一个元素
    .attr("class", "link")
    .attr("d", diagonal)
    .attr("stroke", "black")
    .attr("stroke-width", d => {
        var pre = d.target.number / d.source.number;
        // return Line_linear(pre * 100)
        return linear(d.target.number)
    })
    .attr("stroke-opacity", 0.3)
    .attr("marker-end", "url(#resolved)") //根据箭头标记的id号标记箭头
    .style("fill", "white")
    .style("fill-opacity", 0.7)
    // 首先为每条节点连线添加标识id
    .attr("id", function (d, i) {
        return "mypath" + i;
    });

//为连线添加文字
linkEnter.enter().append('g').append('text')
    .attr('x', 60)
    .attr('y', 60)
    .style('fill', 'green')
    .style('font-size', '15px')
    .style('font-weight', 'bold')
    .append('textPath')
    .attr({ //引用路径
        'xlink:href': function (d, i) {
            // console.log(d)
            return "#mypath" + i;
        }
    })
    .text(function (d, i) {
        //debugger
        return d.target.type
    });

linkEnter.on("mousemove", d => {
        // console.log(d)
        var pre = d.target.number / d.source.number;
        pre = parseInt(pre * 100)
        pre = parseFloat(pre / 100)
        tooltip.html("type: " + d.target.type + "<br/>" + "比例：" + pre)
            .style("left", ((d.target.x + d.source.x) / 2 + 300) + "px")
            .style("top", ((d.target.y + d.source.y) / 2 + 45) + "px")
            .style("opacity", 1.0)
    })
    .on("mouseout", d => {
        tooltip.style("opacity", 0.0)
    })

var node = svgT.selectAll(".node")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "node")

node.append("circle")
    .attr("transform", function (d) {
        return "translate(" + d.x + "," + (d.y + 14) + ")";
    })
    .attr("r", d => {
        return 15;
    })
    .attr("fill", d => {
        return "white"
    })
    .attr("opacity", 1)

node.append("circle")
    .attr("transform", function (d) {
        return "translate(" + d.x + "," + (d.y + 14) + ")";
    })
    .attr("r", d => {
        return 15;
    })
    .attr("fill", d => {
        return d.color
    })
    .attr("opacity", 0.8)

node.on("mouseover", d => {
        tooltip.html("节点：" + d.name + "<br/>" + "人数：" + d.number)
            .style("left", (d.x + 300) + "px")
            .style("top", (d.y + 45) + "px")
            .style("opacity", 1.0);
    })
    .on("mouseout", d => {
        tooltip.style("opacity", 0.0);
    });

var lin = [{
    "name": "志愿者",
    "number": 1,
    "color": "#00aeff"
}, {
    "name": "收入",
    "number": 2,
    "color": "#f76f8e"
}, {
    "name": "拖延症",
    "number": 3,
    "color": "#484d6d",
}, {
    "name": "收益",
    "number": 4,
    "color": "#DC143C",
}, {
    "name": "亏损",
    "number": 5,
    "color": "#00FF00",
}]

var circle = svgT.selectAll("#cir")
    .attr("id", "cir")
    .data(lin)
    .enter();

circle.append("circle")
    .attr("cx", d => {
        // console.log(d)
        return (d.number - 1) * 70 + 50;
    })
    .attr("cy", 6)
    .attr("r", 5)
    .attr("fill", d => {
        return d.color;
    })
    .attr("opacity", 0.8)

svgT.selectAll("#w")
    .attr("id", "w")
    .data(lin).enter()
    .append("text")
    .attr("x", d => {
        // console.log(d)
        return (d.number - 1) * 70 + 50;
    })
    .attr("y", 5)
    .attr("dx", 10)
    .attr("dy", 7)
    .attr("font-size", "15px")
    .attr("font-family", "STHeiti")
    .text(d => {
        return d.name;
    })