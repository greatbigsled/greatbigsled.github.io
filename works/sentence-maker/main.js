let wordsZone = document.getElementById('words-zone'),
    finishBlock = document.getElementById('finish-zone');

var turnCount = 0,
    guessed = 0;

wordsZone.addEventListener('mousedown', e => {
    let tar = e.target;
    if (!tar.classList.contains('app-word')) return;

    tar.ondragstart = () => {
        return false;
    }

    tar.style.position = 'fixed';
    tar.style.zIndex = "100";

    moveAt(e.pageX, e.pageY);

    function moveAt(pageX, pageY) {
        tar.style.left = pageX - tar.offsetWidth / 2 + 'px';
        tar.style.top = pageY - tar.offsetHeight / 2 + 'px';
    }

    let curDropable = null;

    function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);

        tar.hidden = true;
        let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
        tar.hidden = false;

        if (!elemBelow) return;

        let dropableBelow = elemBelow;

        if (curDropable !== elemBelow) {
            if (curDropable) {
                curDropable.classList.remove('hovered-drop');
            }
            curDropable = dropableBelow;
            if (curDropable) {
                curDropable.classList.add('hovered-drop');
            }
        }

    }

    document.addEventListener('mousemove', onMouseMove);

    tar.onmouseup = (ev) => {
        document.removeEventListener('mousemove', onMouseMove);
        tar.hidden = true;
        let elemBelow = document.elementFromPoint(ev.clientX, ev.clientY);

        if (elemBelow.classList.contains('app-drop-item')) {
            elemBelow.textContent = tar.textContent;
            tar.style.display = "none";

            turnCount++;
            if (elemBelow.getAttribute('data-word-order') === tar.getAttribute('data-word-order')) {
                guessed++;
            }
            if (turnCount >= 3) {
                if (guessed === 3) finishBlock.classList.add('success');
                else finishBlock.classList.add('fail');
            }
        }
        console.log(turnCount);
        console.log(guessed);

        tar.style.position = "";
        tar.style.zIndex = "";
        tar.hidden = false;

        tar.onmouseup = null;
    }
});
