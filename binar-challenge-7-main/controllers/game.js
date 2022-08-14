// import models
const database = require("../models");

// fungsi game
const game = async (req, res) => {
    // fungsi peraturan permainan
    function getResult(player1, player2) {
        if (player1 === player2) return "Draw Game";
        if (player1 === "rock" && player2 === "paper") return "Palyer 2 Win";
        if (player1 === "rock" && player2 === "scissors") return "Player 1 Win";
        if (player1 === "paper" && player2 === "scissors")
            return "Player 2 Win";
        if (player1 === "paper" && player2 === "rock") return "Player 1 Win";
        if (player1 === "scissors" && player2 === "rock") return "Player 2 Win";
        if (player1 === "scissors" && player2 === "paper")
            return "Player 1 Win";
    }

    res.render("main/game");
};

module.exports = game;
