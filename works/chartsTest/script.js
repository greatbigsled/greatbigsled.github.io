let canvas  = document.getElementById('graph-canvas');
let ctx     = canvas.getContext('2d');
let SEXY_COLORS = ['#A7DBD8', '#E0E4CC', '#F38630', '#FE4365', '#69D2E7'];


canvas.setAttribute('width', document.documentElement.clientWidth/2);
canvas.setAttribute('height', document.documentElement.clientHeight/2);



function draw(data){


    // if (typeof data[0] === 'string'){
        // drawHistogram(ctx, canvasOpts);
    // }




    // *****************************************************************************
    // *****************************************************************************
    // main
    let canvasOpts = getCanvasOptions(canvas, 50);

    function getCanvasOptions(canvas, padding){
        let out = {},
            canvasBounds = canvas.getBoundingClientRect();

        // реальные размеры страницы
        out.realPageW = canvasBounds.width;
        out.realPageH = canvasBounds.height;

        // размеры где будет рисоваться график
        out.pageW = out.realPageW - padding*2;
        out.pageH = out.realPageH - padding*2;

        // координаты нулей по x и y, от которых будет все рисоваться
        out.zeroX = padding;
        out.zeroY = out.pageH + padding;
        out.padding = padding;

        return out;
    }

    // draw axis
    function drawAxis(xVals, yVals, {xTxt, yTxt}){
        let cellW = canvasOpts.pageW/xVals;
        let cellH = canvasOpts.pageH/yVals;

        let textOpts = {
            baseline:'top',
            align: 'left',
            size: '14px',
            width: .2
        };
        let textOptsY = {
            baseline:'bottom',
            align: 'right',
            size: '14px',
            width: .2
        }


        for (let i = 0; i <= xVals; i++) {
            let txt = xTxt ? xTxt[i] : i,
                x   =  i*cellW+canvasOpts.padding,
                y   = canvasOpts.pageH+canvasOpts.padding+5;

            c.drawTxt(ctx, txt, x, y, textOpts);
        }

        for (let j = 0; j <= yVals; j++) {
            let txt = yTxt ? yTxt[yVals-j] : yVals-j,
                x1  = canvasOpts.padding-5,
                y1  = j*cellH+canvasOpts.padding;

            c.drawTxt(ctx, txt, x1, y1, textOptsY);
        }
    }

    // draw grid
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
    drawHistogram(ctx, canvasOpts);




    // *****************************************************************************
    // *****************************************************************************
    // histogram
    function drawHistogram(ctx, canvasOpts, data){
        let histoData = data || [1, 2, 2, 2, 3, 3, 4, 5];
        
        hist(histoData);


        function hist(arr){
            let dataMaxX = arr.length,
                dataMaxY = Math.max.apply(null, arr);

            let stepSize = canvasOpts.pageW/dataMaxX,
                vStepSize = canvasOpts.pageH/dataMaxY;

            let padding = canvasOpts.padding;

            drawGrid(dataMaxX, dataMaxY);
            drawAxis(dataMaxX, dataMaxY, {});

            arr.map((val, idx)=>{
                let x, y, w, h;

                x = padding + idx*stepSize;
                y = canvasOpts.realPageH - (padding);
                w = stepSize;
                h = -val*vStepSize;
                c.drawRect(ctx, x, y, w, h, {});
                c.drawTxt(ctx, val, x+stepSize/2, y-(Math.abs(h)), {size: '20px', baseline: 'bottom'});
            });
        }
    }

    // *****************************************************************************
    // *****************************************************************************
    // scatter grid
    function drawScatter(ctx, data){
        let scatterData = data || [
                {x: 10, y: 10, r: 37},
                {x: 20, y: 11.2, r: 2},
                {x: 22, y: 31, r: 17},
                {x: 40, y: 5.7, r: 11},
                {x: 32, y: 11, r: 28}
        ];
        scatter(scatterData);



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
                    fillStyle: 'rgba(0, 200, 0, 0.4)',
                    hasCenter: true
                }
                c.drawCircle(ctx, itemData);
                c.drawTxt(ctx, itemData.r, itemData.x, itemData.y, {baseline: 'bottom', align: 'left'});
            });

        }
    }

    // *****************************************************************************
    // *****************************************************************************
    // line chart
    function drawLineChart(ctx, data){
        let lineData = data || {
            1: [1, 12, 3],
            4: [12, 31, 4],
            5: [3, 24, 4],
            6: [12, 17, 6],
            12: [8, 2, 9],
            13: [21, 34, 6],
            21: [6, 7, 8]
        };
        lineChart(lineData);


        function prepareLineData(data) {
            let sortedLineData = [];
            for (let item in data){
                sortedLineData.push({
                    xCoord: parseInt(item),
                    yDatas: data[item]
                });
            }
            sortedLineData = sortedLineData.sort((a, b)=>{
                return a.xCoord - b.xCoord;
            });

            return sortedLineData;
        }
        function lineChart(data){
            let dataMaxX = 0,
                dataMaxY = 0;

            let padding = canvasOpts.padding;

            for (let val in data){
                if (parseInt(val) > dataMaxX){
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
            drawAxis(dataMaxX, dataMaxY, {});

            let sorted = prepareLineData(data);

            let i = 0,
                itemsCount = sorted[0].yDatas.length;

            while (sorted[i]){

                if (sorted[i+1]) {
                    let currentX  = sorted[i].xCoord,
                        currentYs = sorted[i].yDatas,
                        nextX     = sorted[i+1].xCoord,
                        nextYs    = sorted[i+1].yDatas;

                    for (var j = 0; j < itemsCount; j++) {
                        let x0 = padding + currentX*stepX,
                            y0 = canvasOpts.realPageH - (currentYs[j]*stepY + padding),
                            x1 = padding + nextX*stepX,
                            y1 = canvasOpts.realPageH - (nextYs[j]*stepY + padding);

                        c.drawLine(ctx, x0, y0, x1, y1, {color: SEXY_COLORS[j], width: 2});
                        c.drawTxt(ctx, currentYs[j], x0, y0, {size: '18px', baseline: 'bottom', align: 'left'});
                        c.drawCircle( ctx, { x: x0, y: y0, r: 3, fillStyle: SEXY_COLORS[j]} );

                        if (!sorted[i+2]) {
                            c.drawTxt(ctx, nextYs[j], x1, y1, {size: '18px', baseline: 'bottom', align: 'left'});
                            c.drawCircle( ctx, { x: x1, y: y1, r: 3, fillStyle: SEXY_COLORS[j]} );

                        }
                    }
                }


                i++;
            }
        }
    }

    // *****************************************************************************
    // *****************************************************************************
    // stacked bar
    function drawStackedBar(ctx, data){
        let stackedBarData = data || [
            ['jan', 1, 4, 5, 6],
            ['jan', 2, 3, 5, 6],
            ['jan', 3, 10, 11],
            ['mar', 4, 9, 7, 10],
            ['may', 3, 10, 8, 1],
            ['sep', 11, 1, 9, 0]
        ];
        stackedBar(stackedBarData);




        function stackedBar(data){
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
    }



    // *****************************************************************************
    // *****************************************************************************
    // helper object - c
    let c = {};
    c.drawLine = function drawLine(ctx, x0, y0, x1, y1, {color='#000', width=1}){
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
    }

    c.drawRect = function drawRect(ctx, x, y, w, h, {fillStyle='#bacaba', strokeWidth=2, strokeStyle='#333'}){
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fillStyle = fillStyle;
        ctx.fill();
        ctx.strokeStyle = strokeStyle;
        ctx.strokeWidth = strokeWidth;
        ctx.stroke();
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
}




Array.prototype;




class DrawGraphs{
    constructor(){
        this.init();
    }

    init(){
        this.initDrawHelper();
    }

    initDrawHelper(){
        this.c = {};
        this.c.drawLine = function drawLine(ctx, x0, y0, x1, y1, {color='#000', width=1}){
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.stroke();
        }

        this.c.drawRect = function drawRect(ctx, x, y, w, h, {fillStyle='#bacaba', strokeWidth=2, strokeStyle='#333'}){
            ctx.beginPath();
            ctx.rect(x, y, w, h);
            ctx.fillStyle = fillStyle;
            ctx.fill();
            ctx.strokeStyle = strokeStyle;
            ctx.strokeWidth = strokeWidth;
            ctx.stroke();
        }

        this.c.drawTxt = function drawTxt( ctx, text, x, y, { baseline='middle', align='center', color='#000', size='16px', width=1 } ){
            ctx.strokeStyle = color;
            ctx.font = size + 'sans-serif';
            ctx.textBaseline = baseline;
            ctx.textAlign = align;
            ctx.lineWidth = width;
            ctx.strokeText(text, x, y);
        }

        this.c.drawCircle = function drawCircle(ctx, {x, y, r, fillStyle='green', strokeStyle='#000', lineWidth='1', hasCenter=false}){
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
    }
}





