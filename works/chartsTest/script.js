let canvas  = document.getElementById('graph-canvas');


let arr = [1, 2, 2, 2, 3, 3, 4, 5];

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

        drawRect(ctx, val, x, y, idx, stepSize, vStepSize);
    });
}

function drawGrid(ctx, width, height, cellW, cellH, countX, countY) {
    for (let x = 0; x < countX; x++) {
        ctx.beginPath();
        ctx.moveTo(cellW*x, 0);
        ctx.lineTo(cellW*x, height);
        ctx.strokeStyle = '#ededed';
        ctx.stroke();
    }

    for (let y = 0; y < countY; y++) {
        ctx.beginPath();
        ctx.moveTo(0, cellH*y);
        ctx.lineTo(width, cellH*y);
        // ctx.strokeStyle = '#ededed';
        ctx.stroke();
    }
}

function drawRect(ctx, val, x, y, idx, stepSize, vStepSize) {
    ctx.beginPath();
    ctx.rect(x, y, stepSize, -val*vStepSize);
    ctx.fillStyle = '#bacaba';
    ctx.fill();
    ctx.strokeStyle = '#515851';
    ctx.strokeWidth = 2;
    ctx.stroke();
    // ctx.rect(x, y, width, height)
}

hist(arr, canvas);