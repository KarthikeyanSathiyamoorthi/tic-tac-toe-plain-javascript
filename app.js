const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");

infoDisplay.textContent = "Circle goes first!";
let go = "circle";
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]; // winning combos

function createBoard() {
  Array(9)
    .fill()
    .forEach((_, index) => {
      const cell = document.createElement("div");
      cell.classList.add("square");
      cell.id = index;
      cell.addEventListener("click", eventHandler, { once: true }); // { once: true } => Let the user clicks the square only once.
      gameBoard.append(cell);
    });
}

createBoard();

function eventHandler(event) {
  const element = document.createElement("div");
  element.className = go;
  event.target.append(element);
  go = go === "circle" ? "cross" : "circle";
  infoDisplay.textContent = `Next ${go[0].toUpperCase() + go.slice(1)}!`;
  checkScore();
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square");
  winningCombos.forEach((combo) => {
    const circleWins = combo.every((cellIndex) =>
      allSquares[cellIndex].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      infoDisplay.textContent = `Circle Wins!`;
      allSquares.forEach((square) => {
        square.removeEventListener("click", eventHandler);
      });
    }
  });

  winningCombos.forEach((combo) => {
    const crossWins = combo.every((cellIndex) =>
      allSquares[cellIndex].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      infoDisplay.textContent = `Cross Wins!`;
      allSquares.forEach((square) => {
        square.removeEventListener("click", eventHandler);
      });
    }
  });
}
