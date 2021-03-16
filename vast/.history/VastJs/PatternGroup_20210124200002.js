var widthGroup = document.getElementById("groupView").offsetWidth,
    heightGroup = document.getElementById("groupView").offsetHeight;

var svgGroup;

svgGroup = d3.select("#groupView").append("svg")
    .attr("width", widthGroup)
    .attr("height", heightGroup);

var Group_g = 0;
let treatMessage = [
    'None',
    'Raise to 0',
    'Raise to 10',
    'Investment',
    'Enhance Work Capability'
]

function DrawPie(data2, data3) {
    d3.csv("data/box_calc_rank.csv").then((data) => {
        d3.csv('data/treatment.csv').then(treatData => {
            // d3.csv("data/fpmtype4.csv").then((data2) => {
            //     d3.csv("data/fpm02.csv").then((data3) => {
            if (Group_g != 0) {
                Group_g.remove();
                Group_g = 0;
            }
            Group_g = svgGroup.append("g");

            var peopleTreat = new Object();

            for (let i in treatData) {
                peopleTreat[treatData[i].code] = treatData[i].treat;
            }
            for (let i = 0; i < data.length; ++i) {
                data[i]['type'] = new Array();
                // if (parseInt(data2[i]['0']) != 7)
                //     data[i]['typeA'] = '*';
                // else 
                //     data[i]['typeA'] = '+';
                for (let j = 1; j < 5; ++j) {
                    if (isNaN(parseInt(data2[i][j]))) break;
                    // typeCount[parseInt(data2[i][j])]++;
                    // typeMax = Math.max()
                    data[i]['type'].push(parseInt(data2[i][j]));
                }
            }
            data.sort(function (a, b) {
                return a['129'] - b['129'];
            });
            var GroupData = new Array();
            for (let i = 0; i < 4; ++i) {
                GroupData.push([]);
                for (let j = 0; j < data3.length; ++j) {
                    GroupData[i].push(0);
                }
            }
            var TreatData = new Array();

            for (let i = 0; i <= 5; ++i) {
                TreatData.push([]);
                for (let j = 0; j < data3.length; ++j) {
                    TreatData[i].push(0);
                }
            }
            for (let i = 0; i < data.length; ++i) {
                for (let j in data[i].type) {
                    GroupData[parseInt(i / (6080 / 4))][parseInt(data[i].type[j])]++;
                    TreatData[parseInt(peopleTreat[data[i].code])][parseInt(data[i].type[j])]++;
                }
            }
            // console.log(GroupData);
            var pie = d3.pie();

            var arc_generator = d3.arc()
                .innerRadius(0)
                .outerRadius(30);
            Group_g.append('text')
                .text("Wealth")
                .attr('text-anchor', 'middle')
                .attr('x', widthGroup * 1.1 / 4)
                .attr('y', 18)
                .attr('font-family', 'Georgia')
                .attr('font-size', 15);
                Group_g.append('text')
                .text("Policy")
                .attr('text-anchor', 'middle')
                .attr('x', widthGroup * 2.9 / 4)
                .attr('y', 18)
                .attr('font-family', 'Georgia')
                .attr('font-size', 15);
            for (let i in GroupData) {
                var pd = pie(GroupData[i]);
                // console.log(pd);
                gs = Group_g.selectAll("#pg")
                    .attr("id", 'pg')
                    .data(pd)
                    .enter()
                    .append("g")
                    .attr("transform", "translate(" + widthGroup * 1.1 / 4 + "," + ((parseInt(i) * 0.9 / 4) * ((heightGroup)) + 1.25 * heightGroup / 8) + ")");
                gs.append("path")
                    .attr("d", function (d) {
                        return arc_generator(d); //往弧形生成器中出入数据
                    })
                    .attr("fill", function (d, i) {
                        return typeColor[i]; //设置颜色
                    })
                    .attr('fill-opacity', 0.5);
                gs.append('text')
                    .text(parseInt(i) * 25 + '% ~ ' + (parseInt(i) + 1) * 25 + '%')
                    .attr('text-anchor', 'middle')
                    .attr('x', 0)
                    .attr('y', -35)
                    .attr('font-family', 'Georgia')
                    .attr('font-size', 12);
            }
            for (let i in TreatData) {
                if (i == 0) continue;
                var pd = pie(TreatData[i]);
                // console.log(pd);
                gs = Group_g.selectAll("#pg")
                    .attr("id", 'pg')
                    .data(pd)
                    .enter()
                    .append("g")
                    .attr("transform", "translate(" + widthGroup * 2.9 / 4 + "," + (((parseInt(i) - 1) * 0.9 / 5) * ((heightGroup)) + 1.25 * heightGroup / 10) + ")");
                gs.append("path")
                    .attr("d", function (d) {
                        return arc_generator(d); //往弧形生成器中出入数据
                    })
                    .attr("fill", function (d, i) {
                        return typeColor[i]; //设置颜色
                    })
                    .attr('fill-opacity', 0.5);
                gs.append('text')
                    .text('Policy ' + i)
                    .attr('text-anchor', 'middle')
                    .attr('x', 0)
                    .attr('y', -35)
                    .attr('font-family', 'Georgia')
                    .attr('font-size', 12);
            }
        })
    })
    //     })
    // })
}