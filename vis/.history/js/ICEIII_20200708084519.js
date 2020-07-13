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
        for (let i in idata) {
            // console.log(i)
            for (let j in idata[i]) {
                // console.log(j)
                for (let k in idata[i][j]) {
                    // console.log(k);
                    for (let l in idata[i][j]) {
                        console.log(l)
                    }
                }
            }
        }

    })
}

SunCir(1)