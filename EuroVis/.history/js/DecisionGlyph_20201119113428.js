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

function RadarGlyph(label, decisionNum) {
    d3.json(fileURL).then(gdata => {
        d3.csv('data/box_calc.csv').then((rectdata) => {
            var lsx = new Object();
            var lsxmax = -1;
            var inCircleRadius = 15;
            var outCircleRadius = 90;
            var zeroLine = 30;

            for (var i in gdata) {
                // console.log(lsx[gdata[i].label]);
                if (typeof (lsx[gdata[i].label]) == 'undefined') {
                    // console.log(gdata[i].label)
                    lsx[gdata[i].label] = 0;
                }
                lsx[gdata[i].label]++;
                lsxmax = Math.max(lsxmax, lsx[gdata[i].label]);
            }
            // console.log(lsxmax);
            // console.log(lsx);

            var pieRScale = d3.scaleLinear()
                .domain([0, lsxmax])
                .range([10, inCircleRadius]);


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

            console.log(boxLineData)

            var peopleNum = Price[0] + Price[1];
            // console.log('kkkkk');
            console.log(peopleNum);
            var glyphDecision = new Array();
            for (let i in glyphMark) {
                var t = new Array();
                for (let j = 1; j <= decisionNum; ++j) {
                    t.push(parseInt(glyphMark[i][j]));
                }
                glyphDecision.push(t);
            }

            if (glyph_g != 0) {
                glyph_g.remove();
                glyph_g = 0;
            }
            glyph_g = glyph_svg.append('g')
                // .classed('glyph_g', true)
                .attr('transform', "translate(" + (glyph_width / 2 - 5) + ',' + (glyph_height / 2 + 5) + ')')
            // .attr("transform", "rotate(90)");
            // glyph_g.append('circle')
            //     .attr('cx', 0)
            //     .attr('cy', 0)
            //     .attr('r', 50)
            //     .attr('fill', 'red')
            var total = decisionNum;
            var level = 4;
            // var radius = decisionNum0;
            // var outCircleRadius = radius * 7 / 6;
            var arc = 2 * Math.PI;
            // 每项指标所在的角度
            var onePiece = arc / total;
            // 计算网轴的正多边形的坐标
            var polygons = {
                webs: [],
                webPoints: []
            };

            var boxInData = new Array();
            for (let i = 2; i <= 11; ++i) {
                let temp = new Array();
                for (let j in glyphMark) {
                    temp.push(parseFloat(glyphMark[j][(i * 10 + 9).toString()]) - parseFloat(glyphMark[j][((i - 1) * 10 + 9).toString()]));
                }
                boxInData.push(temp);
            }
            for (let i in boxInData) {
                boxInData[i].sort(function (a, b) {
                    return a - b;
                });

            }
            console.log(boxInData);
            var boxInnerData = new Array();
            boxInnerData.push([0, 0, 0, 0, 0]);
            let mx = -9999,
                mn = 9999;
            for (let i in boxInData) {
                mx = Math.max(mx, boxInData[i][boxInData[i].length - 1]);
                mn = Math.min(mn, boxInData[i][0]);
                boxInnerData.push([boxInData[i][0], boxInData[i][parseInt(boxInData[i].length / 4)], boxInData[i][parseInt(boxInData[i].length / 2)], boxInData[i][parseInt(boxInData[i].length * 3 / 4)], boxInData[i][boxInData[i].length - 1]]);
            }
            // console.log(mn)

            let kascale = d3.scaleLinear()
                .domain([0, (Math.abs(mx) > Math.abs(mn) ? Math.abs(mx) : Math.abs(mn))])
                .range([0, zeroLine - 5]);

            var boxLineData = new Array();
            var llong = 3;
            for (let i in boxInnerData) {
                // console.log(i * onePiece)
                if (i != 2) continue;
                var zero = zeroLine + outCircleRadius;
                var lk = new Array();
                for (let j in boxInnerData[i]) {
                    var lx = kascale(Math.abs(boxInnerData[i][j]));
                    // console.log(lx)
                    if (boxInnerData[i][j] < 0) lx = zero - lx;
                    else lx = zero + lx;
                    lk.push(lx);
                    var vx = 0;
                    var vy = lx;
                    // console.log(Math.sin(i * onePiece))

                    var inLine = {
                        x1: vx - (llong),
                        y1: vy,
                        x2: vx + (llong),
                        y2: vy,
                        r: i
                    };
                    boxLineData.push(inLine);
                }
                boxLineData.push({
                    x1: 0,
                    y1: lk[0],
                    x2: 0,
                    y2: lk[4],
                    r: i
                });
                // boxLineData.push({
                //     x1: lk[0] * Math.sin(i * onePiece),
                //     y1: lk[0] * Math.cos(i * onePiece),
                //     x2: lk[4] * Math.sin(i * onePiece),
                //     y2: lk[4] * Math.cos(i * onePiece),
                // });
                // var rd1 = Math.atan(lk[1] / llong);
                // var rd2 = Math.atan(lk[3] / llong);
                var vx1 = 0;
                var vy1 = lk[1];
                var vx2 = 0;
                var vy2 = lk[3];
                boxLineData.push({
                    x1: vx1 - (llong),
                    y1: vy1,
                    x2: vx2 - (llong),
                    y2: vy2,
                    r: i
                })
                boxLineData.push({
                    x1: vx1 + (llong),
                    y1: vy1,
                    x2: vx2 + (llong),
                    y2: vy2,
                    r: i
                })
            }
            // for (let i in boxInnerData) {
            //     console.log(i * onePiece)
            //     var zero = zeroLine + outCircleRadius;
            //     var lk = new Array();
            //     for (let j in boxInnerData[i]) {
            //         var lx = kascale(Math.abs(boxInnerData[i][j]));
            //         // console.log(lx)
            //         if (boxInnerData[i][j] < 0) lx = zero - lx;
            //         else lx = zero + lx;
            //         lk.push(lx);
            //         var vx = lx * Math.sin(i * onePiece);
            //         var vy = lx * Math.cos(i * onePiece);
            //         var rd = Math.atan(lx / llong);
            //         console.log(Math.sin(i * onePiece))

            //         var inLine = {
            //             x1: vx - (llong) * Math.sin(rd),
            //             y1: vy - (llong) * Math.cos(rd),
            //             x2: vx + (llong) * Math.sin(rd),
            //             y2: vy + (llong) * Math.cos(rd)
            //         };
            //         boxLineData.push(inLine);
            //     }
            //     boxLineData.push({
            //         x1: lk[0] * Math.sin(i * onePiece),
            //         y1: lk[0] * Math.cos(i * onePiece),
            //         x2: lk[4] * Math.sin(i * onePiece),
            //         y2: lk[4] * Math.cos(i * onePiece),
            //     });
            //     boxLineData.push({
            //         x1: lk[0] * Math.sin(i * onePiece),
            //         y1: lk[0] * Math.cos(i * onePiece),
            //         x2: lk[4] * Math.sin(i * onePiece),
            //         y2: lk[4] * Math.cos(i * onePiece),
            //     });
            //     var rd1 = Math.atan(lk[1] / llong);
            //     var rd2 = Math.atan(lk[3] / llong);
            //     var vx1 = lk[1] * Math.sin(i * onePiece);
            //     var vy1 = lk[1] * Math.cos(i * onePiece);
            //     var vx2 = lk[3] * Math.sin(i * onePiece);
            //     var vy2 = lk[3] * Math.cos(i * onePiece);
            //     boxLineData.push({
            //         x1: vx1 - (llong) * Math.sin(rd1),
            //         y1: vy1 - (llong) * Math.cos(rd1),
            //         x2: vx2 - (llong) * Math.sin(rd2),
            //         y2: vy2 - (llong) * Math.cos(rd2),
            //     })
            //     boxLineData.push({
            //         x1: vx1 + (llong) * Math.sin(rd1),
            //         y1: vy1 + (llong) * Math.cos(rd1),
            //         x2: vx2 + (llong) * Math.sin(rd2),
            //         y2: vy2 + (llong) * Math.cos(rd2),
            //     })
            // }

            glyph_g.append('circle')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', outCircleRadius)
                .attr('stroke', 'gray')
                .attr('fill', 'none')
                .attr('stroke-dasharray', 5)

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

            lines.selectAll("#boxkkk")
                .attr('id', 'boxkkk')
                .data(boxLineData)
                .enter()
                .append('line')
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
                .attr('fill', 'none')
                .attr('stroke', 'gray')
                .attr('stroke-width', 0.5);

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

            for (var i in glyphDecision) {
                ;
                // console.log(glyphDecision[i]);
                for (var j = 1; j <= decisionNum; ++j) {
                    var f1 = ((j - 1) % decisionNum).toString();
                    var f2 = ((j) % decisionNum).toString();
                    if ((j - 1) % decisionNum < 10)
                        f1 = '0' + f1;
                    if ((j % decisionNum) < 10)
                        f2 = '0' + f2;
                    var s = f1 + glyphDecision[i][(j - 1) % decisionNum].toString() + f2 + glyphDecision[i][j % decisionNum].toString()
                    if (typeof (countDecision[s]) == 'undefined') {
                        countDecision[s] = {
                            num: 0,
                            x1: (j - 1) % decisionNum,
                            x2: j % decisionNum,
                            y1: glyphDecision[i][(j - 1) % decisionNum],
                            y2: glyphDecision[i][(j) % decisionNum]
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
                .range([0, 8]);

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
                    // console.log(peopleNum)
                    // console.log(linearZ[100])
                    return decisionScale(d.num);
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
                .outerRadius(pieRScale(lsx[label]));
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
                .attr('font-size', '12px')
                .attr('text-anchor', (d, i) => {
                    if (i == 0 || (decisionNum % 2 == 0 && i * 2 == decisionNum))
                        return 'middle';
                    else if (i * 2 < decisionNum)
                        return 'head';
                    else if (i * 2 > decisionNum)
                        return 'end';
                })
                .attr("font-family", "courier")
                .attr('x', (d, i) => {
                    if (i < decisionNum)
                        return textRadius * Math.sin(i * onePiece);
                })
                .attr("y", (d, i) => {
                    if (i < decisionNum)
                        return textRadius * Math.cos(i * onePiece);
                })
                .text((d, i) => {
                    if (i < decisionNum)
                        return d;
                })
        })
    })
}

// RadarGlyph(0, decisionNum);
function RadarGlyphPeo(name, decisionNum, l) {
    d3.json(fileURL).then(gkdata => {
        d3.csv('data/box_calc.csv').then((rectdata) => {
            var lsx = new Object();
            var lsxmax = -1;
            var inCircleRadius = 30;
            var outCircleRadius = 120;

            var gdata = [];
            for (var i in gkdata) {
                if (gkdata[i].l == l && gkdata[i].id == name) {
                    console.log(gkdata[i].id)
                    console.log(gkdata[i].l)
                    console.log(gkdata[i]);
                    gdata.push(gkdata[i]);
                }
            }

            // for (var i in gdata) {
            //     // console.log(lsx[gdata[i].label]);
            //     if (typeof (lsx[gdata[i].label]) == 'undefined')
            //     {
            //         // console.log(gdata[i].label)
            //         lsx[gdata[i].label] = 0;
            //     }
            //     lsx[gdata[i].label]++;
            //     lsxmax = Math.max(lsxmax, lsx[gdata[i].label]);
            // }
            // console.log(lsxmax);
            // console.log(lsx);

            var pieRScale = d3.scaleLinear()
                .domain([0, lsxmax])
                .range([10, inCircleRadius]);


            var glyph_data = new Array();
            var glyphMark = new Array();
            var Price = [0, 0];
            glyph_data.push(gdata[0]);
            console.log(rectdata)
            for (let i in rectdata) {
                if (rectdata[i].code == name && rectdata[i].biao == l) {
                    // glyph_data.push(gdata[i]);
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
                .attr('transform', "translate(" + (glyph_width / 2 - 5) + ',' + (glyph_height / 2 + 5) + ')')
            // .attr("transform", "rotate(90)");
            // glyph_g.append('circle')
            //     .attr('cx', 0)
            //     .attr('cy', 0)
            //     .attr('r', 50)
            //     .attr('fill', 'red')
            var total = decisionNum;
            var level = 4;
            // var radius = decisionNum0;
            // var outCircleRadius = radius * 7 / 6;
            var arc = 2 * Math.PI;
            // 每项指标所在的角度
            var onePiece = arc / total;
            // 计算网轴的正多边形的坐标
            var polygons = {
                webs: [],
                webPoints: []
            };

            glyph_g.append('circle')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', outCircleRadius)
                .attr('stroke', 'gray')
                .attr('fill', 'none')
                .attr('stroke-dasharray', 5)

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

            for (var i in glyphDecision) {
                ;
                // console.log(glyphDecision[i]);
                for (var j = 1; j <= decisionNum; ++j) {
                    var f1 = ((j - 1) % decisionNum).toString();
                    var f2 = ((j) % decisionNum).toString();
                    if ((j - 1) % decisionNum < 10)
                        f1 = '0' + f1;
                    if ((j % decisionNum) < 10)
                        f2 = '0' + f2;
                    var s = f1 + glyphDecision[i][(j - 1) % decisionNum].toString() + f2 + glyphDecision[i][j % decisionNum].toString()
                    if (typeof (countDecision[s]) == 'undefined') {
                        countDecision[s] = {
                            num: 0,
                            x1: (j - 1) % decisionNum,
                            x2: j % decisionNum,
                            y1: glyphDecision[i][(j - 1) % decisionNum],
                            y2: glyphDecision[i][(j) % decisionNum]
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
                .range([0, 2]);

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
                    // console.log(peopleNum)
                    // console.log(linearZ[100])
                    return decisionScale(d.num);
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
            // var arc_generator = d3.arc()
            //     .innerRadius(0)
            //     .outerRadius(pieRScale(lsx[label]));
            var pies = glyph_g.append('g');
            // pies.selectAll('#piekkk')
            //     .attr('id', 'piekkk')
            //     .data(pie(Price))
            //     .enter()
            //     .append('path')
            //     .attr('d', d => arc_generator(d))
            //     .attr('fill', (d, i) => {
            //         if (i == 0) {
            //             // return "#41CA77";

            //             return "#D8483E";
            //         } else {
            //             // return "#D8483E";
            //             return "#41CA77";
            //         }
            //     })

            let textRadius = 160;
            var title = ['wealth', 'work', 'health', 'insurance', 'loan', 'investment', 'risk', 'disaster', 'lottery', 'ill', 'unemploy', 'rank', 'preference']
            pies.selectAll('#textkkk')
                .attr("id", 'textkkk')
                .data(title)
                .enter()
                .append('text')
                .attr('fill', 'black')
                .attr('font-size', '12px')
                .attr('text-anchor', (d, i) => {
                    if (i == 0 || (decisionNum % 2 == 0 && i * 2 == decisionNum))
                        return 'middle';
                    else if (i * 2 < decisionNum)
                        return 'head';
                    else if (i * 2 > decisionNum)
                        return 'end';
                })
                .attr("font-family", "courier")
                .attr('x', (d, i) => {
                    if (i < decisionNum)
                        return textRadius * Math.sin(i * onePiece);
                })
                .attr("y", (d, i) => {
                    if (i < decisionNum)
                        return textRadius * Math.cos(i * onePiece);
                })
                .text((d, i) => {
                    if (i < decisionNum)
                        return d;
                })
        })
    })
}