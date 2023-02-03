// Tic Tac Toe

const gameboard = {
    gameSlot: [null,null,null,null,null,null,null,null,null,],
    init () {
        this.cacheDom();
        this.bindEvents();
    },
    cacheDom () {
        this.slot = document.querySelectorAll(".gameboard-slot");
    },
    bindEvents() {
        this.slot.forEach(element => {
            element.addEventListener("click", (e) => {
                if (this.gameSlot[e.target.id] !== null) {
                    return;
                }
                if (player1Turn) {
                this.gameSlot[e.target.id] = player1.symbol;
            } else {
                this.gameSlot[e.target.id] = player2.symbol;
            }
                this.arrayToGameboard();
                gameFlow.switchPlayerTurn();
            })
        });
    },
    arrayToGameboard() {
        let i = 0
        while (i < this.gameSlot.length) {
            this.slot.forEach(element => {
                element.textContent = this.gameSlot[i];
                i++;
        })
}}};

gameboard.init();

const Player = (name,symbol) => ({name, symbol});

const player1 = Player("player1", "x");
const player2 = Player("player2", "o");

let player1Turn = true;
let player2Turn = false;

const gameFlow = {
    switchPlayerTurn() {
        
        if (player1Turn) {
            player2Turn = true;
            player1Turn = false;
        } else {
            player1Turn = true;
            player2Turn = false;
        }
    }
};