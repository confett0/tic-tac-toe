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
      element.addEventListener("click", (e) => {
        if (this.board[e.target.id] !== null) {
          return;
        }
        if (gameFlow.turn === "player1") {
          this.board[e.target.id] = player1.symbol;
        } else {
          this.board[e.target.id] = player2.symbol;
        }
        gameFlow.moveCounter++;
        this.arrayToGameboard();
        gameFlow.switchPlayerTurn();
        gameFlow.winGame();
      });
    });
  },
  arrayToGameboard() {
    let i = 0;
    while (i < this.board.length) {
      this.slot.forEach((element) => {
        element.textContent = this.board[i];
        i++;
      });
    }
  }
};

gameboard.init();

const gameFlow = {
  moveCounter: 0,
  turn: "player1",
  switchPlayerTurn() {
    this.turn === "player1" ? this.turn = "player2" : this.turn = "player1";
  },

  winGame() {
    if (
      gameboard.board[0] ===
      gameboard.board[1] &&
      gameboard.board[1] ===
      gameboard.board[2]
    ) {
      console.log("you win");
    } 
  },
};
