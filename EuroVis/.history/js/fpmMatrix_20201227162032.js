var width = 3500,
    height = 1500;

var svg;

svg = d3.select("#container").append("svg")
    .attr("width", width)
    .attr("height", height);

function DrawMatrix() {
    d3.csv("data/box_calc_rank.csv").then((data) => {
        d3.csv("data/fpmtype2.csv").then((data2) => {
            // console.log(data2);
            let typeTransfer = new Object();
            let typeCount = new Object();
            
            for (let i = 0; i < 6; ++i) {
                typeTransfer[i] = new Object;
                typeCount[i] = 0;
                for (let j = 0; j < 6; ++j) {
                    typeTransfer[i][j] = 0;
                }
            }
            for (let i = 0; i < data.length; ++i) {
                data[i]['type'] = new Array();
                // if (parseInt(data2[i]['0']) != 7)
                //     data[i]['typeA'] = '*';
                // else 
                //     data[i]['typeA'] = '+';
                for (let j = 1; j < 5; ++j) {
                    if (isNaN(parseInt(data2[i][j]))) break;
                    typeCount[parseInt(data2[i][j])]++;
                    data[i]['type'].push(parseInt(data2[i][j]));
                }
            }
            // console.log(typeCount);
            let name = new Object();
            for (let i = 0; i < data.length; ++i) {
                if (typeof(name[data[i]['code']]) == 'undefined') {
                    name[data[i]['code']] = data[i];
                    // console.log(data[i]['code']);
                } else {
                    for (let j in name[data[i]['code']].type) {
                        for (let k in data[i].type) {
                            typeTransfer[name[data[i]['code']].type[j]][data[i].type[k]]++;
                        }
                    }
                    name[data[i].code] = data[i];
                }
            }
            console.log(typeTransfer);

        })
    })
}
DrawMatrix();