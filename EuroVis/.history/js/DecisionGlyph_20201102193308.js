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
            var outCircleRadius = 150;

            var webPoints = [];
            for (var i = 0; i < total; i++) {
                // if (i != 1) continue
                webPoints.push({
                    x1: inCircleRadius * Math.sin(i * onePiece),
                    y1: inCircleRadius * Math.cos(i * onePiece),
                    x2: outCircleRadius* Math.sin(i * onePiece),
                    y2: outCircleRadius * Math.cos(i * onePiece)
                });
                // if (i == 0) {
                //     liner.append('line')
                //         .attr('x1', x)
                //         .attr('y1', y - lineWid / 2)
                //         .attr('x2', x + linelen)
                //         .attr('y2', y - lineWid / 2)
                //         .attr('fill', 'none')
                //         .attr('stroke', getColor(k))
                //         .attr('stroke-width', lineWid);
                // }
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
        })
    })
}

RaderGlyph(1, 11);