var product = {
    nodes: [{ //0
            name: "工作",
            value: 304
        },
        { //1
            name: "健康投资 0",
            value: 218
        },
    ],
    links: [{
            source: 0,
            target: 1,
            value: 218
        }
    ]
}

console.log(1)

renderSankey({
    el: 'chart',
    layoutStyle: {
        width: 1000,
        height: 160
    },
    data: product
})