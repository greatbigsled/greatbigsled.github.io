let box = document.querySelector('.box'),
    boxWrap = document.querySelector('.box-wrap');

let isDown = false;

var bx = localStorage.getItem('bx')
if (!bx) {
    bx = {
        w: 0,
        h: 0,
        x: 0,
        y: 0
    };
} else {
    bx = JSON.parse(localStorage.getItem('bx'));
    boxWrap.style.left = bx.x + 'px';
    boxWrap.style.top = bx.y + 'px';
    boxWrap.style.width = bx.w + 'px';
    boxWrap.style.height = bx.h + 'px';
}

function initDrag() {
    document.body.classList.add('.drag-active');
}
function endDrag() {
    document.body.classList.remove('.drag-active');
}
function getBoxCoords() {
    return boxWrap.getBoundingClientRect();
}

let mx0,
    my0,
    mx1,
    my1;

let bx0,
    by0;

let screenW = window.innerWidth,
    screenH = window.innerHeight;


box.addEventListener('mousedown', function(e) {
    e.preventDefault();
    if (e.which !== 1) return;

    isDown  = true;
    bx0     = getBoxCoords().left;
    by0     = getBoxCoords().top;

    mx0     = e.screenX;
    my0     = e.screenY;


    screenW = window.innerWidth,
    screenH = window.innerHeight;
    // console.log(e);
});

window.addEventListener('mousemove', function(e) {
    e.preventDefault();

    if (!isDown) return;

    mx1     = e.screenX;
    my1     = e.screenY;

    let dx = mx1 - mx0;
    let dy = my1 - my0;

    // console.log(dx, dy);

    initDrag();
    let x = bx0 + dx,
        y = by0 + dy;

    if (x < 0) x = 0;
    if (x + getBoxCoords().width > screenW) x = screenW - getBoxCoords().width;

    if (y < 0) y = 0;
    if (y + getBoxCoords().height > screenH) y = screenH - getBoxCoords().height;

    boxWrap.style.left  = x + 'px';
    boxWrap.style.top   = y + 'px';

    bx.x = x;
    bx.y = y;
    localStorage.setItem('bx', JSON.stringify(bx));
});

window.addEventListener('mouseup', function(e) {
    e.preventDefault();
    isDown = false;
    endDrag();
});



let resizeDown      = false,
    resizeDirection = null;

let bw0,
    bh0;

let mrx0,
    mry0,
    mrx1,
    mry1;

boxWrap.addEventListener('mousedown', function(e) {
    e.preventDefault();
    if (e.which !== 1) return;

    if (!e.target.hasAttribute('data-resize')) return;
    resizeDirection = e.target.getAttribute('data-resize');

    resizeDown = true;
    bw0 = getBoxCoords().width;
    bh0 = getBoxCoords().height;

    mrx0 = e.screenX;
    mry0 = e.screenY;
    console.log(bw0, mrx0);
});
window.addEventListener('mousemove', function(e) {
    e.preventDefault();

    if (!resizeDown || !resizeDirection) return;
    console.log(resizeDirection);

    mrx1 = e.screenX;
    mry1 = e.screenY;

    let mrw = mrx1 - mrx0,
        mrh = mry1 - mry0;

    if (resizeDirection === 'e') {
        boxWrap.style.width = `${bw0 + mrw}px`;
        bx.w = bw0 + mrw;
        localStorage.setItem('bx', JSON.stringify(bx));
    } else if (resizeDirection === 's') {
        boxWrap.style.height = `${bh0 + mrh}px`;
        bx.h = bh0 + mrh;
        localStorage.setItem('bx', JSON.stringify(bx));
    } else if (resizeDirection === 'es') {
        boxWrap.style.width = `${bw0 + mrw}px`;
        boxWrap.style.height = `${bh0 + mrh}px`;
        bx.w = bw0 + mrw;
        bx.h = bh0 + mrh;
        localStorage.setItem('bx', JSON.stringify(bx));
    }

});
window.addEventListener('mouseup', function(e) {
    e.preventDefault();
    resizeDown = false;
});
