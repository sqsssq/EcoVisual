const data = [];
const t = Date.parse(new Date('2000-1-1'));
for (let i = 0; i < 100; i++) {
    data.push({
        date: new Date(t + i * 1000 * 3600 * 24),
        price: Math.floor(Math.random() * 1000),
    })
}

const margin = {
        top: 20,
        right: 20,
        bottom: 110,
        left: 50
    },
    margin2 = {
        top: 430,
        right: 20,
        bottom: 30,
        left: 40
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    height2 = 500 - margin2.top - margin2.bottom;

const x = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0, width]);
const x2 = d3.scaleTime().domain(x.domain()).range([0, width]);
const y = d3.scaleLinear().domain([0, d3.max(data, d => d.price) + 200]).range([height, 0]);
const y2 = d3.scaleLinear().domain(y.domain()).range([height2, 0]);

const xAxis = d3.axisBottom(x);
const xAxis2 = d3.axisBottom(x2);
const yAxis = d3.axisLeft(y);

var svg = d3.select("#bs")
    .append('svg')
    .attr('width', 1000)
    .attr('height', 1000);

const focus = svg.append('g')
    .attr('class', 'focus')
    .attr('transform', `translate(${margin.left},${margin.top})`);
focus.append('g').selectAll('dot')
    .data(data)
    .enter().append('circle')
    .attr('class', 'dot')
    .attr('r', 5)
    .style('opacity', .5)
    .attr('cx', d => x(d.date))
    .attr('cy', d => y(d.price));

focus.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0,${height})`)
    .call(xAxis);
focus.append('g')
    .attr('class', 'axis axis--y')
    .call(yAxis);

focus.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Price');

svg.append('text')
    .attr('transform', `translate(${(width + margin.right + margin.left) / 2},${(height + margin.top + margin.bottom)})`)
    .style('text-anchor', 'middle')
    .text('Date');

const context = svg.append('g')
    .attr('class', 'context')
    .attr('transform', `translate(${margin2.left},${margin2.top})`);

context.append('g').selectAll('dot')
    .data(data)
    .enter().append('circle')
    .attr('class', 'dotContext')
    .attr('r', 3)
    .style('opacity', .5)
    .attr('cx', d => x2(d.date))
    .attr('cy', d => y2(d.price));

context.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0,${height2})`)
    .call(xAxis2);

    const brush = d3.brushX()
      .extent([[0, 0], [width, height2]])
      .on('brush', brushed);


      context.append('g')
      .attr('class', 'brush')
      .call(brush)
      .call(brush.move, x.range());


      function brushed() {
        const selection = d3.event.selection;
        x.domain(selection.map(x2.invert, x2));
        focus.selectAll('.dot')
          .attr('cx', d => x(d.date))
          .attr('cy', d => y(d.price));
        focus.select('.axis--x').call(xAxis);
      }