const debug = (args) => {
  console.log(args);
  return args;
};

class Game {
  #player1;
  #player2;
  #board;
  #currentSymbol;

  constructor(player1, player2) {
    this.#player1 = player1;
    this.#player2 = player2;
    this.#board = ["", "", "", "", "", "", "", "", ""];
    this.#currentSymbol = "X";
  }

  updateBoard(id) {
    this.#board[id] = this.#currentSymbol;
  }

  isCellOccupied(id) {
    return this.#board[id] !== "";
  }

  toggleSymbol() {
    this.#currentSymbol = this.#currentSymbol === "X" ? "O" : "X";
  }

  get currentSymbol() {
    return this.#currentSymbol;
  }

  get isWon() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some((pattern) => {
      return this.#board[pattern[0]] !== "" && pattern.every(pos => this.#board[pos] === this.#board[pattern[0]]);
    });
  }

  get isDraw() {
    return this.#board.every(cell => cell !== "");
  }
}

const runGame = () => {
  const game = new Game("Me", "You");
  const board = document.querySelector(".board");

  const handleMove = (e) => {
    const id = parseInt(e.target.id);

    if (!game.isCellOccupied(id) && e.target.className === "cell") {
      e.target.innerText = game.currentSymbol;
      game.updateBoard(id);
      game.toggleSymbol();
    }

    if (game.isWon) {
      console.log("Match Won");
      board.removeEventListener("click", handleMove);
    }

    if (game.isDraw) {
      console.log("Game completed...");
    }
  };

  board.addEventListener("click", handleMove);
};

window.onload = runGame;