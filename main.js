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

  display() {
    console.log(
      this.#currentSymbol,
      this.#board
    );
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
}

const runGame = () => {
  const game = new Game("Me", "You");
  const board = document.querySelector(".board");

  board.addEventListener("click", (e) => {
    const id = parseInt(e.target.id);

    if (!game.isCellOccupied(id) && e.target.className === "cell") {
      e.target.innerText = game.currentSymbol;
      game.updateBoard(id);
      game.toggleSymbol();
    }
  });
};

window.onload = runGame;