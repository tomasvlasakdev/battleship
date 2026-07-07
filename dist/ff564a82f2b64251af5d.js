import { Player } from "./player.js";
const UI = {
  playerBoard: document.getElementById("gameboardPlayer"),
  oponentBoard: document.getElementById("gameboardOponent")
};
function renderBoard(board) {
  let html = "<thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th><th>I</th><th>J</th></tr></thead>";
  html += "<tbody>";
  for (let i = 0; i < 10; i++) {
    html += `<tr><th scope='row'>${i + 1}</th>`;
    for (let j = 0; j < 10; j++) {
      html += "<td></td>";
    }
    html += "</tr>";
  }
  html += "</tbody>";
  board.innerHTML = html;
}
renderBoard(UI.playerBoard);