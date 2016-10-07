let canvas  = document.getElementById('graph-canvas');
let ctx     = canvas.getContext('2d');
let SEXY_COLORS = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FE4365'];

let scatterData = [
        {x: 10, y: 10, r: 37},
        {x: 20, y: 11.2, r: 2},
        {x: 22, y: 31, r: 17},
        {x: 40, y: 5.7, r: 11},
        {x: 32, y: 11, r: 28}
];
let lineData = {
    1: [1, 12, 3],
    4: [12, 31, 4],
    5: [3, 24, 4],
    6: [12, 17, 6],
    12: [8, 2, 9],
    13: [21, 34, 6],
    21: [6, 7, 8]
};









// *****************************************************************************
// *****************************************************************************
// helper object
let c = {};
c.drawLine = function drawLine(ctx, x0, y0, x1, y1, {color='#000', width=1}){
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
}

c.drawRect = function drawRect(ctx, x, y, w, h, {fillStyle='#bacaba', strokeWidth=2, strokeStyle='515851', isStroke=true}){
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = fillStyle;
    ctx.fill();
    if (isStroke) {
        ctx.strokeStyle = strokeStyle;
        ctx.strokeWidth = strokeWidth;
        ctx.stroke();
    }
}

c.drawTxt = function drawTxt( ctx, text, x, y, { baseline='middle', align='center', color='#000', size='16px', width=1 } ){
    ctx.strokeStyle = color;
    ctx.font = size + 'sans-serif';
    ctx.textBaseline = baseline;
    ctx.textAlign = align;
    ctx.lineWidth = width;
    ctx.strokeText(text, x, y);
}

c.drawCircle = function drawCircle(ctx, {x, y, r, fillStyle='green', strokeStyle='#000', lineWidth='1', hasCenter=false}){
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI, false);
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();

    if (hasCenter){
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 2*Math.PI, false);
        ctx.fillStyle = '#000';
        ctx.fill();
    }
}




// CANVAS GRID & AXIS
function drawAxis(xVals, yVals, {xTxt, yTxt}){
    let cellW = canvasOpts.pageW/xVals;
    let cellH = canvasOpts.pageH/yVals;

    for (let x = 0; x <= xVals; x++) {
        c.drawTxt(ctx, xTxt ? xTxt[x] : x, x*cellW+canvasOpts.padding, canvasOpts.pageH+canvasOpts.padding+5, {baseline:'top', align: 'left', size: '14px', width: .2});
    }

    for (let y = 0; y <= yVals; y++) {
    // for (let y = yVals; y >= 0; y--) {
        c.drawTxt(ctx, yTxt ? yTxt[yVals-y] : yVals-y, canvasOpts.padding-5, y*cellH+canvasOpts.padding, {baseline:'bottom', align: 'right', size: '14px', width: .2});
    }
}



function drawGrid(xSize, ySize){
    let cellW = canvasOpts.pageW/xSize;
    let cellH = canvasOpts.pageH/ySize;

    let padding = canvasOpts.padding;

    for (let x = 0; x <= xSize; x++) {
        c.drawLine(ctx, x*cellW+padding, padding, x*cellW+padding, canvasOpts.pageH+padding, {width: .25});
        if (x === 0){
            c.drawLine(ctx, x*cellW+padding, padding, x*cellW+padding, canvasOpts.pageH+padding, {width: 1});
        }
    }

    for (let y = 0; y <= ySize; y++) {
        c.drawLine(ctx, padding, y*cellH+padding, canvasOpts.pageW+padding, y*cellH+padding, {width: .25});
        if (y === ySize){
            c.drawLine(ctx, padding, y*cellH+padding, canvasOpts.pageW+padding, y*cellH+padding, {width: 1});
        }
    }
}





























// *****************************************************************************
// *****************************************************************************
// main
let canvasOpts = getCanvasOptions(40);

canvas.setAttribute('width', canvasOpts.realPageW);
canvas.setAttribute('height', canvasOpts.realPageH);

function getCanvasOptions(padding){
    let out = {};

    // реальные размеры страницы
    out.realPageW = document.documentElement.clientWidth;
    out.realPageH = document.documentElement.clientHeight;

    // размеры где будет рисоваться график
    out.pageW = out.realPageW - padding*2;
    out.pageH = out.realPageH - padding*2;

    // координаты нулей по x и y, от которых будет все рисоваться
    out.zeroX = padding;
    out.zeroY = out.pageH + padding;
    out.padding = padding;

    return out;
}







// *****************************************************************************
// *****************************************************************************
// HISTOGRAM
function hist(ctx, arr){
    let xCount = arr.length,
        yCount = Math.max.apply(null, arr);

    let pageWidth = document.documentElement.clientWidth,
        pageHeight = document.documentElement.clientHeight;

    canvas.setAttribute('width', pageWidth);
    canvas.setAttribute('height', pageHeight);

    // Added 2 so there 1 step free space before and after
    let stepSize = pageWidth/(xCount+2),
        vStepSize = pageHeight/(yCount+2);



    drawGrid(ctx, pageWidth, pageHeight, stepSize, vStepSize, xCount+2, yCount+2);

    let x = 0,
        y = 0;

    arr.map((val, idx)=>{
        x += stepSize;
        y = pageHeight - vStepSize;
        idx += 1;

        c.drawRect(ctx, x, y, stepSize, -val*vStepSize, {});
    });
}

let histData = [1, 2, 2, 2, 3, 3, 4, 5];
// hist(ctx, histData);






// *****************************************************************************
// *****************************************************************************
// SCATTER
function drawScatterElem(ctx, data, {fillStyle= 'green', lineWidth=1, strokeStyle='#000'}){
    ctx.beginPath();
    ctx.arc(data.x, data.y, data.r, 0, 2*Math.PI, false);
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
}
function scatter(data){

    let dataMaxX = 0,
        dataMaxY = 0;

    data.map(obj=>{
        if(obj.x > dataMaxX)
            dataMaxX = obj.x;
    });

    data.map(obj=>{
        if(obj.y > dataMaxY)
            dataMaxY = obj.y;
    });


    let stepX = canvasOpts.pageW/dataMaxX,
        stepY = canvasOpts.pageH/dataMaxY;

    let padding = canvasOpts.padding;

    drawGrid(dataMaxX, dataMaxY);
    drawAxis(dataMaxX, dataMaxY, {});


    data.map(val=>{

        let itemData = {
            x: val.x*stepX + padding,
            y: (canvasOpts.pageH - val.y*stepY)+padding,
            r: val.r,
            hasCenter: true
        }
        c.drawCircle(ctx, itemData);
    });

}

scatter(scatterData);




// *****************************************************************************
// *****************************************************************************
// LINE CHART
function drawLineChart(data){
    let dataMaxX = 0,
        dataMaxY = 0;

    let padding = canvasOpts.padding;

    for (let val in data){
        if (val > dataMaxX){
            dataMaxX = val;
        }

        let mx = Math.max.apply(null, data[val]);

        if (mx > dataMaxY){
            dataMaxY = mx;
        }
    }

    let stepX = canvasOpts.pageW/dataMaxX,
        stepY = canvasOpts.pageH/dataMaxY;

    drawGrid(dataMaxX, dataMaxY);
    drawAxis(dataMaxX, dataMaxY);

}

// drawLineChart(lineData);



// *****************************************************************************
// *****************************************************************************
// STACKED BAR
function drawStackedBar(data){
    let env = {};
    env.mx = 0,
    env.my = 0;

    env.my = data.length;

    data.map(val=>{
        let mx = val.slice(1).reduce((a,b)=>{return a+b;});
        if (mx > env.mx){
            env.mx = mx;
        }
    });

    env.x = canvasOpts.pageW/env.mx,
    env.y = canvasOpts.pageH/env.my;

    let padding = canvasOpts.padding;

    let yTxt = [];
    data.map(val=> yTxt.push(val[0]));

    drawGrid(env.mx, env.my);
    drawAxis(env.mx, env.my, {yTxt});

    for (var i = 0; i < data.length; i++) {
        let chunk = data[i].slice(1);
        let startXValue = 0;

        chunk.map((val, idx) =>{
            let x = env.x*startXValue + padding,
                y = canvasOpts.realPageH - (env.y*i+padding),
                w = env.x*val,
                h = -(env.y);

            c.drawRect(ctx, x, y, w, h, {fillStyle: SEXY_COLORS[idx], strokeWidth: 1});
            c.drawTxt(ctx, val, x+w/2, y+h/2, {size: '18px'});
            startXValue += val;

        });
    }
}

let stackedBarData = [
    ['jan', 1, 4, 5, 6],
    ['jan', 2, 3, 5, 6],
    ['jan', 3, 10, 11],
    ['mar', 4, 9, 7, 10],
    ['may', 3, 10, 8, 1],
    ['sep', 11, 1, 9, 0]
];
// drawStackedBar(stackedBarData);




































