let scroller = document.querySelector('.scroll-list'),
    btnL     = document.querySelector('.scroll-btn-left'),
    btnR     = document.querySelector('.scroll-btn-right');

document.addEventListener('mousedown', scrollInit);
document.addEventListener('mouseup', scrollEnd);
document.addEventListener('mousemove', scrollMove);
// scroller.addEventListener();

var sc = {
    mouseDown: false,
    downX: null,
    target: null,
    delta: null
};

function scrollInit(e) {
    if (!e.target.closest('.scroll-list')) return;
    e.preventDefault();

    sc.mouseDown = true;
    sc.downX = e.screenX;
    console.log(e);
}
function scrollEnd(e) {
    if (!sc.mouseDown) return;
    sc.mouseDown = false;
}
function scrollMove(e) {
    if (!sc.mouseDown) return;

    let scrollLeft  = scroller.scrollLeft,
        scrollWidth = scroller.scrollWidth;

    let upX = e.screenX,
        deltaX = sc.downX - upX;

    sc.delta = deltaX;

    let newScroll = scrollLeft + deltaX;
    // console.log('delta is =>>', deltaX);
    // console.log('new scroll ==>', newScroll);
    // console.log('scrollLeft ==>', scrollLeft);

    if (newScroll < 0) {
        newScroll = 0;
    } else if (newScroll > scrollWidth) {
        newScroll = scrollWidth;
    }
    scroller.scrollLeft = newScroll;
    sc.downX = upX;
}



btnL.addEventListener('click', moveOneLeft);
btnR.addEventListener('click', moveOneRight);

function moveOneLeft(e) {
    move('left');
}
function moveOneRight(e) {
    move('right');
}
function move(direction) {
    let width = scroller.scrollWidth,
        left  = scroller.scrollLeft;

    if (direction === 'left') left--;
    else left++;

    let count =  Math.ceil((left)/130);
    if (direction === 'left') count--;
    newWidth = count * 130;

    if (newWidth > width) newWidth = width;
    else if (newWidth < 0) newWidth = 0;
    else if (newWidth === 0) newWidth = 130;

    scroller.scrollLeft = newWidth;
}