const heightIndividual = document.getElementById("individual").offsetHeight;
const widthIndividual = document.getElementById("individual").offsetWidth;

var wealth_g;

function drawWealthCircle(select_data) {
    d3.csv('data/newdata_for_line.csv').then(wealth_data => {
        // console.log(wealth_data);
        const nameSpace = new Object();
        let select_people_data = new Array();
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
            if (parseFloat(d['end']) < -600) d['end'] = -600;
            if (parseFloat(d['end']) > 600) d['end'] = 600;
            nameSpace[d.code]['round'][d.biao] = parseFloat(d['end']);
            nameSpace[d.code]['wealth'].push({
                x: parseInt(d.biao),
                y: parseFloat(d['end'])
            });
        })
        for (let i in select_data) {
            let d_s = select_data[i];
            // console.log(nameSpace[d_s.id])
            select_people_data.push(nameSpace[d_s.id]['wealth'][parseInt(d_s.lun) - 1]);
        }
        console.log(nameSpace['pva278uh']);
    })
}
drawWealthCircle([{
        id: 'pva278uh',
        lun: 12
    }])

function drawWealthLine() {
    d3.csv('data/newdata_for_line.csv').then(wealth_data => {
        this.height = heightIndividual;
        this.width = widthIndividual;
        this.min_wealth = -600;
        this.max_wealth = 600;
        this.margin = {
            left: 200,
            right: 100,
            top: 20,
            bottom: 10
        }

        const color_wealth = ['#006400', '#00FF00', '#90EE90', 'orange', 'rgb(240, 189, 134)', 'rgb(243, 96, 102)']

        const svgWealth = d3.select('#individual').append('svg')
            .attr('height', this.height)
            .attr('width', this.width);
        wealth_g = svgWealth.append('g');
        wealth_g.append('text')
            .text('Wealth')
            .attr('x', 45)
            .attr('y', 60)
            .attr('font-size', 15)
            .attr('text-anchor', 'middle')
            .attr('font-family', 'Georgia');

        wealth_g.selectAll('#coloRect')
            .attr('id', 'colorRect')
            .data(color_wealth)
            .enter()
            .append('rect')
            .attr('x', 30)
            .attr('y', (d, i) => {
                return i * 30 + this.margin.top + 50;
            })
            .attr('width', 30)
            .attr('height', 30)
            .attr('fill', (d, i) => d)
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
            if (parseFloat(d['end']) < -600) d['end'] = -600;
            if (parseFloat(d['end']) > 600) d['end'] = 600;
            nameSpace[d.code]['round'][d.biao] = parseFloat(d['end']);
            nameSpace[d.code]['wealth'].push({
                x: parseInt(d.biao),
                y: parseFloat(d['end'])
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
            .attr('stroke', 'gray')
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
            wealth_g.append('line')
                .attr('x1', this.x_scale_wealth(i))
                .attr('x2', this.x_scale_wealth(i))
                .attr('y1', this.y_scale_wealth.range()[0])
                .attr('y2', this.y_scale_wealth.range()[1])
                .attr('fill', 'none')
                .attr('stroke', 'gray')
                .attr('stroke-opacity', 0.5);
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
// console.log(widthFlower)
const sum_max_gain = 0;
var select_people_num = 0;

function drawFlower(code) {
    d3.csv('data/data_for_line.csv').then(wealth_data => {
        const personal_data = new Array();
        for (let i in wealth_data) {
            if (wealth_data[i].code == code) {
                personal_data.push(wealth_data[i]);
            }
        }
        // console.log(personal_data);
        const svgFlower = d3.select('#flowerView')
            .append('svg')
            .attr('width', widthIndividual - 30)
            .attr('height', 100)
            .attr('class', 'framework')
            .attr('transform', `translate(15, 0)`);
        let max_gain = -10000;
        let min_gain = 10000;
        const wealthList = [{
            x: 0,
            y: 0
        }];
        for (let p in personal_data) {
            wealthList.push({
                y: parseFloat(personal_data[p]['119']),
                x: parseInt(p) + 1
            });
            const flowerList = new Array();
            const pieList = new Array();
            const decisionList = new Array();
            for (let i = 1; i < 11; ++i) {
                const p_v = parseFloat(personal_data[p][(i + 1) * 10 + 9]) - parseFloat(personal_data[p][i * 10 + 9]);
                flowerList.push(p_v);
                decisionList.push(parseInt(personal_data[p][i]));
                // min_gain = Math.min(p_v, min_gain);
                max_gain = Math.max(Math.abs(p_v), max_gain);
                pieList.push(1);
            }
            // decisionList.push(parseInt(personal_data[p][11]));

            personal_data[p]['flower'] = flowerList;
            personal_data[p]['pie'] = pieList;
            personal_data[p]['decision'] = decisionList;
        }
        // console.log(wealthList);



        wealth_g
            // .selectAll('#wg')
            //     .attr('id', 'wg')
            //     .data(Object.keys(nameSpace))
            //     .enter()
            .append('path')
            // .attr('id', d => {
            //     return 'line' + d;
            // })
            .attr('d', this.lineBuilder(wealthList))
            .attr('fill', 'none')
            .attr('stroke', 'orange')
            .attr('stroke-opacity', 1)
            .attr('stroke-width', 3);

        wealth_g.append('text')
            .text('#' + (select_people_num + 1).toString())
            .attr('x', this.x_scale_wealth(20) + 10)
            .attr('font-size', 20)
            // .attr('text-anchor', 'middle')
            .attr('dy', '0.2em')
            .attr('y', this.y_scale_wealth(wealthList[wealthList.length - 1].y));

        const pie_g = svgFlower.append('g').attr('transform', `translate(-15, 0)`);
        pie_g.append('text')
            .text('#' + (++select_people_num).toString())
            .attr('x', 10)
            .attr('y', 50)
            .attr('font-size', 25)
            .attr('dx', '1em')
            .attr('text-anchor', 'middle');
        // console.log(this.x_scale_wealth(20));
        // console.log(personal_data);
        let decisionDifferent = new Array();
        for (let i = 0; i < personal_data.length - 1; ++i) {
            var diff_num = 0;
            // console.log(personal_data[i].decision)
            for (let j = 0; j < personal_data[i].decision.length; ++j) {
                if (personal_data[i + 1].decision[j] != personal_data[i].decision[j]) {
                    diff_num++;
                }
            }
            decisionDifferent.push(diff_num);
        }
        // console.log(decisionDifferent);
        const lineWidthScale = d3.scaleLinear()
            .domain([d3.min(decisionDifferent), d3.max(decisionDifferent)])
            .range([1, 10]);
        for (let i = 1; i < 20; ++i) {
            pie_g.append('line')
                .attr('x1', this.x_scale_wealth(i))
                .attr('x2', this.x_scale_wealth(i + 1))
                .attr('y1', 50)
                .attr('y2', 50).attr('stroke', 'gray')
                .attr('stroke-width', lineWidthScale(decisionDifferent[i - 1]))
                .attr('fill', 'none');
        }
        this.flowerInner = 5;
        this.flowerOuter = 40;
        const flowerScale = d3.scaleLinear()
            .domain([0, max_gain])
            .range([this.flowerInner, this.flowerOuter]);
        const pie = d3.pie();
        for (let i in personal_data) {
            const g_p = pie_g.selectAll("#flower" + code)
                .attr('id', 'flower' + code)
                .data(pie(personal_data[i].pie))
                .enter()
                .append('g').attr("transform", "translate(" + this.x_scale_wealth(parseInt(i) + 1) + "," + (50) + ")")
            g_p.append('path')
                .attr('d', (d, x) => {
                    var arc_generator = d3.arc()
                        .innerRadius(this.flowerInner)
                        .outerRadius(flowerScale(Math.abs(parseFloat(personal_data[i]['flower'][x]))));
                    // .outerRadius(100)
                    return arc_generator(d);
                })
                .attr('fill', (d, x) => {
                    if (parseFloat(personal_data[i]['flower'][x]) <= 0) return 'red';
                    else return 'green';
                    // return 'blue'
                })
                .attr('stroke', 'black')
                .attr('stroke-width', 0.5)
            g_p.append('circle')
                .attr('r', this.flowerInner - 0.5)
                .attr('x', 0)
                .attr('y', 0)
                .attr('fill', 'white')
                .attr('stroke', 'blue');
        }
        const horizon_data = new Array();
        for (let i = 0; i < personal_data[0].flower.length; ++i) {
            let horizon_tmp = new Array();
            for (let j in personal_data) {
                horizon_tmp.push(personal_data[j].flower[i]);
            }
            horizon_data.push(horizon_tmp);
        }
        // console.log(horizon_data);
        for (let i in horizon_data) {
            if (parseInt(i) == 9) break;
            // console.log(i)
            drawHorizonR(horizon_data[i], max_gain, 60, 9 * parseInt(i) + 9, pie_g);
        }
        pie_g.append('rect').attr('x', 60).attr('y', 9).attr('height', 81).attr('width', 180).attr('fill', 'none').attr('stroke', 'black').attr('stroke-width', 1);
    });
}

function drawHorizonR(roundCount, max_num, move_x, move_y, compare_g) {
    // let roundCount = new Array();
    // console.log(roundCount)
    const horizon_height = 9;
    let max_people = 0;

    // for (let i = 0; i < roundCount.length; ++i) {
    //     // roundCount.push(0);
    //     max_people = Math.max(max_people, roundCount[i])
    // }
    let horizon_g = compare_g.append('g').attr('transform', 'translate(' + move_x + ',' + (move_y) + ')');
    let people_scale = d3.scaleLinear()
        .domain([0, max_num])
        .range([0, -horizon_height * 3]);
    let x_scale = d3.scaleLinear()
        .domain([0 + 1, roundCount.length - 1 + 1])
        .range([0, 180]);

    // //画面积函数
    let color_scale = d3.scaleOrdinal()
        .domain([0, 1, 2])
        .range(['orange', 'rgb(240, 189, 134)', 'rgb(243, 96, 102)'])
    let color_scale_2 = d3.scaleOrdinal()
        .domain([0, 1, 2])
        .range(['#90EE90', '#00FF00', '#006400'])
    var area_generator = d3.area()
        .x(function (d, i) {
            return x_scale(i + 1);
        })
        .y0(0)
        .y1(function (d) {
            return people_scale((d));
        })
        .curve(d3.curveMonotoneX)
    var area_generator_2 = d3.area()
        .x(function (d, i) {
            return x_scale(i + 1);
        })
        .y0(0)
        .y1(function (d) {
            return people_scale((-d));
        })
        .curve(d3.curveMonotoneX)


    for (let i = 0; i < 3; ++i) {
        horizon_g.append('g')
            .attr('clip-path', 'url(#h1)')
            .append("path")
            .attr("d", area_generator_2(roundCount)) //d="M1,0L20,40.....  d-path data
            .attr('transform', 'translate(0, ' + ((i + 1) * horizon_height) + ')')
            .attr('fill-opacity', 0.5)
            .style("fill", color_scale(i))

        horizon_g.append('g')
            .attr('clip-path', 'url(#h1)')
            .append("path")
            .attr("d", area_generator(roundCount)) //d="M1,0L20,40.....  d-path data
            .attr('transform', 'translate(0, ' + ((i + 1) * horizon_height) + ')')
            .attr('fill-opacity', 0.5)
            .style("fill", color_scale_2(i))
    }
    // console.log(roundCount.length);
    // horizon_g.append("g")
    //     .call(d3.axisBottom(x_scale).ticks(0))
    //     .attr("transform", "translate(0," + horizon_height + ")");
    horizon_g.append('line').attr('x1', x_scale.range()[0]).attr('x2', x_scale.range()[1]).attr('y1', 0).attr('y2', 0).attr('stroke', 'gray').attr('fill', 'none').attr('stroke-width', 0.5);
    horizon_g.append('line').attr('x1', x_scale.range()[0]).attr('x2', x_scale.range()[1]).attr('y1', horizon_height).attr('y2', horizon_height).attr('stroke', 'gray').attr('fill', 'none').attr('stroke-width', 0.5);
    horizon_g.append('clipPath')
        .attr('id', 'h1')
        .append('rect')
        .attr('width', c_width)
        .attr('height', horizon_height);

    // horizon_g.append('text')
    //     .attr('x', 5)
    //     .attr('y', 0)
    //     .attr('dy', '1em')
    //     .attr('font-family', 'Georgia')
    //     .text(h_name);


}

// drawWealthLine();


// for (let i = 0; i < 10; ++i)
// drawFlower
// drawFlower('5zc86wny');
// drawFlower('5zc86wny');
// drawFlower('5zc86wny');
// drawFlower('5zc86wny');