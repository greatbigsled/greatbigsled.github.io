var obj1 = [ {
    'id' : 1,
    'name' : 'Boris',
    'age' : 600,
    'phone' : '89354654681',
    'address' : 'locale ipsume nevet soviet'
}, {
    'id' : 3,
    'name' : 'Dima',
    'age' : 600,
    'phone' : '2346754354',
    'address' : 'locale dsafsdfsa fsdf asd fad '
}, {
    'id' : 3,
    'name' : 'kolua',
    'age' : 600,
    'phone' : '444444',
    'address' : ' sdaf asd fasd fsa df asd'
}, {
    'id' : 4,
    'name' : 'Vass',
    'age' : 600,
    'phone' : '3456',
    'address' : 'asdf asdf asd fasd fas d'
}, {
    'id' : 5,
    'name' : 'Smith',
    'age' : 600,
    'phone' : '-525',
    'address' : 'xc vxbfdhybcvcxvxv  cvx xcv '
}, {
    'id' : 61,
    'name' : 'Boris',
    'age' : 600,
    'phone' : '12',
    'address' : 'xcvxzc c vzxvtst wer '
}, {
    'id' : 7,
    'name' : 'None',
    'age' : 600,
    'phone' : '9898677888888888888888888888',
    'address' : 'sadf nhdfbgv sdf'
}, {
    'id' : 8,
    'name' : 'Fsdc',
    'age' : 600,
    'phone' : '545454',
    'address' : 'gsdfdf soviet'
}, {
    'id' : 9,
    'name' : 'FWE',
    'age' : 600,
    'phone' : '99999999',
    'address' : 'fgsd s  dfdf s nevet soviet'
}, {
    'id' : 10,
    'name' : 'Dert',
    'age' : 600,
    'phone' : '87878',
    'address' : 'sfdghjhgfd dsfdghjgfd'
}, {
    'id' : 11,
    'name' : 'Ver',
    'age' : 600,
    'phone' : '121',
    'address' : 'fdgh dgdfgsdf gf'
}];


var container = document.getElementById('Ggrid');
var container2 = document.getElementById('cont-two');
var container3 = document.getElementById('cont-three');

var FastGrid = function(where, options, data) {
    this.where = document.getElementById(container);

    this.options = options;
    this.heads = options['heads'];

    var container = document.createDocumentFragment();

    this.init = function(headers) {
        var trh = document.createElement('div');
        trh.className = 'gg-tr-head';
        
        var td = trh.cloneNode();
        trh.className = 'gg-td';

        for (var i = 0, mx = headers.length; i < mx; i++) {
            var tmp_td = td.cloneNode();
                tmp_td.insertAdjacentHTML('afterbegin', headers[i].toString());
            trh.appendChild(tmp_td);
        }

        return trh;
    }

    this.init(this.heads);

    this.render = function(result) {
        this.where.appendChild(result);
    }


}
var Jinit = function(headers) {
    var trh = document.createElement('div');
    var td = trh.cloneNode();

    trh.className = 'gg-tr-head';
    
    td.className = 'gg-td';

    for (var i = 0, mx = headers.length; i < mx; i++) {
        var tmp_td = td.cloneNode();
            tmp_td.insertAdjacentHTML('afterbegin', headers[i].toString());
        trh.appendChild(tmp_td);
    }

    return trh;
}

var render = function (datas) {
    var dfrag = document.createDocumentFragment();
    var tr = document.createElement('div');
        tr.className = 'gg-tr';


    for (var i = 0, m = datas.length; i<m; i++) {
        var tempo = tr.cloneNode();
            tempo.className += ' tr-id' + i;
        for (var item in datas[i]) {
            var td = tr.cloneNode();
            td.className = 'gg-td';
            td.insertAdjacentHTML('afterbegin', datas[i][item]);
            tempo.appendChild(td);
        }
        dfrag.appendChild(tempo);
    }
    return dfrag;
}
var container = document.getElementById('Ggrid');


// var rend = Jinit(['One', 'Two', 'Three', 'Four', 'Five']);
// container.appendChild(rend);

// var data = render(obj);
// container.appendChild(data);

// function sortByType(obj, t) {
//     var srtd = obj.slice();

//     srtd.sort(function(item1, item2) {
//         if (item1[t] > item2[t]) {
//             return 1;
//         }
//         if (item1[t] < item2[t]) {
//             return -1;
//         }
//         return 0;
//     })

//     return srtd;
// }
// var data = render(sortByType(obj, 'id'));
// container.appendChild(data);

function reverseTable(obj) {
    var rows = obj.getElementsByClassName('gg-tr');
    console.log(rows);

    for (var i = 1; i < rows.length; i++) {
        obj.insertBefore(rows[i], rows[0]);
    }
}

container.addEventListener('click', function(e) {
    reverseTable(container);
})
console.log(container);

function createRowsInner(values) {
    var container = '';

    values.map(function(item) {
        var row = '<div class="gg-tr">';
        for (name in item) {
            row += '<div class="gg-td">' + item[name].toString() + '</div>';
        }
        container += row + '</div>'; 
    })

    return container;
}

function createRowsClone(values) {
    var container = document.createDocumentFragment();

    values.map(function(item) {
        var row = document.createElement('div');
        var rowData = row.cloneNode();
            rowData.className = 'gg-td';
            row.className = 'gg-tr';

        for (name in item) {
            var tmp = rowData.cloneNode();
            tmp.insertAdjacentHTML('afterbegin', item[name].toString());
            row.appendChild(tmp);
        }
        container.appendChild(row);
    })

    return container;
}

function initGrid(where, cols) {
    var frag = document.createDocumentFragment(),
        div = document.createElement('div');

    var td = div.cloneNode();
        td.className = 'gg-td';

    var theader = div.cloneNode();
        theader.className = 'gg-tr-head gg-tr';

        for (var i = 0; i < cols.length; i++) {
            var tmp = td.cloneNode();

            tmp.insertAdjacentHTML('afterbegin', cols[i].toString());
            theader.appendChild(tmp);
        }

    var tbody = div.cloneNode();
        tbody.className = 'gg-tbody';

        tbody.appendChild(createRowsClone(obj1));

    frag.appendChild(theader);
    frag.appendChild(tbody);

    where.appendChild(frag);
}

initGrid(container2, ['ONE COL', 'TWO COL', 'THREE COL', 'FOUR COL', 'FIVE COL']);




function sort(array, val) {
    var len = array.length;
    if (len < 2) {
        return array;
    }
    var pivot = Math.ceil(len/2);
    return merge(sort(array.slice(0, pivot), val), sort(array.slice(pivot), val), val);
}


function merge(left, right, val) {
    var result = [];
    while ((left.length > 0) && (right.length > 0)) {
        if (parseInt(left[0][val]) > parseInt(right[0][val])) {
            result.push(left.shift());
        }
        else {
            result.push(right.shift());
        }
    }
    result = result.concat(left, right);
    return result;
}

// var t0 = performance.now();
// container2.appendChild(createRowsClone(sort(obj, 'id')));
// var t1 = performance.now();
// console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to generate:');

// console.log(createRows(obj));
var t0 = performance.now();
container3.innerHTML = createRowsInner(sort(obj, 'id'));
// container2.innerHTML = createRowsInner(obj1);
var t1 = performance.now();
console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to generate:');

// console.log(sort(datamedium, 'id'));