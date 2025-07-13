
// Console-testable
const Gameboard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""]; // 9 cells for 3x3

  const getBoard = () => board;

  const setCell = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false; // Already taken
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { getBoard, setCell, resetBoard };
})();

// factory function, player
function createPlayer(name, marker) {
  return { name, marker };
}

// Game controller w. IIFE
const GameController = (function () {
  const player1 = createPlayer("Player 1", "X");
  const player2 = createPlayer("Player 2", "O");
  let currentPlayer = player1;
  let gameOver = false;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };
    
  const getCurrentPlayer = () => currentPlayer;

  const playRound = (index) => {
    if (gameOver) return;
    const success = Gameboard.setCell(index, currentPlayer.marker);
    if (!success) {
        console.log("Cell already taken.");
        return;
    }

    console.log(`${currentPlayer.name} placed ${currentPlayer.marker} at cell ${index}.`);

    if (checkWinner()) {
      console.log(`${currentPlayer.name} wins!`);
      gameOver = true;
      return;
    }

    if (checkTie()) {
      console.log("It's a tie!");
      gameOver = true;
      return;
    }

    switchPlayer();
  };

    const checkWinner = () => {
    const board = Gameboard.getBoard();
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6],            // diagonals
    ];
    return winPatterns.some(pattern => 
      pattern.every(i => board[i] === currentPlayer.marker)
    );
  };

  const checkTie = () => {
    return Gameboard.getBoard().every(cell => cell !== "");
  };

  const resetGame = () => {
    Gameboard.resetBoard();
    currentPlayer = player1;
    gameOver = false;
  };

  return { playRound, getCurrentPlayer, resetGame };
})();



