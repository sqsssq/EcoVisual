var width = 3500,
    height = 1500;

var svg;

svg = d3.select("#container").append("svg")
    .attr("width", width)
    .attr("height", height)

var type = [0, 2, 3, 3, 2, 2, 2, 2, 4, 2, 4, 2, 3, 7]
var select = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

function paint() {
    d3.csv("data/box_calc_rank.csv").then((data) => {
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
        // 计算每条连接线的数目
        for (let i = 0; i < data.length; ++i) {
            for (let j = 1; j < 14 - 1; ++j) {
                if (!select[j]) continue;
                let f = 0;
                for (let k = j + 1; k < 14; ++k) {
                    if (!select[k]) continue;
                    connectData[j][parseInt(data[i][j])][k][parseInt(data[i][k])]++;
                    break;
                }
            }
        }

        // 定义比例尺
        let selectNum = 0;
        for (let i in select) {
            if (select[i]) {
                selectNum++;
            }
        }
        let xScale = d3.scaleLinear()
            .domain([1, selectNum])
            .range([100, width - 50]);
        let sizeScale = d3.scaleLinear()
            .domain([minPoint, maxPoint])
            .range([10, 50]);

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

        let connectPaint = new Array();
        let cntConnect = 0;
        for (let i = 1; i < 13; ++i) {
            if (!select[i]) continue;
            cntConnect++;
            for (let j = 0; j < type[j]; ++j) {
                for (let k = i + 1; k < 14; ++k) {
                    if (!select[k]) continue;
                    for (let a = 0; a < type[k]; ++a) {
                        console.log(onnectData[i][j][k][a])
                        if (connectData[i][j][k][a] == 0) continue;
                        let x1 = xScale(cntConnect);
                        let x2 = xScale(cntConnect + 1);
                        let h = height;
                        let step1 = h / (type[i] + 1);
                        let step2 = h / (type[k] + 1);
                        let y1 = (j + 1) * step1;
                        let y2 = (a + 1) * step2;
                        connectPaint.push({
                            source: {
                                x: x1,
                                y: y1
                            },
                            target: {
                                x: x2,
                                y: y2
                            },
                            size: connectData[i][j][k][a]
                        });
                    }
                    break;
                }
            }
        }

        console.log(connectPaint);

        var diagonal = d3.linkHorizontal()
            .x(function(d) { return d.y })
            .y(function(d) { return d.x });

        let decisionDiagonal = svg.append("g")
            .selectAll("#decisionDiagonal")
            .attr("id", "decisionDiagonal")
            .data(connectPaint)
            .enter()
            .append("path")
            .attr("d", d => {
                console.log(d);
                return diagonal(d);
            })
            .attr("fill", "none")
            .attr("stroke", "#666")
            .attr("stroke-width", d => sizeScale(d.size));

        // 绘制节点
        let decisionPoint = svg.append("g")
            .selectAll("#decision")
            .attr("id", "decision")
            .data(pointPaint)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.num))
            .attr("cy", (d, i) => {
                let h = height;
                let step = h / (type[d.step] + 1);
                return (d.decision + 1) * step;
            })
            .attr("r", d => sizeScale(d.size))
            .attr("fill", "red");
    })
}
paint();