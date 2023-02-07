const Player = (name, symbol) => ({ name, symbol });

const player1 = Player("player1", "x");
const player2 = Player("player2", "o");

const display = document.querySelector(".display");
const restart = document.querySelector(".restart");

const game = (() => {
  let winner = "";
  let moveCounter = 0;
  let currentPlayer = "player1";

  const switchPlayerTurn = () => {
    if (currentPlayer === "player1") {
       currentPlayer = "player2";
       display.textContent = "Player 2's turn";
    } else {
      currentPlayer = "player1";
      display.textContent = "Player 1's turn";
    }
    return currentPlayer;
  };

  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = () => {
    for (let i = 0; i <= 7; i++) {
      const winCondition = winLines[i];
      const a = gameboard.board[winCondition[0]];
      const b = gameboard.board[winCondition[1]];
      const c = gameboard.board[winCondition[2]];

      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        winner = a;
        break;
      }
    }
    return winner;
  }

  const endGame = () => {
    if (winner === "x") {
      display.textContent = "Player 1 wins!";
    } else if (winner === "o") {
      display.textContent = "Player 2 wins!";
    } else if (winner === "draw") {
      display.textContent = "It's a draw!";
    }
  };

  const play = (e) => {
    if (gameboard.board[e.target.id] !== "" || winner !== "") {
      return;
    };
    moveCounter++;
    if (moveCounter === 9 && winner === "") {
      winner = "draw";
    };
    if (currentPlayer === "player1") {
      gameboard.board[e.target.id] = player1.symbol;
    } else {
      gameboard.board[e.target.id] = player2.symbol;
    };
    gameboard.arrayToGameboard();
    switchPlayerTurn();
    checkWinner();
    endGame();
  };

  const reset = () => {
    winner = "";
    moveCounter = 0;
    currentPlayer = "player1";
  }
  return { winner, moveCounter, currentPlayer, switchPlayerTurn, play, checkWinner, reset };

})();

const gameboard = (() => {

  const board = ["", "", "", "", "", "", "", "", ""];
  const cell = document.querySelectorAll(".gameboard-cell");

  const arrayToGameboard = () => {
    // display array elements in gameboard
    for (let i = 0; i < 9; i++) {
      cell[i].textContent = board[i];
    }
  };

  cell.forEach((box) => {
    box.addEventListener("click", game.play);
  });

  const reset = () => {
    for (let i = 0; i < 9; i++) {
      board[i] = "";
    }
    arrayToGameboard();
  };

  return {
    board, arrayToGameboard, reset
  };
})();


restart.addEventListener("click", () => {
    game.reset();
    gameboard.reset();
    display.textContent = "Player 1, make your move!";
  });