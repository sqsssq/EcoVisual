const heightIndividual = document.getElementById("individual").offsetHeight;
const widthIndividual = document.getElementById("individual").offsetWidth;

function drawWealthLine() {
    d3.csv('data/data_for_line.csv').then(wealth_data => {
        this.height = heightIndividual / 4;
        this.width = widthIndividual;
        const svgWealth = d3.select('#individual').append('svg')
            .attr('height', this.height)
            .attr('width', this.width);
        const wealth_g = svgWealth.append('g');
        // console.log(wealth_data);
        const nameSpace = new Object();
        wealth_data.forEach(function(d) {
            if (typeof (nameSpace[d.code]) == 'undefined')
            {
                nameSpace[d.code] = {
                    round: new Object(),
                    wealth: new Array(),
                    id: d.code,
                };
            }
            nameSpace[d.code]['round'][d.biao] = d['119'];
        })
        
    })
}
drawWealthLine();