var widtha = 800;
var heighta = 800;
let ssvg;

function PP() {
    ssvg = d3.select("#Tsne").append("svg")
        .attr('id', 'SView')
        .attr("width", widtha)
        .attr("height", heighta)
        // .append('g')
        // .call(zoom)
        // .append('g')
        // .attr('class', 'zoomg')
        // .append("g")
        // // .attr("transform", "translate(0,100)")
        .attr("transform", "translate(-10, 10)");
}
PP()

let matrixG = 0;

let decisionTypeNumber = [0, 2, 3, 3, 2, 2, 2, 2, 4, 2, 4, 2, 3, 7];

function DrawMatrix() {
    d3.csv('data/box_calc.csv').then((data) => {
        // console.log(data);
        let rectNumber = 20 * 13;
        let rectMatrix = [];
        for (let i = 1; i <= rectNumber; ++i) {
            rectMatrix.push(i);
        }
        // console.log(rectMatrix);
        matrixG = ssvg.append('g')
            .attr("transform", "translate(" + 100 + "," + 45 + ")");

        matrixG.selectAll('#ma')
            .attr('id', 'ma')
            .data(rectMatrix)
            .enter()
            .append('rect')
            .attr('x', (d, i) => (d - 1) % 13 * 32)
            .attr('y', (d, i) => parseInt((d - 1) / 13) * 32)
            .attr('width', 25)
            .attr('height', 25)
            .attr('fill', 'none')
            .attr('stroke', 'black');

        matrixG.selectAll('#ml')
            .attr('id', 'ml')
            .data(rectMatrix)
            .enter()
            .append('line')
            .attr('x1', (d, i) => (d - 1) % 13 * 32)
            .attr('x2', (d, i) => (d - 1) % 13 * 32 + 25)
            .attr('y1', (d, i) => parseInt((d - 1) / 13) * 32 + 25 / 2)
            .attr('y2', (d, i) => parseInt((d - 1) / 13) * 32 + 25 / 2)
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 0.5)

        let matrixScale = d3.scaleLinear()
            .domain([0, 304])
            .range([0, 25 / 2]);

        let lineData = new Object();
        for (let i = 1; i <= 20; ++i) {
            lineData[i] = new Object();
            for (let j = 1; j <= 13; ++j) {
                lineData[i][j] = new Object();
                for (let k = 0; k < decisionTypeNumber[j]; ++k) {
                    lineData[i][j][k] = new Object();
                    lineData[i][j][k][1] = 0;
                    lineData[i][j][k][0] = 0;
                    lineData[i][j][k][-1] = 0;
                }
            }
        }
        for (let i = 0; i < 6080; ++i) {
            // console.log(i)
            // console.log(data[i]);
            let lun = parseInt(data[i].biao);
            for (let j = 1; j <= 13; ++j) {
                lineData[lun][j][parseInt(data[i][j.toString()])][0]++;
                if (parseFloat(data[i][j.toString() + (9).toString()]) > 0) {
                    lineData[lun][j][data[i][j.toString()]][1]++;
                } else {
                    lineData[lun][j][data[i][j.toString()]][-1]++;
                }
            }
        }
        let calcData = new Array();
        for (let i = 1; i <= 20; ++i) {
            for (let j = 1; j <= 13; ++j) {
                for (let k in lineData[i][j]) {
                    calcData.push({
                        lun: i,
                        dec: j,
                        type: k,
                        sumType: 1,
                        sum: lineData[i][j][k][1]
                    });
                    calcData.push({
                        lun: i,
                        dec: j,
                        type: k,
                        sumType: -1,
                        sum: lineData[i][j][k][-1]
                    });
                }
            }
        }
        matrixG.selectAll('#ml2')
        .attr('id', 'ml2')
        .data(calcData)
        .enter()
        .append('line')
        .attr('x1', (d, i) => {
            return d.type * 25 / (decisionTypeNumber[d.dec] + 1) + 25 / (decisionTypeNumber[d.dec] + 1) + (d.dec - 1) * 32;
        })
        .attr('x2', (d, i) => {
            return d.type * 25 / (decisionTypeNumber[d.dec] + 1) + 25 / (decisionTypeNumber[d.dec] + 1) + (d.dec - 1) * 32;
        })
        .attr('y1', (d, i) => {
            return (d.lun - 1) * 32 + 25 / 2;
        })
        .attr('y2', (d, i) => {
            let len = matrixScale(d.sum);
            if (d.sumType == 1)
                return (d.lun - 1) * 32 + 25 / 2 - len;
            else 
                return (d.lun - 1) * 32 + 25 / 2 + len;
        })
        .attr('fill', 'none')
        .attr('stroke', (d, i) => {
            if (d.sumType == 1)
                return '#41CA77';
            else
                return '#D8483E';
        })
        .attr('stroke-width', 5)
        console.log(calcData)
    });
}
DrawMatrix();