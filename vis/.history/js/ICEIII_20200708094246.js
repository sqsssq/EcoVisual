var width_ice = 611,
    height_ice = 330

color = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
    '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'
]

var lxBei = 9

var ice_svg = d3.select('#Sun').append('svg')
    .attr('width', width_ice)
    .attr('height', height_ice)

var ice_rect = ice_svg.append('g')

// ice_rect.append('rect')
//     .attr('x', 0)
//     .attr('y', 0)
//     .attr('width', width_ice)
//     .attr('height', height_ice)
//     .attr('fill-opacity', 0)

var ice_line_g = 0;

function SunCir(num) {
    d3.json('data/DT/' + num.toString() + '.json', function(idata) {
        console.log(idata);
        var Cir_1 = new Array();
        var Cir_2 = new Array();
        var Cur_3 = new Array();
        for (let i in idata) {
            // console.log(i)
            for (let j in idata[i]) {
                // console.log(j)
                Cir_1.push({
                    Decision: {
                        i: j
                    },
                    member: new Array()
                })
                for (let k in idata[i][j]) {
                    // console.log(Object.keys(idata[i][j][k]));
                    for (let l in idata[i][j][k]) {
                        console.log(idata[i][j][k][l])
                        Cir_2.push({
                            Decision: {
                                i: j,
                                k: l
                            },
                            member: new Array()
                        })
                        for (let m in idata[i][j][k][l]) {
                            if (Object.keys(idata[i][j][k][l][m]).length == 0) 
                                continue;
                            else {
                                // for (let n in idata[i][j][k][l])
                            }
                        }
                    }
                }
            }
        }

    })
}

SunCir(1)