var Fiflag = 0

// var color = ['#00FF00', '#ffce2d', '#ff8f5c', '#d65c9f', 'black']

// d3.select("#FindButton")
// .on("click", getValue())

// function Find() {
//     var value = $("#textId").val()
//     console.log(value)
// }
function getValue() {
    var input = document.getElementById("textId"); //通过id获取文本框对象
    // alert(input.value);//通过文本框对象获取value值
    var value = input.value;
    // console.log(value)

    tcircle.style("fill-opacity", d => {
            console.log(d.id)
            // Fiflag = 1;
            if (d.id != value.toString()) {
                return 0;
            } else {
                return 0.5;
            }
        })
        .style("r", 10)

    if (LineName != 0) LineName.remove()

    d3.csv("data/box.csv", function (d1) {
                d3.json("data/Scatter/1.json", function (coor1) {
                            d3.json("data/Scatter/2.json", function (coor2) {
                                        d3.json("data/Scatter/3.json", function (coor3) {
                                                    d3.json("data/Scatter/4.json", function (coor4) {
                                                                d3.json("data/Scatter/5.json", function (coor5) {
                                                                            d3.json("data/Scatter/6.json", function (coor6) {
                                                                                        d3.json("data/Scatter/7.json", function (coor7) {
                                                                                                    d3.json("data/Scatter/8.json", function (coor8) {
                                                                                                                d3.json("data/Scatter/9.json", function (coor9) {
                                                                                                                            d3.json("data/Scatter/10.json", function (coor10) {
                                                                                                                                        d3.json("data/Scatter/11.json", function (coor11) {
                                                                                                                                                    d3.json("data/Scatter/12.json", function (coor12) {
                                                                                                                                                                d3.json("data/Scatter/13.json", function (coor13) {
                                                                                                                                                                            d3.json("data/Scatter/14.json", function (coor14) {
                                                                                                                                                                                        d3.json("data/Scatter/15.json", function (coor15) {
                                                                                                                                                                                                    d3.json("data/Scatter/16.json", function (coor16) {
                                                                                                                                                                                                                d3.json("data/Scatter/17.json", function (coor17) {
                                                                                                                                                                                                                            d3.json("data/Scatter/18.json", function (coor18) {
                                                                                                                                                                                                                                        d3.json("data/Scatter/19.json", function (coor19) {
                                                                                                                                                                                                                                            d3.json("data/Scatter/20.json", function (coor20) {
                                                                                                                                                                                                                                                // console.log(coor)
                                                                                                                                                                                                                                                var d = [];
                                                                                                                                                                                                                                                for (var i in d1) {
                                                                                                                                                                                                                                                    if (parseInt(d1[i].biao) == num)
                                                                                                                                                                                                                                                        d.push(d1[i])
                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                var coor;

                                                                                                                                                                                                                                                if (num == 1) coor = coor1;
                                                                                                                                                                                                                                                if (num == 2) coor = coor2;
                                                                                                                                                                                                                                                if (num == 3) coor = coor3;
                                                                                                                                                                                                                                                if (num == 4) coor = coor4;
                                                                                                                                                                                                                                                if (num == 5) coor = coor5;
                                                                                                                                                                                                                                                if (num == 6) coor = coor6;
                                                                                                                                                                                                                                                if (num == 7) coor = coor7;
                                                                                                                                                                                                                                                if (num == 8) coor = coor8;
                                                                                                                                                                                                                                                if (num == 9) coor = coor9;
                                                                                                                                                                                                                                                if (num == 10) coor = coor10;
                                                                                                                                                                                                                                                if (num == 11) coor = coor11;
                                                                                                                                                                                                                                                if (num == 12) coor = coor12;
                                                                                                                                                                                                                                                if (num == 13) coor = coor13;
                                                                                                                                                                                                                                                if (num == 14) coor = coor14;
                                                                                                                                                                                                                                                if (num == 15) coor = coor15;
                                                                                                                                                                                                                                                if (num == 16) coor = coor16;
                                                                                                                                                                                                                                                if (num == 17) coor = coor17;
                                                                                                                                                                                                                                                if (num == 18) coor = coor18;
                                                                                                                                                                                                                                                if (num == 19) coor = coor19;
                                                                                                                                                                                                                                                if (num == 20) coor = coor20;


                                                                                                                                                                                                                                                work = []
                                                                                                                                                                                                                                                final = []

                                                                                                                                                                                                                                                // 格内数据
                                                                                                                                                                                                                                                var t = []

                                                                                                                                                                                                                                                for (var i = 0; i <= 9; ++i) {
                                                                                                                                                                                                                                                    t[i] = [];
                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                t[1][0] = 218;
                                                                                                                                                                                                                                                t[1][1] = 83;
                                                                                                                                                                                                                                                t[1][2] = 3;
                                                                                                                                                                                                                                                t[2][0] = 196;
                                                                                                                                                                                                                                                t[2][1] = 108;
                                                                                                                                                                                                                                                t[3][0] = 224;
                                                                                                                                                                                                                                                t[3][1] = 80;
                                                                                                                                                                                                                                                t[4][0] = 203;
                                                                                                                                                                                                                                                t[4][1] = 101;
                                                                                                                                                                                                                                                t[5][0] = 206;
                                                                                                                                                                                                                                                t[5][1] = 98;
                                                                                                                                                                                                                                                t[6][3] = 178;
                                                                                                                                                                                                                                                t[6][0] = 72;
                                                                                                                                                                                                                                                t[6][1] = 31;
                                                                                                                                                                                                                                                t[6][2] = 23;
                                                                                                                                                                                                                                                t[7][1] = 244;
                                                                                                                                                                                                                                                t[7][0] = 60;
                                                                                                                                                                                                                                                t[8][0] = 51;
                                                                                                                                                                                                                                                t[8][1] = 159;
                                                                                                                                                                                                                                                t[8][2] = 65;
                                                                                                                                                                                                                                                t[8][3] = 29;
                                                                                                                                                                                                                                                t[9][0] = 304;

                                                                                                                                                                                                                                                // ------------------------------------------------

                                                                                                                                                                                                                                                var p = {}


                                                                                                                                                                                                                                                for (var i in d) {
                                                                                                                                                                                                                                                    p[d[i].code] = {};
                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                for (var k = 1; k <= 9; ++k) {
                                                                                                                                                                                                                                                    var cnt = 0;
                                                                                                                                                                                                                                                    for (var i in d) {
                                                                                                                                                                                                                                                        a = {}
                                                                                                                                                                                                                                                        if (d[i][k] == 0) {
                                                                                                                                                                                                                                                            a["x"] = k;
                                                                                                                                                                                                                                                            a["y"] = cnt++;
                                                                                                                                                                                                                                                            a["v"] = parseFloat(d[i][k * 10 + 1]);
                                                                                                                                                                                                                                                            a["n"] = parseInt(d[i][k]);
                                                                                                                                                                                                                                                            a["id"] = d[i].code;
                                                                                                                                                                                                                                                            a["label"] = coor[i].label;
                                                                                                                                                                                                                                                            p[d[i].code][k] = a;
                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                            a["x"] = k;
                                                                                                                                                                                                                                                            t[k][d[i][k] - 1]++;
                                                                                                                                                                                                                                                            a["y"] = t[k][d[i][k] - 1];
                                                                                                                                                                                                                                                            a["v"] = parseFloat(d[i][k * 10 + 1]);
                                                                                                                                                                                                                                                            a["n"] = parseInt(d[i][k]);
                                                                                                                                                                                                                                                            a["id"] = d[i].code;
                                                                                                                                                                                                                                                            a["label"] = coor[i].label;
                                                                                                                                                                                                                                                            p[d[i].code][k] = a;
                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                        work.push(a);
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                for (var i in d) {
                                                                                                                                                                                                                                                    a = {}
                                                                                                                                                                                                                                                    a["x"] = 0;
                                                                                                                                                                                                                                                    a["y"] = parseInt(p[d[i].code][1].y);
                                                                                                                                                                                                                                                    a["v"] = parseFloat(d[i].work);
                                                                                                                                                                                                                                                    a["n"] = 0;
                                                                                                                                                                                                                                                    a["id"] = d[i].code;
                                                                                                                                                                                                                                                    a["label"] = coor[i].label;
                                                                                                                                                                                                                                                    // p[d[i].code] = {};
                                                                                                                                                                                                                                                    p[d[i].code][0] = a;
                                                                                                                                                                                                                                                    work.push(a);
                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                // console.log(p)

                                                                                                                                                                                                                                                var ans = {}

                                                                                                                                                                                                                                                ans[value.toString()] = p[value.toString()]

                                                                                                                                                                                                                                                // console.log(p[value.toString()])
                                                                                                                                                                                                                                                // console.log(ans)

                                                                                                                                                                                                                                                var path = PathCalc(ans, -1, -1);

                                                                                                                                                                                                                                                LinePaint_2(path, "black")
                                                                                                                                                                                                                                            })


                                                                                                                                                                                                                                        })
                                                                                                                                                                                                                                    })
                                                                                                                                                                                                                                })
                                                                                                                                                                                                                            })
                                                                                                                                                                                                                        })
                                                                                                                                                                                                                    })
                                                                                                                                                                                                                })
                                                                                                                                                                                                            })
                                                                                                                                                                                                        })
                                                                                                                                                                                                    })
                                                                                                                                                                                                })
                                                                                                                                                                                            })
                                                                                                                                                                                        })
                                                                                                                                                                                    })
                                                                                                                                                                                })
                                                                                                                                                                            })
                                                                                                                                                                        })
                                                                                                                                                                    })
                                                                                                                                                                })
                                                                                                                                                            })
                                                                                                                                                                                                                                    }


