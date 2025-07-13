
// Console-ready
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

const player1 = createPlayer("Joakim", "X");
const player2 = createPlayer("Zarina", "O");





