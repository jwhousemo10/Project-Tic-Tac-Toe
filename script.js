
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
  let player1;
  let player2;
  let currentPlayer;
  let gameOver = false;
  let resultMessage = "";

  const setPlayers = (name1, name2) => {
    player1 = createPlayer(name1, "X");
    player2 = createPlayer(name2, "O");
    currentPlayer = player1;
    gameOver = false;
    resultMessage = "";
    Gameboard.resetBoard();
  };
  
  const switchPlayer = () => {  
        currentPlayer = currentPlayer === player1 ? player2 : player1;
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

  const playRound = (index) => {
    if (gameOver) return;
    const success = Gameboard.setCell(index, currentPlayer.marker);
    if (!success) {
        console.log("Cell already taken.");
        return;
    }

    console.log(`${currentPlayer.name} placed ${currentPlayer.marker} at cell ${index}.`);

    if (checkWinner()) {
      resultMessage = `${currentPlayer.name} wins!`;
      gameOver = true;
      return;
    }

    if (checkTie()) {
      resultMessage = "It's a tie!";
      gameOver = true;
      return;
    }

    switchPlayer();
  };

    const getCurrentPlayer = () => currentPlayer;
    const isGameOver = () => gameOver;
    const getResultMessage = () => resultMessage;
    const resetGame = () => {
      gameOver = false;  
      resultMessage = "";
      Gameboard.resetBoard();
      currentPlayer = player1;  
    };  

    return { setPlayers, playRound, getCurrentPlayer, resetGame, isGameOver, getResultMessage };
})();
 
    // display module
    const DisplayController = (function () {
        const boardContainer = document.getElementById("gameboard");
        const resultContainer = document.getElementById("result");

        const render = () => {
            boardContainer.innerHTML = ""; // clear board

            const board = Gameboard.getBoard();

            board.forEach((cell, index) => {
                const cellDiv = document.createElement("div");
                cellDiv.classList.add("cell");
                cellDiv.textContent = cell;

                cellDiv.addEventListener("click", () => {  
                    const board = Gameboard.getBoard();
                    if (board[index] !== "" || GameController.isGameOver()) return;
                    
                    GameController.playRound(index);
                    render(); // Re-render after move
                });

                boardContainer.appendChild(cellDiv);      
            });

            if (GameController.isGameOver()) {
                if (GameController.isGameOver()) {
                    resultContainer.textContent = GameController.getResultMessage();
                } else {
                  const currentPlayer = GameController.getCurrentPlayer();
                const name = currentPlayer?.name || "Unknown Player";
                resultContainer.textContent = `${name}'s turn`;  
                }

            }
        };

        //restart button listener
        document.getElementById("restart").addEventListener("click", () => {
            GameController.resetGame();
            DisplayController.render();
        });

        return { render };
    })();
    
    document.getElementById("player-form").addEventListener("submit", (e) => {
      e.preventDefault();

      const name1 = document.getElementById("player1-name").value || "Player 1";
      const name2 = document.getElementById("player2-name").value || "Player 2";

      GameController.setPlayers(name1, name2);
      DisplayController.render();
    });



