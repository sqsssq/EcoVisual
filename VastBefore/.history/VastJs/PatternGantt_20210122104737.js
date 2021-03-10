var widthGantt = document.getElementById("ganttView").offsetWidth,
    heightGantt = document.getElementById("ganttView").offsetHeight;

var svgGantt;

svgGantt = d3.select("#ganttView").append("svg")
    .attr("width", widthGantt)
    .attr("height", heightGantt);

var Gantt_g = 0;

function DrawGantt() {
    d3.csv("data/box_calc_rank.csv").then((data) => {
        d3.csv("data/fpmtype4.csv").then((data2) => {
            d3.csv("data/fpm02.csv").then((data3) => {
                if (Gantt_g != 0) {
                    Gantt_g.remove();
                    Gantt_g = 0;
                }
                Gantt_g = svgGantt.append("g");
                for (let i = 0; i < data.length; ++i) {
                    data[i]['type'] = new Array();
                    // if (parseInt(data2[i]['0']) != 7)
                    //     data[i]['typeA'] = '*';
                    // else 
                    //     data[i]['typeA'] = '+';
                    for (let j = 1; j < 5; ++j) {
                        if (isNaN(parseInt(data2[i][j]))) break;
                        typeCount[parseInt(data2[i][j])]++;
                        // typeMax = Math.max()
                        data[i]['type'].push(parseInt(data2[i][j]));
                    }
                }
                
            })
        })
    })
}