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
    d3.json('data/DT/' + num.toString() + '.json', function (idata) {
        // console.log(idata);
        var Cir_1 = new Array();
        var Cir_2 = new Array();
        var Cir_3 = new Array();
        var cnt1 = 0,
            cnt2 = 0,
            cnt3 = 0;
        for (let i in idata) {
            // console.log(i)
            for (let j in idata[i]) {
                // console.log(j)
                Cir_1.push({
                    Decision: {
                    },
                    cnt: cnt1,
                    h: 1,
                    member: new Array()
                })
                Cir_1[cnt1]['Decision'][i] = parseInt(j);
                cnt1++;
                for (let k in idata[i][j]) {
                    // console.log(Object.keys(idata[i][j][k]));
                    for (let l in idata[i][j][k]) {
                        console.log(idata[i][j][k][l])
                        var tag = 1;
                        for (let m in idata[i][j][k][l]) {
                            for (let n in idata[i][j][k][l][m]) {
                                tag = 0;
                                Cir_3.push({
                                    Decision: {
                                    },
                                    cnt: cnt3,
                                    h: 3,
                                    tag: 0,
                                    member: new Array()
                                })
                                Cir_3[cnt3]['Decision'][i] = j;
                                Cir_3[cnt3]['Decision'][k] = l;
                                Cir_3[cnt3]['Decision'][m] = n;
                                cnt3++;
                            }
                        }
                        Cir_2.push({
                            Decision: {
                            },
                            cnt: cnt2,
                            tag: tag,
                            h: 2,
                            member: new Array()
                        })
                        Cir_2[cnt2]['Decision'][i] = j;
                        Cir_2[cnt2]['Decision'][k] = l;
                        if (!tag) {
                            console.log(1)
                            Cir_3.push(Cir_2[cnt2]);
                            console.log(Cir_3)
                            Cir_3[cnt3 + 1]['cnt'] = cnt3 + 1;
                            cnt3++;
                        }
                        cnt2++;
                    }
                }
            }
        }
        console.log(Cir_2)

    })
}

SunCir(1)