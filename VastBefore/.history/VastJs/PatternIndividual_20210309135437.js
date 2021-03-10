const heightIndividual = document.getElementById("individual").offsetHeight;
const widthIndividual = document.getElementById("individual").offsetWidth;

function drawWealthLine() {
    d3.csv('data/data_for_line.csv').then(wealth_data => {
        this.height = heightIndividual / 4;
        this.width = widthIndividual;
        this.min_wealth = -600;
        this.max_wealth = 600;
        this.margin = {
            left: 50,
            right: 50,
            top: 20,
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
        this.y_scale_wealth = d3.scaleLinear()
            .domain([this.max_wealth, this.min_wealth])
            .range([this.margin.top, this.height - this.margin.bottom]);
        this.x_scale_wealth = d3.scaleLinear()
            .domain([0, 20])
            .range([this.margin.left, this.width - this.margin.right])
        console.log(this.x_scale_wealth.range());
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

        //X轴
        wealth_g.append("g")
            .call(d3.axisBottom(this.x_scale_wealth).ticks(0))
            .attr("transform", "translate(0," + this.y_scale_wealth(0) + ")");

        //Y轴
        wealth_g.append("g")
            .call(d3.axisLeft(this.y_scale_wealth).ticks(5))
            .attr("transform", "translate(" + this.x_scale_wealth(0) + "," + 0 + ")")
    })
}
drawWealthLine();