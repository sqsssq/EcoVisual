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
    });
}
DrawMatrix();