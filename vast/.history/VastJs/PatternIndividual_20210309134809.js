const heightIndividual = document.getElementById("individual").offsetHeight;
const widthIndividual = document.getElementById("individual").offsetWidth;

function drawWealthLine() {
    d3.csv('data/data_for_line.csv').then(wealth_data => {
        this.height = heightIndividual / 4;
        this.width = widthIndividual;
        this.min_wealth = -600;
        this.max_wealth = 600;
        this.margin = {
            left: 10,
            right: 10,
            top: 30,
            bottom: 10
        }
        const svgWealth = d3.select('#individual').append('svg')
            .attr('height', this.height)
            .attr('width', this.width);
        const wealth_g = svgWealth.append('g');
        // console.log(wealth_data);
        const nameSpace = new Object();
        wealth_data.forEach(function (d) {
            if (typeof (nameSpace[d.code]) == 'undefined') {
                nameSpace[d.code] = {
                    round: new Object(),
                    wealth: [{
                        x: 0,
                        y: 0
                    }],
                    id: d.code,
                };
            }
            if (parseFloat(d['119']) < -600) d['119'] = -600;
            if (parseFloat(d['119']) > 600) d['119'] = 600;
            nameSpace[d.code]['round'][d.biao] = parseFloat(d['119']);
            nameSpace[d.code]['wealth'].push({
                x: parseInt(d.biao),
                y: parseFloat(d['119'])
            });
        })
        let x_scale_wealth = d3.scaleLinear()
            .domain([this.max_wealth, this.min_wealth])
            .range([this.top, this.height - this.bottom]);
        this.y_scale_wealth = d3.scaleLinear()
            .domain([0, 20])
            .range([this.left, this.width - this.right])
            console.log(x_scale_wealth.domain());
        this.lineBuilder = d3.line()
            .x((d, i) => this.x_scale_wealth(d.x))
            .y((d, i) => this.y_scale_wealth(d.y))
            .curve(d3.curveMonotoneX);
        wealth_g.selectAll('#wg')
            .attr('id', 'wg')
            .data(Object.keys(nameSpace))
            .enter()
            .append('path')
            .attr('d', d => {
                // console.log(nameSpace[d].wealth);
                return this.lineBuilder(nameSpace[d].wealth);
            })
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-opacity', 0.1)
            .attr('stroke-width', 0.5);
    })
}
drawWealthLine();