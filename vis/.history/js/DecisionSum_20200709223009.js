// console.log(2222)

var width_R = 611;
var height_R = 298

var R_svg = d3.select('#Sun').append('svg')
    .attr('width', width_R)
    .attr('height', height_R)

function PaintRactIn() {
    // console.log(222)
    d3.json('data/DT/sum2.json', function (sdata) {
        console.log(sdata)
        var Dec_1 = new Object(),
            Dec_2 = new Object(),
            Dec_3 = new Object();
        for (let i = 1; i <= 12; ++i) {
            Dec_1[i] = 0;
            Dec_2[i] = 0;
            Dec_3[i] = 0;
        }
        // console.log(Dec_3)
        for (let p = 1; p <= 20; ++p) {
            console.log(sdata[p])
            for (let i in sdata[p]) {
                console.log(i)
            }
        }
    })
}

PaintRactIn();