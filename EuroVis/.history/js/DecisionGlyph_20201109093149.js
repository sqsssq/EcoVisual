var glyph_width = document.getElementById("DecisionGlyph").clientWidth;
var glyph_height = document.getElementById("DecisionGlyph").clientHeight;

var glyph_svg = d3.select("#DecisionGlyph").append("svg")
    .attr('id', 'GView')
    .attr("width", glyph_width)
    .attr("height", glyph_height)
// .append('g')
// .call(zoom)
// .append('g')
// .attr('class', 'zoomg')
// .append("g")
// // .attr("transform", "translate(0,100)")
// .attr("transform", "translate(-10, 10)");

var glyph_g = 0;
var decisionNumber = 7;

var processNum = [2, 3, 3, 2, 2, 2, 2, 4, 2, 4, 2];

function RadarGlyph(label, decisionNum) {
    d3.json(fileURL).then(gdata => {
        d3.csv('data/box_calc.csv').then((rectdata) => {
            var glyph_data = new Array();
            var glyphMark = new Array();
            var Price = [0, 0];
            for (let i in gdata) {
                if (gdata[i].label == label) {
                    glyph_data.push(gdata[i]);
                    glyphMark.push(rectdata[i]);
                    if (parseFloat(rectdata[i]['129']) - parseFloat(rectdata[i]['19']) < 0)
                        Price[0]++;
                    else
                        Price[1]++;
                }
            }
            // console.log(glyphMark[0])
            var peopleNum = Price[0] + Price[1];
            var glyphDecision = new Array();
            for (let i in glyphMark) {
                var t = new Array();
                for (let j = 1; j <= decisionNum; ++j) {
                    t.push(parseInt(glyphMark[i][j]));
                }
                glyphDecision.push(t);
            }

            console.log(glyphDecision[0]);
            if (glyph_g != 0) {
                glyph_g.remove();
                glyph_g = 0;
            }
            glyph_g = glyph_svg.append('g')
                // .classed('glyph_g', true)
                .attr('transform', "translate(" + (glyph_width / 2) + ',' + (glyph_height / 2) + ')')
            // .attr("transform", "rotate(90)");
            // glyph_g.append('circle')
            //     .attr('cx', 0)
            //     .attr('cy', 0)
            //     .attr('r', 50)
            //     .attr('fill', 'red')
            var total = decisionNum;
            var level = 4;
            var radius = 110;
            // var outCircleRadius = radius * 7 / 6;
            var arc = 2 * Math.PI;
            // 每项指标所在的角度
            var onePiece = arc / total;
            // 计算网轴的正多边形的坐标
            var polygons = {
                webs: [],
                webPoints: []
            };
            var inCircleRadius = 30;
            var outCircleRadius = 120;

            var webPoints = [];
            for (var i = 0; i < total; i++) {
                webPoints.push({
                    x1: inCircleRadius * Math.sin(i * onePiece),
                    y1: inCircleRadius * Math.cos(i * onePiece),
                    x2: outCircleRadius * Math.sin(i * onePiece),
                    y2: outCircleRadius * Math.cos(i * onePiece)
                });
            }

            // 添加纵轴
            var lines = glyph_g.append('g')
                .classed('lines', true);
            lines.selectAll('#linekkk')
                .attr('id', "linekkk")
                .data(webPoints)
                .enter()
                .append('line')
                .attr('x1', d => {
                    return d.x1;
                })
                .attr('y1', d => {
                    return d.y1;
                })
                .attr('x2', function (d) {
                    // console.log(d.x);
                    return d.x2;
                })
                .attr('y2', function (d) {
                    return d.y2;
                })
                .attr('fill', 'none')
                .attr('stroke', 'gray')
                .attr("stroke-width", 1)
                .attr('stroke-dasharray', 5);

            var decPoint = new Array();
            var lineScale = new Array();
            for (let i = 0; i < decisionNum; ++i) {
                lineScale.push(d3.scaleLinear()
                    .domain([0, processNum[i] + 1])
                    .range([inCircleRadius, outCircleRadius]));
            }
            for (let i = 0; i < decisionNum; ++i) {
                // var lineScale = d3.scaleLinear()
                //     .domain([0, processNum[i] + 1])
                //     .range([inCircleRadius, outCircleRadius]);
                for (let j = 1; j <= processNum[i]; ++j) {
                    var x = lineScale[i](j) * Math.sin(i * onePiece);
                    var y = lineScale[i](j) * Math.cos(i * onePiece);
                    decPoint.push({
                        x: x,
                        y: y
                    })
                }
            }

            var circles = glyph_g.append('g');
            circles.selectAll('#cirkkk')
                .attr('id', 'cirkkk')
                .data(decPoint)
                .enter()
                .append('circle')
                .attr('cx', d => {
                    return d.x;
                })
                .attr('cy', d => {
                    return d.y;
                })
                .attr('r', 3)
                .attr('fill', 'steelblue');

            var line_generator = d3.line()
                .x(function (d, i) {
                    return d.x;
                })
                .y(function (d) {
                    return d.y;
                });
            
            var countDecision = new Object();

            for (var i in glyphDecision) {;
                // console.log(glyphDecision[i]);
                for (var j = 1; j <= 11; ++j) {
                    var f1 = ((j - 1) % 11).toString();
                    var f2 = ((j) % 11).toString();
                    if ((j - 1) % 11 < 10)
                        f1 = '0' + f1;
                    if ((j % 11) < 10)
                        f2 = '0' + f2;
                    var s = f1 + glyphDecision[i][(j - 1) % 11].toString() + f2 + glyphDecision[i][j % 11].toString()
                    if (typeof (countDecision[s]) == 'undefined')
                    {
                        countDecision[s] = {
                            num: 0,
                            x1: (j - 1) % 11,
                            x2: j % 11,
                            y1: glyphDecision[i][(j - 1) % 11],
                            y2: glyphDecision[i][(j) % 11]
                        }
                    }
                    countDecision[s].num++;
                }
            }
            console.log(countDecision)

            var peopleLine = new Array();
            // for (let i in glyphDecision) {
            //     // console.log(glyphDecision[i]);
            //     var t = new Array();
            //     for (let j in glyphDecision[i]) {
            //         var x = lineScale[j](glyphDecision[i][j] + 1) * Math.sin(j * onePiece);
            //         var y = lineScale[j](glyphDecision[i][j] + 1) * Math.cos(j * onePiece);
            //         t.push({
            //             x: x,
            //             y: y
            //         });
            //     }
            //     let j = 0;
            //     var x = lineScale[j](glyphDecision[i][j] + 1) * Math.sin(j * onePiece);
            //     var y = lineScale[j](glyphDecision[i][j] + 1) * Math.cos(j * onePiece);
            //     t.push({
            //         x: x,
            //         y: y
            //     });
            //     peopleLine.push(t);
            // }
            // console.log(peopleLine)
            for (var i in countDecision) {
                // console.log(countDecision[i])
                peopleLine.push({
                    x1: lineScale[countDecision[i].x1](countDecision[i].y1 + 1) * Math.sin(countDecision[i].x1 * onePiece),
                    x2: lineScale[countDecision[i].x2](countDecision[i].y2 + 1) * Math.sin(countDecision[i].x2 * onePiece),
                    y1: lineScale[countDecision[i].x1](countDecision[i].y1 + 1) * Math.cos(countDecision[i].x1 * onePiece),
                    y2: lineScale[countDecision[i].x2](countDecision[i].y2 + 1) * Math.cos(countDecision[i].x2 * onePiece),
                    num: countDecision[i].num 
                })
            }

            var decisionScale = d3.scaleLinear()
            .domain([0, peopleNum])
            .range([0, 10]);

            var peopleLines = glyph_g.append('g');
            peopleLines.selectAll("#peopleLinekkk")
                .attr('id', 'peopleLinekkk')
                .data(peopleLine)
                .enter()
                .append('line')
                // .attr("d", d => {
                //     return line_generator(d);
                // })
                .attr('fill', 'none')
                .attr('stroke', 'steelblue')
                .attr('x1', d => {
                    return d.x1;
                })
                .attr('y1', d => {
                    return d.y1;
                })
                .attr('x2', d => {
                    return d.x2;
                })
                .attr('y2', d => {
                    return d.y2;
                })
                .attr("stroke-width", (d, i) => {
                    console.log(peopleNum)
                    console.log(decisionScale[100])
                    return decisionScale[d.num];
                })  
            glyph_g.append('circle')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', inCircleRadius)
                .attr('stroke', 'gray')
                .attr('fill', 'none');
            //新建一个饼状图
            var pie = d3.pie();
            //新建一个弧形生成器
            var innerRadius = 0; //内半径
            var outerRadius = 100; //外半径
            var arc_generator = d3.arc()
                .innerRadius(0)
                .outerRadius(inCircleRadius - 5);
            var pies = glyph_g.append('g');
            pies.selectAll('#piekkk')
                .attr('id', 'piekkk')
                .data(pie(Price))
                .enter()
                .append('path')
                .attr('d', d => arc_generator(d))
                .attr('fill', (d, i) => {
                    if (i == 0) {
                        // return "#41CA77";

                        return "#D8483E";
                    } else {
                        // return "#D8483E";
                        return "#41CA77";
                    }
                })

            let textRadius = 160;
            var title = ['wealth', 'work', 'health', 'insurance', 'loan', 'investment', 'risk', 'disaster', 'lottery', 'ill', 'unemploy', 'rank', 'preference']
            pies.selectAll('#textkkk')
                .attr("id", 'textkkk')
                .data(title)
                .enter()
                .append('text')
                .attr('fill', 'black')
                .attr('font-size', '15px')
                .attr('text-anchor', 'middle')
                .attr("font-family", "courier")
                .attr('x', (d, i) => {
                    if (i < 11)
                    return textRadius * Math.sin(i * onePiece);
                })
                .attr("y", (d, i) => {
                    if (i < 11)
                    return textRadius * Math.cos(i * onePiece);
                })
                .text((d, i) => {
                    if (i < 11)
                    return d;
                })
        })
    })
}

// RadarGlyph(0, 11);