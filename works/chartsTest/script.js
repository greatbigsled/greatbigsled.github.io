let canvas  = document.getElementById('graph-canvas');
let ctx     = canvas.getContext('2d');


let scatterData = [
        {x: 10, y: 10, r: 37},
        {x: 20, y: 11.2, r: 2},
        {x: 22, y: 31, r: 17},
        {x: 40, y: 5.7, r: 11},
        {x: 32, y: 11, r: 28}
];











// *****************************************************************************
// *****************************************************************************
// helper object
let c = {};
c.drawLine = function drawLine(ctx, x0, y0, x1, y1){
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = '#000';
    ctx.stroke();
};
c.drawRect = function drawRect(ctx, x, y, w, h){
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = '#bacaba';
    ctx.fill();
    ctx.strokeStyle = '#515851';
    ctx.strokeWidth = 2;
    ctx.stroke();
};

































// *****************************************************************************
// *****************************************************************************
// main
let canvasOpts = getCanvasOptions(50);

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

    return out;
}

function hist(arr, canvas){
    let xCount = arr.length,
        yCount = Math.max.apply(null, arr);

    let pageWidth = document.documentElement.clientWidth,
        pageHeight = document.documentElement.clientHeight;

    canvas.setAttribute('width', pageWidth);
    canvas.setAttribute('height', pageHeight);

    // Added 2 so there 1 step free space before and after
    let stepSize = pageWidth/(xCount+2),
        vStepSize = pageHeight/(yCount+2);

    let ctx = canvas.getContext('2d');


    console.log(xCount, yCount);

    drawGrid(ctx, pageWidth, pageHeight, stepSize, vStepSize, xCount+2, yCount+2);

    let x = 0,
        y = 0;

    arr.map((val, idx)=>{
        x += stepSize;
        y = pageHeight - vStepSize;
        idx += 1;

        c.drawRect(ctx, x, y, stepSize, -val*vStepSize);
    });
}


function drawAxis(xVals, yVals){
    xVals.map((val, idx)=> {

    });
    yVals.map((val, idx)=>{

    });
}

// hist(arr, canvas);


function drawGrid(xSize, ySize){
    let cellW = canvasOpts.pageW/xSize;
    let cellH = canvasOpts.pageH/ySize;

    for (let x = 0; x < xSize; x++) {
        c.drawLine(ctx, x*cellW, 0, canvasOpts.pageH, 0);
    }

    for (let y = 0; y < ySize; y++) {
        c.drawLine(ctx, 0, y*cellH, 0, canvasOpts.pageW);
    }
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

    drawGrid(dataMaxX, dataMaxY);
}

scatter(scatterData);











































