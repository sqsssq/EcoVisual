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
            pointData[i] = new Object();
            for (let j = 0; j < type[i]; ++j) {
                pointData[i][j] = 0;
            }
        }
        // for (let i = 2; i < 14; ++i) {
        //     connectData[i - 1] = new Object();
        //     for (let j = 0; j < type[i - 1]; ++j) {
        //         connectData[i - 1][j] = new Object();
        //         connectData[i - 1][j][i] = new Object();
        //         for (let k = 0; k < type[i]; ++k) {
        //             connectData[i - 1][j][i][k] = 0;
        //         }
        //     }
        // }
        for (let i = 1; i < 14 - 1; ++i) {
            connectData[i] = new Object();
            for (let j = 0; j < type[i]; ++j) {
                connectData[i][j] = new Object();
                for (let k = i + 1; k < 14; ++k) {
                    connectData[i][j][k] = new Object();
                    for (let a = 0; a < type[k]; ++a) {
                        connectData[i][j][k][a] = 0;
                    }
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
        console.log(width, minPoint, maxPoint);
        // 定义比例尺
        let xScale = d3.scaleLinear()
            .domain([1, 13])
            .range([50, width - 50]);
        let sizeScale = d3.scaleLinear()
            .domain([minPoint, maxPoint])
            .range([10, 30]);

        let pointPaint = new Array();
        for (let i in pointData) {
            for (let j in pointData[i]) {
                if (pointData[i][j] == 0)
                    continue;
                pointPaint.push({
                    step: parseInt(i),
                    decision: parseInt(j),
                    size: pointData[i][j]
                });
            }
        }

        let decisionPoint = svg.append("g").selectAll("#decision")
            .attr("id", "decision")
            .data(pointPaint)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.step))
            .attr("cy", (d, i) => {
                console.log(d.step)
                let h = height;
                let step = h / (type[d.step] + 1);
                return (d.decision + 1) * step;
            })
            .attr("r", d => sizeScale(d.size))
            .attr("fill", "red")
    })
}
paint();