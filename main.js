class Game {
  #board;
  #currentSymbol;
  #winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  constructor() {
    this.#board = Array(9).fill("");
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
    return this.#winPatterns.some((pattern) => {
      return pattern.every(pos => this.#board[pos] === this.#currentSymbol);
    });
  }

  get isDraw() {
    return this.#board.every(cell => cell !== "");
  }

  resetBoard() {
    this.#board = Array(9).fill("");
  }
}

const removeFont = (board) => {
  const fontDisappear = [{ fontSize: "36px" }, { fontSize: "0px" }];
  const fontDisappearTiming = { duration: 1000, easing: "ease-in" };

  [...board.children].forEach(child => {
    child.animate(fontDisappear, fontDisappearTiming);

    setTimeout(() => {
      child.textContent = "";
    }, 900);
  });
};

const showWonSymbol = (symbol) => {
  const displayBox = document.querySelector(".winner-symbol");
  const animation = [{ fontSize: "0px" }, { opacity: 1, fontSize: "300px" }];
  const animationTiming = { duration: 800, delay: 900, fill: "forwards" };
  displayBox.textContent = symbol;

  displayBox.animate(animation, animationTiming);
};

const removeBoard = (board) => {
  const boardDisapper = [{ opacity: 0}];
  const boardDisapperTimings = { duration: 1000 };

  board.animate(boardDisapper, boardDisapperTimings);
  setTimeout(() => {
    board.style.display = "none";
  }, 900);
};

const runGame = () => {
  const game = new Game();
  const board = document.querySelector(".board");

  const handleMove = (e) => {
    const id = parseInt(e.target.id);

    if (game.isCellOccupied(id) || !e.target.matches(".cell")) return;

    e.target.innerText = game.currentSymbol;
    game.updateBoard(id);

    if (game.isWon) {
      removeBoard(board);
      showWonSymbol(game.currentSymbol);

      board.removeEventListener("click", handleMove);
      return;
    }

    if (game.isDraw) {
      removeFont(board);
      game.resetBoard();
      console.log("Game Draw...");

      return;
    }

    game.toggleSymbol();
  };

  board.addEventListener("click", handleMove);
};

window.onload = runGame;