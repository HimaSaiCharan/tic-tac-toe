class Game {
  #player1;
  #player2;
  #board;
  #playerMark;

  constructor(player1, player2) {
    this.#player1 = player1;
    this.#player2 = player2;

    this.#board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.#playerMark = "X";
  }

  display() {
    console.log(
      this.#player1,
      this.#player2,
      this.#playerMark,
      this.#board
    );
  }
}

const runGame = () => {
  const game = new Game("Me", "You");
  game.display();
};

window.onload = runGame;