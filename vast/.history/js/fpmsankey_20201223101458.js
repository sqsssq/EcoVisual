var width = 2500,
    height = 2500;

var svg;

svg = d3.select("#container").append("svg")
    .attr("width", width)
    .attr("height", height)

var type = [0, 2, 3, 3, 2, 2, 2, 2, 4, 2, 4, 2, 3, 7]
var select = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

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
        for (let i = 2; i < 14; ++i) {
            connectData[i - 1] = new Object();
            for (let j = 0; j < type[i - 1]; ++j) {
                connectData[i - 1][j] = new Object();
                connectData[i - 1][j][i] = new Object();
                for (let k = 0; k < type[i]; ++k) {
                    connectData[i - 1][j][i][k] = 0;
                }
            }
        }
        // 将每一轮每个过程中的节点数目
        for (let i = 0; i < data.length; ++i) {
            for (let j = 1; j < 14; ++j) {
                pointData[j][parseInt(data[i][j])]++;
            }
        }
        // 计算每条连接线的数目
        for (let i = 0; i < data.length; ++i) {
            for (let j = 2; j < 14; ++j) {
                connectData[j - 1][parseInt(data[i][j - 1])][j][parseInt(data[i][j])]++;
            }
        }
        // 定义比例尺
        let xScale = d3.scaleLinear()
            .domain([1, 20])
            .range([10, width - 50]);
        
    })
}
paint();