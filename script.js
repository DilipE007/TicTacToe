const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
const resultDisplay = document.getElementById('result');
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      resultDisplay.textContent = `${currentPlayer} wins!`;
      board.removeEventListener('click', handleCellClick);
      return true;
    }
  }

  if (boardState.every(cell => cell)) {
    resultDisplay.textContent = "It's a draw!";
    return true;
  }

  return false;
}

function handleCellClick(e) {
  const cell = e.target;
  const index = Array.from(cells).indexOf(cell);

  if (boardState[index] || resultDisplay.textContent) {
    return;
  }

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (!checkWinner()) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function resetGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = '');
  resultDisplay.textContent = '';
  currentPlayer = 'X';
  board.addEventListener('click', handleCellClick);
}

board.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', resetGame);
