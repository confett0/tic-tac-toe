// Tic Tac Toe

const gameboard = {
    gameSlot: [null,null,null,null,null,null,null,null,null,]
};

const Player = (name,symbol) {
    return {name, symbol};
};

const player1 = Player("player1", "x");
const player2 = Player("player2", "o");