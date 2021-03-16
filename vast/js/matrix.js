var widtha = 800;
var heighta = 1500;
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

function H(C) {
    var sum_num = 0;
    for (let i in C) {
        sum_num += C[i].length;
    }
    var result = 0;
    for (let i in C) {
        if (C[i].length != 0)
            result += (C[i].length / sum_num) * Math.log(C[i].length / sum_num);
    }
    return -result;
}


function I(C1, C2) {
    function both(arr1, arr2) {
        arr3 = arr1.filter(function (num) {
            return arr2.indexOf(num) !== -1;
        });
        return arr3.length;
    }
    var sum_num = 0;
    for (let i in C1) {
        sum_num += C1[i].length;
    }
    var result = 0;
    for (let i in C1) {
        for (let j in C2) {
            if (C1[i].length != 0 && C2[j].length != 0 && both(C1[i], C2[j]) != 0) {
                result += (both(C1[i], C2[j]) * Math.log(both(C1[i], C2[j]) / ((C1[i].length / sum_num) * (C2[j].length / sum_num))));
            }
        }
    }
    return result;
}

function DrawMatrix() {
    d3.csv('data/box_calc.csv').then((data) => {

        let step = 40;
        let rectW = 25;

        // console.log(data);
        let rectNumber = 20 * 13;
        let rectMatrix = [];
        for (let i = 1; i <= rectNumber; ++i) {
            rectMatrix.push(i);
        }
        // console.log(rectMatrix);
        matrixG = ssvg.append('g')
            .attr("transform", "translate(" + 100 + "," + 45 + ")");

        // matrixG.selectAll('#ma')
        //     .attr('id', 'ma')
        //     .data(rectMatrix)
        //     .enter()
        //     .append('rect')
        //     .attr('x', (d, i) => (d - 1) % 13 * step)
        //     .attr('y', (d, i) => parseInt((d - 1) / 13) * step)
        //     .attr('width', rectW)
        //     .attr('height', rectW)
        //     .attr('fill', 'none')
        //     .attr('stroke', 'black');

        // matrixG.selectAll('#ml')
        //     .attr('id', 'ml')
        //     .data(rectMatrix)
        //     .enter()
        //     .append('line')
        //     .attr('x1', (d, i) => (d - 1) % 13 * step)
        //     .attr('x2', (d, i) => (d - 1) % 13 * step + rectW)
        //     .attr('y1', (d, i) => parseInt((d - 1) / 13) * step + rectW / 2)
        //     .attr('y2', (d, i) => parseInt((d - 1) / 13) * step + rectW / 2)
        //     .attr('fill', 'none')
        //     .attr('stroke', 'black')
        //     .attr('stroke-width', 0.5)

        let matrixScale = d3.scaleLinear()
            .domain([0, 6080])
            .range([0, rectW / 2]);

        let lineData = new Object();
        let lineDataX = new Object();
        lineDataX[0] = new Object();
        for (let j = 1; j <= 13; ++j) {
            lineDataX[0][j] = new Object();
            lineDataX[0][j]['type'] = new Array();
            lineDataX[0][j]['money'] = [
                [],
                []
            ];
            for (let k = 0; k < decisionTypeNumber[j]; ++k) {
                lineDataX[0][j]['type'].push([]);
                lineDataX[0][j][k] = new Object();
                lineDataX[0][j][k][1] = 0;
                lineDataX[0][j][k][0] = 0;
                lineDataX[0][j][k][-1] = 0;
                // lineDataX[0][j][k]['people'] = new Array();
            }
        }
        for (let i = 1; i <= 20; ++i) {
            lineData[i] = new Object();
            for (let j = 1; j <= 13; ++j) {
                lineData[i][j] = new Object();
                lineData[i][j]['type'] = new Array();
                lineData[i][j]['money'] = [
                    [],
                    []
                ];
                for (let k = 0; k < decisionTypeNumber[j]; ++k) {
                    lineData[i][j]['type'].push([]);
                    lineData[i][j][k] = new Object();
                    lineData[i][j][k][1] = 0;
                    lineData[i][j][k][0] = 0;
                    lineData[i][j][k][-1] = 0;
                    // lineData[i][j][k]['people'] = new Array();
                }
            }
        }

        for (let i = 0; i < 6080; ++i) {
            // console.log(i)
            // console.log(data[i]);
            let lun = parseInt(data[i].biao);
            for (let j = 1; j <= 13; ++j) {
                lineData[lun][j][parseInt(data[i][j.toString()])][0]++;
                lineData[lun][j]['type'][parseInt(data[i][j.toString()])].push(data[i].code);
                if (parseFloat(data[i][j.toString() + (9).toString()]) > 0) {
                    lineData[lun][j][data[i][j.toString()]][1]++;
                    lineData[lun][j]['money'][1].push(data[i].code);
                } else {
                    lineData[lun][j][data[i][j.toString()]][-1]++;
                    lineData[lun][j]['money'][0].push(data[i].code);
                }
            }
        }

        // !
        for (let i = 0; i < 6080; ++i) {
            // console.log(i)
            // console.log(data[i]);
            let lun = 0;
            for (let j = 1; j <= 13; ++j) {
                lineDataX[lun][j][parseInt(data[i][j.toString()])][0]++;
                lineDataX[lun][j]['type'][parseInt(data[i][j.toString()])].push(data[i].code);
                if (parseFloat(data[i][j.toString() + (9).toString()]) > 0) {
                    lineDataX[lun][j][data[i][j.toString()]][1]++;
                    lineDataX[lun][j]['money'][1].push(data[i].code);
                } else {
                    lineDataX[lun][j][data[i][j.toString()]][-1]++;
                    lineDataX[lun][j]['money'][0].push(data[i].code);
                }
            }
        }



        var diff = new Array();
        // let VImax = -999999999;
        console.log(lineDataX);

        for (let i in lineData) {
            for (let j in lineData[i]) {
                // console.log(lineData[i][j]['type']);
                var VI = H(lineData[i][j]['type']) + H(lineData[i][j]['money']) - 2 * I(lineData[i][j]['type'], lineData[i][j]['money']);
                diff.push(VI);
            }
        }

        var diffH = new Array();
        // let VImax = -999999999;

        for (let i in lineData) {
            for (let j in lineData[i]) {
                if (j == 1) continue;
                // console.log(lineData[i][j]['type']);
                var VI = H(lineData[i][j]['type']) + H(lineData[i][j - 1]['type']) - 2 * I(lineData[i][j]['type'], lineData[i][j - 1]['type']);
                diffH.push(VI);
            }
        }


        var diffS = new Array();
        // let VImax = -999999999;

        for (let i in lineData) {
            for (let j in lineData[i]) {
                if (i == 1) continue;
                // console.log(lineData[i][j]['type']);
                var VI = H(lineData[i][j]['type']) + H(lineData[i - 1][j]['type']) - 2 * I(lineData[i][j]['type'], lineData[i - 1][j]['type']);
                diffS.push(VI);
            }
        }

        // !
        var diffX = new Array();
        // let VImax = -999999999;
        console.log(lineDataX);

        for (let i in lineDataX) {
            for (let j in lineDataX[i]) {
                // console.log(lineDataX[i][j]['type']);
                var VI = H(lineDataX[i][j]['type']) + H(lineDataX[i][j]['money']) - 2 * I(lineDataX[i][j]['type'], lineDataX[i][j]['money']);
                diffX.push(VI);
            }
        }

        var diffHX = new Array();
        // let VImax = -999999999;

        for (let i in lineDataX) {
            for (let j in lineDataX[i]) {
                if (j == 1) continue;
                // console.log(lineDataX[i][j]['type']);
                var VI = H(lineDataX[i][j]['type']) + H(lineDataX[i][j - 1]['type']) - 2 * I(lineDataX[i][j]['type'], lineDataX[i][j - 1]['type']);
                diffHX.push(VI);
            }
        }

        console.log(diffHX)
        console.log(diffX)


        var colorScale = d3.scaleLinear()
            .domain([d3.min(diff), d3.max(diff)])
            .range([0.1, 5]);

        var hScale = d3.scaleLinear()
            .domain([d3.min(diffHX), d3.max(diffHX)])
            .range([1, 20]);

        var sScale = d3.scaleLinear()
            .domain([d3.min(diffS), d3.max(diffS)])
            .range([1, 20]);

        var sumScale = d3.scaleLinear()
            .domain([Math.min(d3.min(diffS), d3.min(diffH)), Math.max(d3.max(diffS), d3.max(diffH))])
            .range([1, 20]);

        matrixG.selectAll('#mas')
            .attr('id', 'mas')
            .data(diffX)
            .enter()
            .append('rect')
            .attr('x', (d, i) => (i) % 13 * step)
            .attr('y', (d, i) => parseInt((i) / 13) * step)
            .attr('width', rectW)
            .attr('height', rectW)
            .attr('fill', 'none')
            .attr('rx', 3)

            // .attr('fill-opacity', (d, i) => colorScale(d))
            .attr('stroke-width', d => colorScale(d))
            .attr('stroke', 'black');

        matrixG.selectAll('#mlh')
            .attr('id', 'mlh')
            .data(diffHX)
            .enter()
            .append('line')
            .attr('x1', (d, i) => (i) % 12 * step + rectW)
            .attr('x2', (d, i) => (i) % 12 * step + rectW + (step - rectW))
            .attr('y1', (d, i) => parseInt((i) / 12) * step + rectW / 2)
            .attr('y2', (d, i) => parseInt((i) / 12) * step + rectW / 2)
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', d => hScale(d))
            .attr('stroke-opacity', 0.3)
        // matrixG.selectAll('#mls')
        //     .attr('id', 'mls')
        //     .data(diffS)
        //     .enter()
        //     .append('line')
        //     .attr('x1', (d, i) => (i) % 13 * step + rectW / 2)
        //     .attr('x2', (d, i) => (i) % 13 * step + rectW / 2)
        //     .attr('y1', (d, i) => parseInt((i) / 13) * step + rectW)
        //     .attr('y2', (d, i) => parseInt((i) / 13) * step + rectW + (step - rectW))
        //     .attr('fill', 'none')
        //     .attr('stroke', 'black')
        //     .attr('stroke-width', d => sumScale(d))
        //     .attr('stroke-opacity', 0.3)





        let calcData = new Array();
        // for (let i = 1; i <= 20; ++i) {
            for (let j = 1; j <= 13; ++j) {
                let i = 0;
                for (let k in lineDataX[i][j]) {
                    if (k == 'type' || k == 'money') continue;
                    calcData.push({
                        lun: i,
                        dec: j,
                        type: k,
                        sumType: 1,
                        sum: lineDataX[i][j][k][1]
                    });
                    calcData.push({
                        lun: i,
                        dec: j,
                        type: k,
                        sumType: -1,
                        sum: lineDataX[i][j][k][-1]
                    });
                }
            }
        // }

        // console.log(lineData)
        matrixG.selectAll('#ml2')
            .attr('id', 'ml2')
            .data(calcData)
            .enter()
            .append('line')
            .attr('x1', (d, i) => {
                return d.type * rectW / (decisionTypeNumber[d.dec] + 1) + rectW / (decisionTypeNumber[d.dec] + 1) + (d.dec - 1) * step;
            })
            .attr('x2', (d, i) => {
                return d.type * rectW / (decisionTypeNumber[d.dec] + 1) + rectW / (decisionTypeNumber[d.dec] + 1) + (d.dec - 1) * step;
            })
            .attr('y1', (d, i) => {
                return (d.lun - 1) * step + rectW / 2;
            })
            .attr('y2', (d, i) => {
                let len = matrixScale(d.sum);
                if (d.sumType == 1)
                    return (d.lun - 1) * step + rectW / 2 - len;
                else
                    return (d.lun - 1) * step + rectW / 2 + len;
            })
            .attr('fill', 'none')
            .attr('stroke', (d, i) => {
                if (d.sumType == 1)
                    return '#41CA77';
                else
                    return '#D8483E';
            })
            .attr('stroke-width', 5)
        // console.log(calcData)
        for (let i = 1; i <= 13; ++i) {
            matrixG.append('text')
                .attr('x', (i - 1) * step + rectW / 2)
                .attr('y', -3)
                .attr('text-anchor', 'middle')
                .text(i)
        }

        for (let i = 1; i <= 20; ++i) {
            matrixG.append('text')
                .attr('x', -10)
                .attr('y', (i - 1) * step)
                .attr('dy', '1.2em')
                .attr('text-anchor', 'middle')
                .text(i)
        }
    });
}
DrawMatrix();