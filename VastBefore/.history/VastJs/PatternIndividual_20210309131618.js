const heightIndividual = document.getElementById("individual").offsetHeight;
const widthIndividual = document.getElementById("individual").offsetWidth;

function drawWealthLine() {
    d3.csv('data/data_for_line.csv').then(wealth_data => {
        this.height = heightIndividual / 4;
        this.width = widthIndividual;
        const svgWealth = d3.select('#individual').append('svg')
            .attr('height', this.height)
            .attr('width', this.width);
        
    })
}
drawWealthLine();