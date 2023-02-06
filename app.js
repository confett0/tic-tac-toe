const Player = (name, symbol) => ({ name, symbol });

const player1 = Player("player1", "x");
const player2 = Player("player2", "o");

const gameboard = {
  board: [null, null, null, null, null, null, null, null, null],
  init() {
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom() {
    this.slot = document.querySelectorAll(".gameboard-slot");
  },
  bindEvents() {
    this.slot.forEach((element) => {
      element.addEventListener("click", this.play);
    });
  },

  arrayToGameboard() {
    // assign array elements to board
    let i = 0;
    while (i < this.board.length) {
      this.slot.forEach((element) => {
        element.textContent = this.board[i];
        i++;
      });
    }
  },

  play(e) {
    if (gameboard.board[e.target.id] !== null) {
      return;
    }
    if (gameFlow.currentPlayer === "player1") {
      gameboard.board[e.target.id] = player1.symbol;
    } else {
      gameboard.board[e.target.id] = player2.symbol;
    }
    gameFlow.moveCounter++;
    gameboard.arrayToGameboard();
    gameFlow.switchPlayerTurn();
    gameFlow.endGame();
  },
};

gameboard.init();

const gameFlow = {
  winner: "",
  moveCounter: 0,
  currentPlayer: "player1",
  switchPlayerTurn() {
    this.currentPlayer === "player1"
      ? (this.currentPlayer = "player2")
      : (this.currentPlayer = "player1");
  },

  endGame() {
    if (this.moveCounter >= 5) {
      this.checkWinner();
      // check for draw
      if (this.moveCounter === 9 && this.winner === undefined) {
        this.winner = "draw";
      }
    }
  },

  winLines: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],

  checkWinner() {
    for (let i = 0; i < 7; i++) {
      const winCondition = this.winLines[i];
      const a = gameboard.board[winCondition[0]];
      const b = gameboard.board[winCondition[1]];
      const c = gameboard.board[winCondition[2]];

      if (a === null || b === null || c === null) {
        continue;
      }
      if (a === b && b === c) {
        this.winner = a;
        break;
      }
    }
    console.log(this.winner);
    return this.winner;
  },

  resetGame() {
    gameboard.board = [null, null, null, null, null, null, null, null, null];
    this.moveCounter = 0;
    this.currentPlayer = "player1";
    this.winner = "";
  },
};
