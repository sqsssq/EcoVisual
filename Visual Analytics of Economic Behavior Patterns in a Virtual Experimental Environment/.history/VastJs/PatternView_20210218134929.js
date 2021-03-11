var widthMatrix = document.getElementById("patternView").offsetWidth,
    heightMatrix = document.getElementById("patternView").offsetHeight;

var svgMatrix;

svgMatrix = d3.select("#patternView").append("svg")
    .attr("width", widthMatrix)
    .attr("height", heightMatrix);

let Matrix_g = 0;
let Radar_g = 0;
let Sankey_g = 0;
let Change_g = 0;
let legend_g = 0;

function DrawMatrix(data2, data3) {
    d3.csv("data/box_calc_rank.csv").then((data) => {
        // d3.csv("data/fpmtype4.csv").then((data2) => {
        //     d3.csv("data/fpm02.csv").then((data3) => {
        if (Matrix_g != 0) {
            Matrix_g.remove();
            Matrix_g = 0;
        }
        Matrix_g = svgMatrix.append("g")
            .attr("transform", "translate(" + 0.1 * widthMatrix + "," + 0.05 * widthMatrix + ")")

        // console.log(data3);
        let typeSimilar = new Array();
        let typeTransfer = new Object();
        let typeCount = new Object();
        let typeMax = 0;
        let typeMin = 100000;
        let cntMax = 0;

        for (let i = 0; i < data3.length - 1; ++i) {
            for (let j = i + 1; j < data3.length; ++j) {
                let cnt = 0;
                for (let k = 1; k < 14; ++k) {
                    if (data3[i][k] == data3[j][k] && data3[i][k] != "-1") {
                        cnt++;
                    }
                }
                typeSimilar.push({
                    startAngle: -Math.PI / 2,
                    endAngle: Math.PI / 2,
                    source: i,
                    target: j,
                    cnt: cnt
                })
                cntMax = Math.max(cntMax, cnt);
            }
        }

        let typeSimilar2 = new Object();
        for (let i = 0; i < data3.length; ++i) {
            for (let j = 0; j < data3.length; ++j) {
                typeSimilar2[(i + 1) * 10 + j + 1] = {
                    source: i,
                    target: j,
                    cnt: 0
                };
            }
        }
        // console.log(typeSimilar2)
        for (let i = 0; i < data2.length; ++i) {
            for (let j = 1; j < data3.length - 1; ++j) {
                if (isNaN(parseInt(data2[i][j]))) break;
                for (let k = j + 1; k < data3.length; ++k) {
                    if (isNaN(parseInt(data2[i][k]))) break;
                    typeSimilar2[(parseInt(data2[i][j]) + 1) * 10 + parseInt(data2[i][k]) + 1].cnt++;
                }
            }
        }
        // console.log(typeSimilar2);

        for (let i = 0; i < data3.length; ++i) {
            typeTransfer[i] = new Object;
            typeCount[i] = 0;
            for (let j = 0; j < data3.length; ++j) {
                typeTransfer[i][j] = 0;
            }
        }
        for (let i = 0; i < data.length; ++i) {
            data[i]['type'] = new Array();
            // if (parseInt(data2[i]['0']) != 7)
            //     data[i]['typeA'] = '*';
            // else 
            //     data[i]['typeA'] = '+';
            for (let j = 1; j < 5; ++j) {
                if (isNaN(parseInt(data2[i][j]))) break;
                typeCount[parseInt(data2[i][j])]++;
                // typeMax = Math.max()
                data[i]['type'].push(parseInt(data2[i][j]));
            }
        }
        // console.log(typeCount);
        let name = new Object();
        let transMax = 0;
        let transMin = 100000;
        for (let i = 0; i < data.length; ++i) {
            if (typeof (name[data[i]['code']]) == 'undefined') {
                name[data[i]['code']] = data[i];
                // console.log(data[i]['code']);
            } else {
                for (let j in name[data[i]['code']].type) {
                    for (let k in data[i].type) {
                        typeTransfer[name[data[i]['code']].type[j]][data[i].type[k]]++;
                        transMax = Math.max(typeTransfer[name[data[i]['code']].type[j]][data[i].type[k]], transMax);
                        transMin = Math.min(typeTransfer[name[data[i]['code']].type[j]][data[i].type[k]], transMin);
                    }
                }
                name[data[i].code] = data[i];
            }
        }
        // console.log(transMax);
        let rc = new Array();
        for (let i = 0; i < data3.length * data3.length; ++i) {
            rc.push(i);
        }
        let sw = 0.8 * widthMatrix / data3.length;
        Matrix_g.selectAll("#rc")
            .attr('id', 'rc')
            .data(rc)
            .enter().append("rect")
            .attr('x', d => {
                return parseInt(d / data3.length) * sw;
            })
            .attr('y', d => {
                return (d % data3.length) * sw;
            })
            .attr('width', sw)
            .attr('height', sw)
            .attr('fill', 'white')
            .attr('stroke', 'black')
        let rScale = d3.scaleLinear()
            .domain([transMin, transMax])
            .range([1, sw / 2 - 2]);

        let typeC = new Array();
        for (let i = 0; i < data3.length; ++i) {
            typeC.push(typeCount[i]);
        }
        let typeScale = d3.scaleLinear()
            .domain([0, d3.max(typeC)])
            .range([0, 80])

        let arcScale = d3.scaleLinear()
            .domain([0, cntMax])
            .range([0, 10]);

        // console.log(cntMax)

        let cd = new Array();
        for (let i = 0; i < data3.length; ++i) {
            for (let j = 0; j < data3.length; ++j) {
                cd.push(typeTransfer[i][j]);
            }
        }
        Matrix_g.selectAll("#cc")
            .attr('id', 'cc')
            .data(cd)
            .enter().append("circle")
            .attr('cx', (d, i) => {
                return parseInt(i / data3.length) * sw + sw / 2;
            })
            .attr('cy', (d, i) => {

                return (i % data3.length) * sw + sw / 2;
            })
            .attr('r', d => rScale(d))
            .attr('fill', 'gray')
            .attr('fill-opacity', 0.5);
        for (let i = 1; i <= data3.length; ++i) {
            Matrix_g.append('text')
                .attr("x", (i - 1) * sw + sw / 2)
                .attr('y', -2)
                .attr('font-size', 10)
                .attr('dx', -2)
                .text(i);

            Matrix_g.append('text')
                .attr("x", -10)
                .attr('y', (i - 1) * sw + sw / 2)
                .attr('font-size', 10)
                .attr('dy', 2)
                .text(i);
        }
    })
    //     })
    // })
}

var typeColor = ["rgb(137, 170, 182)", "rgb(8, 77, 183)", "rgb(205, 105, 6)", "rgb(66, 148, 194)", "rgb(238, 173, 27)", "rgb(155, 107, 156)", "rgb(50,205,50)"];
var patternLine = 0;

function DrawRadar(date2, data3) {

    d3.csv("data/box_calc_rank.csv").then((data) => {
        // d3.csv("data/fpmtype4.csv").then((data2) => {
        //     d3.csv("data/fpm02.csv").then((data3) => {
        // console.log(data2);
        if (Radar_g != 0) {
            Radar_g.remove();
            Radar_g = 0;
        }
        Radar_g = svgMatrix.append("g")
            .attr('transform', 'translate(' + widthMatrix / 2 + ',' + heightMatrix * 3.5 / 5 + ')');
        var decisionNum = 11;
        var total = decisionNum;
        var inCircleRadius = 0;
        // var zeroLine = 35;
        var outCircleRadius = 90;
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
        patternLine = new Array();

        var processNum = [3, 3, 2, 2, 2, 2, 4, 2, 4, 2, 7];

        Radar_g.append('circle')
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
        var lines = Radar_g.append('g')
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

        var circles = Radar_g.append('g');
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
            .attr('r', 2)
            .attr('fill', 'gray');
        // console.log(data3);

        let linePath = new Array();
        for (let i = 0; i < data3.length; ++i) {
            // console.log(data3[i]);
            let decisionList = new Array();
            for (let j in data3[i]) {
                if (j == 1 || j == 12)
                    continue;
                decisionList.push(parseInt(data3[i][j]) + 1);
            }
            // console.log(decisionList);

            for (let j in decisionList) {
                j = parseInt(j);
                linePath.push({
                    pattern: i,
                    x1: lineScale[j](decisionList[j]) * Math.sin(j * onePiece),
                    y1: lineScale[j](decisionList[j]) * Math.cos(j * onePiece),
                    x2: lineScale[((j + 1) % 11)](decisionList[((j + 1) % 11)]) * Math.sin(((j + 1) % 11) * onePiece),
                    y2: lineScale[((j + 1) % 11)](decisionList[((j + 1) % 11)]) * Math.cos(((j + 1) % 11) * onePiece)
                })
            }
        }
        // console.log(linePath);
        patternLine = lines.selectAll("#typeLine")
            .attr('id', 'typeLine')
            .data(linePath)
            .enter()
            .append('line')
            .attr("x1", d => d.x1)
            .attr('x2', d => d.x2)
            .attr('y1', d => d.y1)
            .attr('y2', d => d.y2)
            .attr('stroke', d => typeColor[d.pattern])
            .attr('fill', 'none')
            .attr("stroke-width", 1)
            .on('mouseover', (d) => {
                patternLine.attr('stroke-opacity', x => {
                    if (x.pattern != d.pattern) return 0;
                    else return 1
                })
            })
            .on('mouseout', d => {
                patternLine.attr('stroke-opacity', 1);
            })
    })
    //     })
    // })

}
var type = [0, 2, 3, 3, 2, 2, 2, 2, 4, 2, 4, 2, 3, 7]
var select = [0, 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 13];

var title = ['', 'wealth', 'Work', 'Health', 'Insurance', 'Loan', 'Investment', 'Risk', 'Disaster', 'Lottery', 'Ill', 'Unemploy', 'Rank', 'URPI']
var title_tip_symbol = [
    [],
    ['poor', 'rich'],
    ['Low', 'Mid', 'High'],
    ['0', '5', '10'],
    ['No', 'Yes'],
    ['No', 'Yes'],
    ['No', 'Yes'],
    ['No', 'Yes'],
    ['No', 'Low', 'Mid', 'High'],
    ['No', 'Yes'],
    ['No', 'Low', 'Mid', 'High'],
    ['No', 'Yes'],
    ['low', 'mid', 'high'],
    ['0', '1', '2', '3', '4', '5', '6']
]
let decisionDiagonal;
let patternCir;
let patternRect;

function DrawSankey() {
    d3.csv("data/box_calc_rank.csv").then((data) => {
        if (Sankey_g != 0) {
            Sankey_g.remove();
            Sankey_g = 0;
        }
        Sankey_g = svgMatrix.append("g");

        // 连接线数据
        let connectData = new Object();
        // 节点数据
        let pointData = new Object();
        // preprocess
        for (let i = 1; i < 14; ++i) {
            if (!select[i]) continue;
            pointData[i] = new Object();
            for (let j = 0; j < type[i]; ++j) {
                pointData[i][j] = 0;
            }
        }

        for (let i = 1; i < 14 - 1; ++i) {
            if (!select[i]) continue;
            connectData[i] = new Object();
            for (let j = 0; j < type[i]; ++j) {
                connectData[i][j] = new Object();
                for (let k = i + 1; k < 14; ++k) {
                    if (!select[k]) continue;
                    connectData[i][j][k] = new Object();
                    for (let a = 0; a < type[k]; ++a) {
                        connectData[i][j][k][a] = 0;
                    }
                    break;
                }
            }
        }
        // 将每一轮每个过程中的节点数目
        let maxPoint = -9999;
        let minPoint = 9999;
        for (let i = 0; i < data.length; ++i) {
            for (let j = 1; j < 14; ++j) {
                if (!select[j]) continue;
                pointData[j][parseInt(data[i][j])]++;
                maxPoint = Math.max(pointData[j][parseInt(data[i][j])], maxPoint);
                minPoint = Math.min(pointData[j][parseInt(data[i][j])], minPoint);
            }
        }
        // // 计算每条连接线的数目
        // for (let i = 0; i < data.length; ++i) {
        //     for (let j = 1; j < 14 - 1; ++j) {
        //         if (!select[j]) continue;
        //         let f = 0;
        //         for (let k = j + 1; k < 14; ++k) {
        //             if (!select[k]) continue;
        //             connectData[j][parseInt(data[i][j])][k][parseInt(data[i][k])]++;
        //             break;
        //         }
        //     }
        // }

        // 定义比例尺
        let selectNum = 0;
        for (let i in select) {
            if (select[i]) {
                selectNum++;
            }
        }
        let yScale = d3.scaleLinear()
            .domain([1, selectNum])
            .range([30, heightMatrix - 10]);
        let sizeScale = d3.scaleLinear()
            .domain([minPoint, maxPoint])
            .range([3, 3]);

        let pointPaint = new Array();
        let cntPoint = 0;
        for (let i in pointData) {
            if (!select[i]) continue;
            cntPoint++;
            for (let j in pointData[i]) {
                if (pointData[i][j] == 0)
                    continue;
                pointPaint.push({
                    step: parseInt(i),
                    decision: parseInt(j),
                    size: pointData[i][j],
                    num: cntPoint
                });
            }
        }

        let cnt = 1;
        for (let i = 0; i < title.length; ++i) {
            if (select[i] == 0) continue;
            Sankey_g.append('text')
                .attr('font-family', 'Georgia')
                .attr('x', 5)
                .attr('y', yScale(cnt) - (i == 13 ? -3 : -3))
                .attr('font-size', 10)
                .text(title[i]);
            for (let j = 0; j < title_tip_symbol[i].length; ++j) {
                let h = widthMatrix;
                let step = h / (type[i] + 1);
                Sankey_g.append('text')
                    .attr('font-family', 'Georgia')
                    .attr('x', (parseInt(j) + 1) * step + 20)
                    .attr('y', yScale(cnt) + 3)
                    .attr('dy', (title_tip_symbol[i][j] == '6' ? 3 : 0))
                    .attr('font-size', 10)
                    .text(title_tip_symbol[i][j]);
            }
            cnt++;
        }
        // DrawLine(data2, data3, patternSelect);


        let decisionPoint = Sankey_g.selectAll("#typeCircle")
            .attr('id', 'typeCircle')
            .data(pointPaint)
            .enter()
            .append("circle")
            .attr("cy", d => yScale(d.num))
            .attr("cx", (d, i) => {
                let h = widthMatrix;
                let step = h / (type[d.step] + 1);
                return (d.decision + 1) * step;
            })
            .attr("r", d => sizeScale(d.size))
            // .attr("fill", "rgb(237, 237, 238)");
            .attr('fill', '	#D3D3D3')
        // DrawLine(data2, data3);
    })
}

DrawSankey();

function DrawLegend(data3) {
    let stepL = widthMatrix * 0.99 / data3.length;
    let patternSelect = new Array();
    for (let i = 0; i < data3.length; ++i) {
        patternSelect.push(1);
    }
    if (legend_g != 0) {
        legend_g.remove();
        legend_g = 0;
    }
    legend_g = svgMatrix.append('g');
    patternRect = legend_g.selectAll("#patternRect")
        .attr('id', 'patternRect')
        .data(patternSelect)
        .enter()
        .append('rect')
        .attr('x', (d, i) => {
            return 0.01 * widthMatrix + stepL * i;
        })
        .attr('y', 4)
        .attr('width', stepL * 0.6)
        .attr('height', 12)
        // .attr("stroke", (d, i) => typeColor[i])
        .attr('fill', (d, i) => typeColor[i])
        .attr('fill-opacity', 0.8)
        .attr('stroke-opacity', 0.8)
        .on('click', (d, i) => {
            // console.log(i);
            if (patternSelect[i] == 1) {
                // console.log(1);
                patternSelect[i] = 0;
                pattern_select_data[i].isTrue = false;
                patternRect.attr('fill', (x, y) => {
                    // console.log(y);
                    if (!patternSelect[y]) {
                        // console.log('a');
                        return '#D3D3D3';
                    } else return typeColor[y];
                })
            } else {
                patternSelect[i] = 1;
                pattern_select_data[i].isTrue = true;
                patternRect.attr('fill', (x, y) => {
                    if (!patternSelect[y]) {
                        // console.log('a');
                        return '#D3D3D3';
                    } else return typeColor[y];
                })
            }
            // DrawLine(data2, data3, patternSelect);
            DrawPattern(pattern_select_data);
        });

    legend_g.selectAll("#patternText")
        .attr('id', 'patternText')
        .data(patternSelect)
        .enter().append('text')
        .attr('x', (d, i) => 0.01 * widthMatrix + stepL * (i) + stepL * 0.6)
        .attr('y', 14)
        .attr('dx', 3)
        .attr('font-size', 10)
        .text((d, i) => "P" + i)
        .attr('font-family', 'Georgia')
}

function DrawLine(data3) {
    d3.csv("data/box_calc_rank.csv").then((data) => {
        if (Change_g != 0) {
            Change_g.remove();
            Change_g = 0;
        }
        Change_g = svgMatrix.append("g");


        // 节点数据
        let pointData = new Object();
        // preprocess
        for (let i = 1; i < 14; ++i) {
            if (!select[i]) continue;
            pointData[i] = new Object();
            for (let j = 0; j < type[i]; ++j) {
                pointData[i][j] = 0;
            }
        }


        // 将每一轮每个过程中的节点数目
        let maxPoint = -9999;
        let minPoint = 9999;
        for (let i = 0; i < data.length; ++i) {
            for (let j = 1; j < 14; ++j) {
                if (!select[j]) continue;
                pointData[j][parseInt(data[i][j])]++;
                maxPoint = Math.max(pointData[j][parseInt(data[i][j])], maxPoint);
                minPoint = Math.min(pointData[j][parseInt(data[i][j])], minPoint);
            }
        }


        // 定义比例尺
        let selectNum = 0;
        for (let i in select) {
            if (select[i]) {
                selectNum++;
            }
        }
        let yScale = d3.scaleLinear()
            .domain([1, selectNum])
            .range([30, heightMatrix - 10]);
        let sizeScale = d3.scaleLinear()
            .domain([minPoint, maxPoint])
            .range([3, 3]);

        let pointPaint = new Array();
        let cntPoint = 0;
        for (let i in pointData) {
            if (!select[i]) continue;
            cntPoint++;
            for (let j in pointData[i]) {
                if (pointData[i][j] == 0)
                    continue;
                pointPaint.push({
                    step: parseInt(i),
                    decision: parseInt(j),
                    size: pointData[i][j],
                    num: cntPoint,
                    cnt: 0
                });
            }
        }
        console.log(pointPaint);
        for (let i in data3) {
            let union = new Set();
            for (let j in data3[i].pattern) {
                union = new Set([...union, ...data3[i].pattern[j]]);
            }
            // console.log(union);
            for (let j of union) {
                // console.log(j);
                pointPaint[j - 3].cnt++;
            }
        }

        // // 连接线数据
        // let connectData = new Object();
        // // 节点数据
        // let pointData = new Object();
        // // preprocess
        // for (let i = 1; i < 14; ++i) {
        //     if (!select[i]) continue;
        //     pointData[i] = new Object();
        //     for (let j = 0; j < type[i]; ++j) {
        //         pointData[i][j] = 0;
        //     }
        // }

        // for (let i = 1; i < 14 - 1; ++i) {
        //     if (!select[i]) continue;
        //     connectData[i] = new Object();
        //     for (let j = 0; j < type[i]; ++j) {
        //         connectData[i][j] = new Object();
        //         for (let k = i + 1; k < 14; ++k) {
        //             if (!select[k]) continue;
        //             connectData[i][j][k] = new Object();
        //             for (let a = 0; a < type[k]; ++a) {
        //                 connectData[i][j][k][a] = 0;
        //             }
        //             break;
        //         }
        //     }
        // }
        // // 将每一轮每个过程中的节点数目
        // let maxPoint = -9999;
        // let minPoint = 9999;
        // for (let i = 0; i < data.length; ++i) {
        //     for (let j = 1; j < 14; ++j) {
        //         if (!select[j]) continue;
        //         pointData[j][parseInt(data[i][j])]++;
        //         maxPoint = Math.max(pointData[j][parseInt(data[i][j])], maxPoint);
        //         minPoint = Math.min(pointData[j][parseInt(data[i][j])], minPoint);
        //     }
        // }
        // // 计算每条连接线的数目
        // for (let i = 0; i < data.length; ++i) {
        //     for (let j = 1; j < 14 - 1; ++j) {
        //         if (!select[j]) continue;
        //         let f = 0;
        //         for (let k = j + 1; k < 14; ++k) {
        //             if (!select[k]) continue;
        //             connectData[j][parseInt(data[i][j])][k][parseInt(data[i][k])]++;
        //             break;
        //         }
        //     }
        // }

        // // 定义比例尺
        // let selectNum = 0;
        // for (let i in select) {
        //     if (select[i]) {
        //         selectNum++;
        //     }
        // }
        // let yScale = d3.scaleLinear()
        //     .domain([1, selectNum])
        //     .range([30, heightMatrix - 10]);
        // let sizeScale = d3.scaleLinear()
        //     .domain([minPoint, maxPoint])
        //     .range([3, 3]);

        // let pointPaint = new Array();
        // let cntPoint = 0;
        // for (let i in pointData) {
        //     if (!select[i]) continue;
        //     cntPoint++;
        //     for (let j in pointData[i]) {
        //         if (pointData[i][j] == 0)
        //             continue;
        //         pointPaint.push({
        //             step: parseInt(i),
        //             decision: parseInt(j),
        //             size: pointData[i][j],
        //             num: cntPoint
        //         });
        //     }
        // }

        // let cnt = 1;

        // let pointSelect = new Object();
        // let lineSelect1 = new Object();
        // let lineSelect2 = new Object();
        // let lineSelect3 = new Object();
        // let lineSelect4 = new Object();
        // for (let i = 1; i <= 13; ++i) {
        //     pointSelect[i] = new Object();
        //     lineSelect1[i] = new Object();
        //     lineSelect2[i] = new Object();
        //     lineSelect3[i] = new Object();
        //     lineSelect4[i] = new Object();
        //     for (let j = 0; j < type[i]; ++j) {
        //         pointSelect[i][j] = 0;
        //         lineSelect1[i][j] = 0;
        //         lineSelect2[i][j] = 0;
        //         lineSelect3[i][j] = 0;
        //         lineSelect4[i][j] = 0;
        //     }
        // }
        // for (let i = 0; i < data3.length; ++i) {
        //     if (patternSelect[i] == 0) continue;
        //     for (let j in data3[i]) {
        //         if (parseInt(data3[i][j]) == -1) continue;
        //         pointSelect[parseInt(j)][parseInt(data3[i][j])]++;
        //     }
        // }

        // // console.log(pointSelect);
        // let ConnectData = new Array();
        // for (let i = 0; i < data3.length; ++i) {
        //     if (patternSelect[i] == 0) continue;
        //     for (let j = 2; j <= 11; ++j) {
        //         if (data3[i][j] == -1 || data3[i][j - 1] == -1) continue;
        //         lineSelect1[parseInt(j - 1)][parseInt(data3[i][j - 1])]++;
        //         lineSelect2[parseInt(j - 1)][parseInt(data3[i][j - 1])]++;
        //         // lineSelect3[parseInt(j - 1)][parseInt(data3[i][j - 1])]++;
        //         // lineSelect1[parseInt(j)][parseInt(data3[i][j])]++;
        //         lineSelect3[parseInt(j)][parseInt(data3[i][j])]++;
        //         lineSelect4[parseInt(j)][parseInt(data3[i][j])]++;
        //         ConnectData.push({
        //             source: {
        //                 y: j - 1,
        //                 x: parseInt(data3[i][j - 1])
        //             },
        //             target: {
        //                 y: j,
        //                 x: parseInt(data3[i][j])
        //             },
        //             pattern: i
        //         });
        //     }
        //     if (data3[i][11] != -1 && data3[i][13] != -1) {
        //         ConnectData.push({
        //             source: {
        //                 y: 11,
        //                 x: parseInt(data3[i][11])
        //             },
        //             target: {
        //                 y: 13,
        //                 x: parseInt(data3[i][13])
        //             },
        //             pattern: i
        //         });
        //     }
        // }
        // ConnectData.sort(function (a, b) {
        //     if (a.source.y != b.source.y) {
        //         return a.source.y - b.source.y;
        //     }
        //     if (a.source.x != b.source.x) {
        //         return a.source.x - b.source.x;
        //     }
        //     if (a.target.y != b.target.y) {
        //         return a.target.y - b.target.y;
        //     }
        //     if (a.target.x != b.target.x) {
        //         return a.target.x - b.target.x;
        //     }
        // })
        // var diagonal = d3.linkVertical()
        //     .x(function (d) {
        //         return d.y
        //     })
        //     .y(function (d) {
        //         return d.x
        //     });
        // let ConData = new Array();
        // for (let i in ConnectData) {
        //     let y1 = yScale((ConnectData[i].source.y == 13 ? ConnectData[i].source.y - 2 : ConnectData[i].source.y - 1));
        //     let y2 = yScale((ConnectData[i].target.y == 13 ? ConnectData[i].target.y - 2 : ConnectData[i].target.y - 1));
        //     let h = widthMatrix;
        //     let step1 = h / (type[ConnectData[i].source.y] + 1);
        //     let step2 = h / (type[ConnectData[i].target.y] + 1);
        //     let x1 = (ConnectData[i].source.x + 1) * step1;
        //     let x2 = (ConnectData[i].target.x + 1) * step2;
        //     // console.log(ConnectData[i]);
        //     // if (x1 == x2) {
        //     x1 = x1 - 2 * (lineSelect1[ConnectData[i].source.y][ConnectData[i].source.x] - 1) / 2 + (--lineSelect2[ConnectData[i].source.y][ConnectData[i].source.x]) * 2;
        //     x2 = x2 - 2 * (lineSelect3[ConnectData[i].target.y][ConnectData[i].target.x] - 1) / 2 + (--lineSelect4[ConnectData[i].target.y][ConnectData[i].target.x]) * 2;
        //     // }
        //     ConData.push({
        //         source: {
        //             y: x1,
        //             x: y1
        //         },
        //         target: {
        //             y: x2,
        //             x: y2
        //         },
        //         pattern: ConnectData[i].pattern
        //     })
        // }

        // decisionDiagonal = Change_g.append("g")
        //     .selectAll("#decisionDiagonal")
        //     .attr("id", "decisionDiagonal")
        //     .data(ConData)
        //     .enter()
        //     .append("path")
        //     .attr("d", d => {
        //         // console.log(d);
        //         return diagonal(d);
        //     })
        //     .attr("fill", "none")
        //     .attr("stroke", d => typeColor[d.pattern])
        //     .attr("stroke-width", 2)
        //     .attr('stroke-opacity', 0.6);

        // let patternCircle = new Array();

        // for (let i = 0; i < data3.length; ++i) {
        //     if (patternSelect[i] == 0) continue;
        //     for (let j in data3[i]) {
        //         if (parseInt(data3[i][j]) == -1) continue;
        //         let h = widthMatrix;
        //         let step = h / (type[parseInt(j)] + 1);
        //         patternCircle.push({
        //             cx: (parseInt(data3[i][j]) + 1) * step,
        //             cy: yScale((j == '13' ? parseInt(j) - 2 : parseInt(j) - 1)),
        //             r: 3 + 2 * pointSelect[parseInt(j)][parseInt(data3[i][j])],
        //             pattern: parseInt(i)
        //         })
        //         // Sankey_g.append('circle')
        //         //     .attr('cx', (parseInt(data3[i][j]) + 1) * step)
        //         //     .attr('cy', yScale((j == '13' ? parseInt(j) - 2 : parseInt(j) - 1)))
        //         //     .attr('r', 3 + 2 * pointSelect[parseInt(j)][parseInt(data3[i][j])])
        //         //     .attr('fill', typeColor[parseInt(i)]);
        //         pointSelect[parseInt(j)][parseInt(data3[i][j])]--;
        //     }
        // }

        // patternCir = Change_g.selectAll('#patternCircle')
        //     .attr('id', 'patternCircle')
        //     .data(patternCircle)
        //     .enter().append("circle")
        //     .attr('cx', d => d.cx)
        //     .attr('cy', d => d.cy)
        //     .attr('r', d => d.r)
        //     .attr('fill', d => typeColor[d.pattern])
        //     .attr('fill-opacity', 1);

        let select_circle_data = new Array();
        for (let i in pointPaint) {
            for (let j = 1; j <= pointPaint[i].cnt; ++j) {
                select_circle_data.push({
                    step: pointPaint[i].step,
                    decision: pointPaint[i].decision,
                    size: pointPaint[i].size,
                    num: pointPaint[i].num,
                    cnt: parseInt(j)
                });
            }
        }
        console.log(select_circle_data);


        let decisionPointSelect = Change_g.selectAll("#typeCircle")
            .attr('id', 'typeCircle')
            .data(pointPaint)
            .enter()
            .append("circle")
            .attr("cy", d => yScale(d.num))
            .attr("cx", (d, i) => {
                let h = widthMatrix;
                let step = h / (type[d.step] + 1);
                return (d.decision + 1) * step;
            })
            .attr("r", d => sizeScale(d.size) + d.cnt * 2)
            // .attr("fill", "rgb(237, 237, 238)");
            .attr('fill', d => typeColor[d.cnt - 1])
        // .attr("fill", 'red');
        let decisionPoint = Change_g.selectAll("#typeCircle")
            .attr('id', 'typeCircle')
            .data(pointPaint)
            .enter()
            .append("circle")
            .attr("cy", d => yScale(d.num))
            .attr("cx", (d, i) => {
                let h = widthMatrix;
                let step = h / (type[d.step] + 1);
                return (d.decision + 1) * step;
            })
            .attr("r", d => sizeScale(d.size))
            // .attr("fill", "rgb(237, 237, 238)");
            .attr('fill', '	#D3D3D3')
        // .attr("fill", 'red');
    })
}