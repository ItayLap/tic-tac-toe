let td = document.querySelector('td');
let table = document.querySelector('table');
let turn = 1;
let char = 'X';
let nowTurn = document.querySelector('span');
let area = [
    ['*', '*', '*'], ['*', '*', '*'], ['*', '*', '*']
]

nowTurn.innerHTML = char;
table.addEventListener('click', function (e) {
    let target = event.target;
    let row = target.parentElement.rowIndex;
    let column = target.cellIndex;
    if (area[row][column] != 'X' && area[row][column] != 'O') {
        area[row][column] = char
        target.innerHTML = char;
        if (char == 'X') {
            target.classList.add('xLook')
            nowTurn.innerHTML = 'O';
        } else if (char == 'O') {
            target.classList.add('oLook')
            nowTurn.innerHTML = 'X';
        }
        turn = turn + 1;
        changeChar();
        if (winner() == false && turn == 10) {
            alertDeley('Draw')
        }
        if (winner() == 'X') {
            alertDeley('X has won')
        }
        if (winner() == 'O') {
            alertDeley('O has won')
        }
    }
});
function changeChar() {
    if (turn % 2 === 1) {
        char = 'X';

    } else {
        char = 'O';
    }


}
function newGame() {
    let rows = document.querySelectorAll('tr');
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let cells = row.querySelectorAll("td");

        for (let j = 0; j < cells.length; j++) {


            cells[j].classList.remove('xLook');
            cells[j].classList.remove('oLook');
            cells[j].innerHTML = "";
            area[i][j] = "";
        }
    }
    turn = 1;
    char = 'X';
    row.value = '';
    column.value = '';
    document.querySelector('span').innerHTML = char;
}

function alertDeley(txt) {
    setTimeout(() => {
        alert(txt)
        newGame()
    }, 50);
}

function winner() {
    const winningCombinations = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (area[a[0]][a[1]] && area[a[0]][a[1]] === area[b[0]][b[1]] && area[a[0]][a[1]] === area[c[0]][c[1]]) {
            return area[a[0]][a[1]];
        }
    }
    return false;
}