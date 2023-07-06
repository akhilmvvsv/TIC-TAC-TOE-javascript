const cells = document.querySelectorAll('.cells');
const textcontent = document.querySelector('#textcontent');
const restart = document.querySelector('#restart');
const cond = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let options = ['','','','','','','','',''];
let currentPlayer = 'X';
let running = false;
start();

function start() {
  cells.forEach(function(cell) {
    cell.addEventListener('click', cellclicked);
    restart.addEventListener('click', handleRestart);
    running = true;
  });
  textcontent.textContent = `${currentPlayer}'s turn`;
}

function cellclicked() {
  const cellIndex = this.getAttribute('data-cellIndex');
  if (options[cellIndex] !== '' || !running) {
    return;
  }
  
  addValue(this, cellIndex);
  checkCondition();
}

function addValue(cell, Index) {
  options[Index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  textcontent.textContent = `${currentPlayer}'s turn`;
}

function checkCondition() {
  let roundWon = false;
  for (let i = 0; i < cond.length; i++) {
    const Ab = cond[i];
    const cellA = options[Ab[0]];
    const cellB = options[Ab[1]];
    const cellC = options[Ab[2]];
    if (cellA === '' || cellB === '' || cellC === '') {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    textcontent.textContent = `${currentPlayer} wins!`;
    running = false;
  } else if (!options.includes('')) {
    textcontent.textContent = 'Draw!';
    running = false;
  } else {
    changePlayer();
  }
}

function handleRestart() {
  currentPlayer = 'X';
  options = ['','','','','','','','',''];
  textcontent.textContent = `${currentPlayer}'s turn`;
  cells.forEach(function(cell) {
    cell.textContent = '';
    running = true;
  });
}