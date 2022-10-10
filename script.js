initialTable();
initialPieces();

let selectPiece = null;

document.querySelectorAll('.box').forEach(item => {
    item.onclick = function () { clickedFunc(item.id) }
})


function initialTable() {
    let colLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    let relativePosition = 1;
    for (let i = 8; i >= 1; i--) {
        let row = document.createElement("div");
        row.className = 'row';
        row.id = i;
        for (let j = 0; j <= 7; j++) {
            let box = document.createElement("div");
            box.id = colLetters[j] + i;
            box.className = "box";
            box.innerHTML = box.id;
            let img = document.createElement("img");
            img.id = box.id + "img";
            img.height = 50;
            box.appendChild(img);
            relativePosition++;
            row.appendChild(box)
        }
        document.body.appendChild(row)
    }
    boardColors();
}

function setPiece(id, pecaDaVez) {
    if (pecaDaVez != null) {
        let img = document.getElementById(id + "img");
        if (pecaDaVez[0] != 'i' && pecaDaVez[0] != 'm') img.src = "images/" + pecaDaVez;
        else img.src = pecaDaVez;
    } else {
        let img = document.getElementById(id + "img");
        img.removeAttribute('src')
    }
}

function initialPieces() {
    const comeco = [
        ["a1", "b_rook.svg"],
        ["b1", "b_knight.svg"],
        ["c1", "b_bishop.svg"],
        ["d1", "b_king.svg"],
        ["e1", "b_queen.svg"],
        ["f1", "b_bishop.svg"],
        ["g1", "b_knight.svg"],
        ["h1", "b_rook.svg"],
        ["a2", "b_pawn.svg"],
        ["b2", "b_pawn.svg"],
        ["c2", "b_pawn.svg"],
        ["d2", "b_pawn.svg"],
        ["e2", "b_pawn.svg"],
        ["f2", "b_pawn.svg"],
        ["g2", "b_pawn.svg"],
        ["h2", "b_pawn.svg"],
        ["a8", "w_rook.svg"],
        ["b8", "w_knight.svg"],
        ["c8", "w_bishop.svg"],
        ["d8", "w_king.svg"],
        ["e8", "w_queen.svg"],
        ["f8", "w_bishop.svg"],
        ["g8", "w_knight.svg"],
        ["h8", "w_rook.svg"],
        ["a7", "w_pawn.svg"],
        ["b7", "w_pawn.svg"],
        ["c7", "w_pawn.svg"],
        ["d7", "w_pawn.svg"],
        ["e7", "w_pawn.svg"],
        ["f7", "w_pawn.svg"],
        ["g7", "w_pawn.svg"],
        ["h7", "w_pawn.svg"]
    ]

    for (let i = 0; i < comeco.length; i++) {
        setPiece(comeco[i][0], comeco[i][1])
    }
}

let clicked = [];
function clickedFunc(id) {
    if (checkIfPieceExist(id) && clicked.length == 0) {
        clicked.push(id);
        setSelected(id);
    }
    else if (clicked.length > 0) {
        clicked.push(id);
        if (clicked.length == 2) {
            let piece = document.getElementById(clicked[0] + "img").getAttribute('src');
            let box = document.getElementById(clicked[1]);
            if (box.style.backgroundColor == "green") {
                setPiece(clicked[0], null);
                setPiece(clicked[1], piece);
                setSelected(clicked[0]);
                clicked = [];
            } else {
                setSelected(clicked[0]);
                clicked = [];
            }
        }
    }
    console.log(clicked);
}

function checkIfPieceExist(id) {
    let box = document.getElementById(id + "img");
    if (box.src) return true;
    else return false;
}

function boardColors() {
    for (let i = 8; i >= 1; i--) {
        for (let j = 0; j <= 7; j++) {
            let colLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            let boxall = document.getElementById(colLetters[j] + i);
            if (j % 2 == 1 && (i - 1) % 2 == 0 || j % 2 == 0 && (i - 1) % 2 == 1) {
                boxall.style.backgroundColor = "white";
            } else {
                boxall.style.backgroundColor = "gray";
            }
        }
    }
}

function setSelected(id) {
    let box = document.getElementById(id);
    if (box.style.backgroundColor == "orange") boardColors();
    else {
        box.style.backgroundColor = "orange";
        possiblePos(id);
    }
}

function setPossibleColor(id) {
    let box = document.getElementById(id);
    box.style.backgroundColor = "green";
}

function possiblePos(id) {
    let colLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    let box = document.getElementById(id + "img");
    if (box.src.search("b_pawn") != -1) {
        let next1int = parseInt(id[1]) + 1;
        let next1 = id[0] + next1int;
        console.log(next1);
        setPossibleColor(next1);
        if (id[1] == 2) {
            let next2int = next1int + 1;
            let next2 = id[0] + next2int;
            setPossibleColor(next2);
        }
    }
}