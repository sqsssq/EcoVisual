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
            for (let i in gdata) {
                if (gdata[i].label == label)
                    glyph_data.push(gdata[i]);
            }
            // console.log(glyph_data);
            if (glyph_g != 0) {
                glyph_g.remove();
                glyph_g = 0;
            }
            glyph_g = glyph_svg.append('g')
                // .classed('glyph_g', true)
                .attr('transform', "translate(" + (glyph_width / 2) + ',' + (glyph_height / 2) + ')');
            glyph_g.append('circle')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', 50)
                .attr('fill', 'red')
            var total = decisionNum;
            var level = 4;
            var radius = 100;
            var outCircleRadius = radius * 7 / 6;
            var arc = 2 * Math.PI;
        // 每项指标所在的角度
        var onePiece = arc / total;
        // 计算网轴的正多边形的坐标
        var polygons = {
            webs: [],
            webPoints: []
        };
        var outC
    var inCircleRadius = radius / 3;

    for (var k = level; k > 0; k--) {
        var webs = '',
            webPoints = [];
        var r = (radius * 7 / 6) / level * k + inCircleRadius;
        for (var i = 0; i < total; i++) {
            // if (i != 1) continue
            var x = r * Math.sin(i * onePiece),
                y = r * Math.cos(i * onePiece);
            webs += x + ',' + y + ' ';
            webPoints.push({
                x: x,
                y: y
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
        polygons.webs.push(webs);
        polygons.webPoints.push(webPoints);
    }
    // 绘制网轴
    var webs = glyph_g.append('g')
        .classed('webs', true);

    for (let i in data.vlen) {
        let vsum = 0;
        for (let k in data.vlen[i]) {
            vsum += data.vlen[i][k];
        }
        // console.log(vsum);
        for (var k = level; k > 0; k--) {
            var r = radius / level * k + inCircleRadius;
            var x = r * Math.sin(i * onePiece),
                y = r * Math.cos(i * onePiece);
        }
    }

    // webs.selectAll('polygon')
    //     .data(polygons.webs)
    //     .enter()
    //     .append('polygon')
    //     .attr('points', function (d) {
    //         return d;
    //     });
    // console.log(polygons.webPoints[0])
    // 添加纵轴
    var lines = glyph_g.append('g')
        .classed('lines', true);
    lines.selectAll('#linekkk')
        .attr('id', "linekkk")
        .data(polygons.webPoints[0])
        .enter()
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', function (d) {
            // console.log(d.x);
            return d.x;
        })
        .attr('y2', function (d) {
            return d.y;
        })
        .attr('fill', 'none')
        .attr('stroke', 'gray')
        .attr("stroke-width", 1)
        .attr('stroke-dasharray', 5);
        })
    })
}

RaderGlyph(1, 11);