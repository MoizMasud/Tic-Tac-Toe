const X_CLASS= 'x';
const CIRCLE_CLASS = 'circle'
cellElements = document.querySelectorAll('[data-cell]');
boardElement = document.getElementById('board');
const restartBtn = document.getElementById('RestartBtn');
const WINNING_MOVES = [ // BASED OFF indexes of board.
    [0,1,2], [3,4,5], [6,7,8], // horizontal winning moves
    [0,3,6], [1,4,7], [2,5,8], // vertical winning moves
    [0,4,8], [2,4,6] // diagnal winning moves
];

winningMessageTextElement = document.querySelector('[data-winning-message-text]');
winningMessage = document.getElementById('winning-message');
restartBtn.addEventListener('click', startGame);


startGame();

function startGame() {

 
    // if this varaible is true, its circle turn else its X turn. Start with X
   circleTurn = false; 
  
   cellElements.forEach(cell => {
       cell.classList.remove(X_CLASS); // reset all fields when game starts
       cell.classList.remove(CIRCLE_CLASS);
       cell.removeEventListener('click', handleClick)
       cell.addEventListener('click', handleClick, {once : true}) // tells it to only fire the event once
   });
   setBoardHoverClass();
   winningMessage.classList.remove('show');
}


function handleClick(event) {
 // place the mark. to do this we need to know whos turn it is
    const cell = event.target;
    const currentClass = circleTurn ?  CIRCLE_CLASS : X_CLASS;

    placeMark(cell, currentClass); // put x or o in the cell

 // check for win
    if(checkWin(currentClass)){ 
        endGame(false); // check for draw 
    } else if(isDraw()) {
        endGame(true);// check for draw 
    } else { // switch turns 
        swapTurns();
        setBoardHoverClass(); // this function goes here because we want the hover to be based off whos turn it currently is
    }

}

function checkWin(currentClass) {
    // .some returns true if any combinations inside it are true
    return WINNING_MOVES.some(combination => {
        return combination.every(index => { // wanna make sure every element in the winning combination has the same class
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function endGame(isDraw){
    if(isDraw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessage.classList.add('show');
}

function isDraw() {
    // [...someElement] turns it into an array
    return [...cellElements].every(cell => { // check every cell has a class
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}


function placeMark(cell, currclass) {
    cell.classList.add(currclass);
}

function swapTurns() {
    circleTurn = !circleTurn; // toggles between two players
}

function setBoardHoverClass() {
    boardElement.classList.remove(X_CLASS);
    boardElement.classList.remove(CIRCLE_CLASS);

    if (circleTurn) {
        boardElement.classList.add(CIRCLE_CLASS);
    } else {
        boardElement.classList.add(X_CLASS);
    }
}