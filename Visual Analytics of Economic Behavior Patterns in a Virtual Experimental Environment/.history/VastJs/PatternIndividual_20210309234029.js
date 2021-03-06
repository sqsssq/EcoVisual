const heightIndividual = document.getElementById("individual").offsetHeight;
const widthIndividual = document.getElementById("individual").offsetWidth;

function drawWealthLine() {
    d3.csv('data/data_for_line.csv').then(wealth_data => {
        this.height = heightIndividual;
        this.width = widthIndividual;
        this.min_wealth = -600;
        this.max_wealth = 600;
        this.margin = {
            left: 130,
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
        // console.log(this.x_scale_wealth.range());
        this.lineBuilder = d3.line()
            .x((d, i) => this.x_scale_wealth(d.x))
            .y((d, i) => this.y_scale_wealth(d.y))
            .curve(d3.curveMonotoneX);
        wealth_g.selectAll('#wg')
            .attr('id', 'wg')
            .data(Object.keys(nameSpace))
            .enter()
            .append('path')
            .attr('id', d => {
                return 'line' + d;
            })
            .attr('d', d => {
                // console.log(nameSpace[d].wealth);
                return this.lineBuilder(nameSpace[d].wealth);
            })
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-opacity', 0.1)
            .attr('stroke-width', 1);

        //X轴
        wealth_g.append("g")
            .call(d3.axisBottom(this.x_scale_wealth).ticks(0))
            .attr("transform", "translate(0," + this.y_scale_wealth(0) + ")");

        //Y轴
        wealth_g.append("g")
            .call(d3.axisLeft(this.y_scale_wealth).ticks(5))
            .attr("transform", "translate(" + this.x_scale_wealth(0) + "," + 0 + ")");
        for (let i = 1; i <= 20; ++i) {
            wealth_g.append('text')
                .attr('x', this.x_scale_wealth(i))
                .attr('y', 10)
                .attr('text-anchor', 'middle')
                .text(i)
        }
        wealth_g.append('text')
            .attr('x', this.x_scale_wealth(0))
            .attr('y', 10)
            .attr('font-family', 'Georgia')
            .attr('text-anchor', 'middle')
            .text('Total Wealth');

        // d3.select("#individual")
        //     .append('div')
        //     .attr('id', 'flowerView')
        //     // .style("overflow-x", "hidden")
        //     .attr('height', heightIndividual - (this.height - this.margin.bottom + 10))
        //     .style('overflow-y', 'scroll');
    })
}
const heightFlower = document.getElementById("flowerView").offsetHeight;
const widthFlower = document.getElementById("flowerView").offsetHeight;
console.log(widthFlower)
// const max_gain = 
function drawFlower(code) {
    d3.csv('data/data_for_line.csv').then(wealth_data => {
        const personal_data = new Array();
        for (let i in wealth_data) {
            if (wealth_data[i].code == code) {
                personal_data.push(wealth_data[i]);
            }
        }
        console.log(personal_data);
        const svgFlower = d3.select('#flowerView')
            .append('svg')
            .attr('width', widthIndividual)
            .attr('height', heightFlower / 6)
            .attr('class', 'svgBorder');
        let max_gain = -10000;
        let min_gain = 10000;
        for (let p in personal_data) {
            const flowerList = new Array();
            const pieList = new Array();
            for (let i = 1; i < 11; ++i) {
                const p_v = parseFloat(personal_data[p][(i + 1) * 10 + 9]) - parseFloat(personal_data[p][i * 10 + 9]);
                flowerList.push(p_v);
                // min_gain = Math.min(p_v, min_gain);
                max_gain = Math.max(Math.abs(p_v), max_gain);
                pieList.push(1);
            }
            personal_data[p]['flower'] = flowerList;
            personal_data[p]['pie'] = pieList;
        }
        const pie_g = svgFlower.append('g');
        console.log(this.x_scale_wealth(20));
        const flowerScale = d3.scaleLinear()
            .domain([0, max_gain])
            .range([10, 50]);
        const pie = d3.pie();
        for (let i in personal_data) {
            var arc_generator = d3.arc()
                .innerRadius(10)
                // .outerRadius(flowerScale(Math.abs(parseFloat(personal_data[i]['flower'][x]))));
                .outerRadius(100)
                console.log(personal_data[i].pie);
                
                console.log(pie(personal_data[i].pie));
            const g_p = pie_g.append('g')
                .attr("transform", "translate(" + this.x_scale_wealth(parseInt(i) + 1) + "," + (heightFlower / 12) + ")")
                .data(pie(personal_data[i].pie))
                .enter()
                .append('path')
                .attr('d', (d, x) => {
                    // console.log(flowerScale(Math.abs(parseFloat(personal_data[i]['flower'][x]))))
                    return arc_generator(d);
                })
                .attr('fill', (d, x) => {
                    // if (parseFloat(personal_data[i]['flower'][x]) <= 0) return 'red';
                    // else return 'green';
                    return 'blue'
                })
        }
    });
}

drawWealthLine();
// for (let i = 0; i < 10; ++i)
drawFlower('8a4otv31');