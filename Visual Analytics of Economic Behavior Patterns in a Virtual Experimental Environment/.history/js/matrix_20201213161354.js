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

        let matrixScale = d3.scaleLinear()
            .domain([0, 304])
            .range([0, 25 / 2]);

        let lineData = new Object();
        for (let i = 1; i <= 20; ++i)
        {
            lineData[i] = new Object();
            for (let j = 1; j <= 13; ++j)
            {
                lineData[i][j] = new Object();
                lineData[i][j][1] = 0;
                lineData[i][j][0] = 0;
                lineData[i][j][-1] = 0;
            }
        }
    });
}
DrawMatrix();