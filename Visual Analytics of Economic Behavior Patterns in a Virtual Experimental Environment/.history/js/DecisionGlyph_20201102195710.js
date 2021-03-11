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

var processNum = [2, 3, 3, 2, 2, 2, 2, 4, 2, 4, 2];

function RaderGlyph(label, decisionNum) {
    d3.json(fileURL).then(gdata => {
        d3.csv('data/box_calc.csv').then((rectdata) => {
            var glyph_data = new Array();
            var glyphMark = new Array();
            for (let i in gdata) {
                if (gdata[i].label == label) {
                    glyph_data.push(gdata[i]);
                    glyphMark.push(rectdata[i]);
                }
            }
            console.log(glyphMark[0])
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
            var outCircleRadius = radius * 7 / 6;
            var arc = 2 * Math.PI;
            // 每项指标所在的角度
            var onePiece = arc / total;
            // 计算网轴的正多边形的坐标
            var polygons = {
                webs: [],
                webPoints: []
            };
            var inCircleRadius = 60;
            var outCircleRadius = 170;

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
                })
            
            var peopleLine = new Array();
            for (let i in glyphDecision) {
                console.log(glyphDecision[i]);
            }
        })
    })
}

RaderGlyph(1, 11);