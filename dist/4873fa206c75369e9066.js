import "./style.css";
import { Player } from "./player.js";
const UI = {
  playerBoard: document.getElementById("gameboardPlayer"),
  oponentBoard: document.getElementById("gameboardOponent"),
  toast: document.getElementById("toast")
};
function renderBoard(uiBoard, player) {
  let html = "<thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th><th>I</th><th>J</th></tr></thead>";
  html += "<tbody>";
  for (let i = 0; i < 10; i++) {
    html += `<tr><th scope='row'>${i + 1}</th>`;
    for (let j = 0; j < 10; j++) {
      if (player.gameboard.board[i][j]) {
        html += `<td data-row='${i}' data-column='${j}'>X</td>`;
      } else if (player.gameboard.succesful.some(item => JSON.stringify(item) === [i, j])) {
        html += `<td class='hit' data-row='${i}' data-column='${j}'>X</td>`;
      } else if (player.gameboard.missed.some(item => JSON.stringify(item) === [i, j])) {
        html += `<td class='missed' data-row='${i}' data-column='${j}'>X</td>`;
      } else {
        html += `<td data-row='${i}' data-column='${j}'></td>`;
      }
    }
    html += "</tr>";
  }
  html += "</tbody>";
  uiBoard.innerHTML = html;
}
const player = Player();
player.gameboard.placeShip(1, 0, 0);
player.gameboard.placeShip(1, 1, 0);
player.gameboard.placeShip(1, 2, 0);
const computer = Player();
computer.gameboard.placeShip(1, 0, 0);
computer.gameboard.placeShip(1, 1, 0);
computer.gameboard.placeShip(1, 2, 0);
let activePlayer = player;
let inactivePlayer = computer;
renderBoard(UI.playerBoard, player);
renderBoard(UI.oponentBoard, computer);
UI.oponentBoard.addEventListener("click", event => {
  if (event.target.tagName === "TD") {
    const x = event.target.dataset.row;
    const y = event.target.dataset.column;
    if (inactivePlayer.gameboard.board[x][y]) {
      if (inactivePlayer.gameboard.recieveAttack(x, y) === "all") {
        UI.toast.textContent = `${currentPlayer} won!`;
      } else {
        activePlayer = activePlayer === player ? computer : player;
        inactivePlayer = inactivePlayer === player ? computer : player;
        if (activePlayer === computer) {
          function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }
          const randomX = getRandomInt(0, 9);
          const randomY = getRandomInt(0, 9);
          player.gameboard.recieveAttack(randomX, randomY);
          renderBoard(UI.oponentBoard, computer);
          activePlayer = activePlayer === player ? computer : player;
          inactivePlayer = inactivePlayer === player ? computer : player;
        }
      }
      renderBoard(UI.playerBoard, player);
    }
  }
});