var widthGroup = document.getElementById("groupView").offsetWidth,
    heightGroup = document.getElementById("groupView").offsetHeight;

var svgGroup;

svgGroup = d3.select("#groupView").append("svg")
    .attr("width", widthGroup)
    .attr("height", heightGroup);

var Group_g = 0

function DrawPie() {
    d3.csv("data/box_calc_rank.csv").then((data) => {
        d3.csv("data/fpmtype4.csv").then((data2) => {
            d3.csv("data/fpm02.csv").then((data3) => {
                if (Group_g != 0) {
                    Group_g.remove();
                    Group_g = 0;
                }
                Group_g = svgGroup.append("g");
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
                for (let i = 0; i < data.length; ++i) {
                    for (let j in data[i].type) {
                        GroupData[parseInt(i / (6080 / 4))][parseInt(data[i].type[j])]++;
                    }
                }
                // console.log(GroupData);
                var pie = d3.pie();

                var arc_generator = d3.arc()
                    .innerRadius(0)
                    .outerRadius(50);
                for (let i in GroupData) {
                    var pd = pie(GroupData[i]);
                    // console.log(pd);
                    gs = Group_g.selectAll("#pg")
                        .attr("id", 'pg')
                    .data(pd)
                        .enter()
                        .append("g")
                        .attr("transform", "translate(" + ((0.5 + i) * widthGroup / 4) + "," + heightGroup / 2 + ")");
                    gs.append("path")
                        .attr("d", function (d) {
                            return arc_generator(d); //往弧形生成器中出入数据
                        })
                        .attr("fill", function (d, i) {
                            return typeColor[i]; //设置颜色
                        });
                }
            })
        })
    })
}
DrawPie();