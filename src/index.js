import "./style.css";
import { Player } from "./player.js";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const UI = {
    playerBoard: document.getElementById("gameboardPlayer"),
    oponentBoard: document.getElementById("gameboardOponent"),
    toast: document.getElementById("toast"),
    randomBtn: document.getElementById("randomBtn")
}

function renderBoard(uiBoard, player) {
    let html = "<thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th><th>I</th><th>J</th></tr></thead>"
    html += "<tbody>"
    for (let i = 0; i < 10; i++) {
        html += `<tr><th scope='row'>${i + 1}</th>`
        for (let j = 0; j < 10; j++) {
            if (player.gameboard.succesful.some(item => item[0] === i && item[1] === j)) {
                html += `<td class='hit' data-row='${i}' data-column='${j}'>X</td>`
            } else if (player.gameboard.missed.some(item => item[0] === i && item[1] === j)) {
                html += `<td class='missed' data-row='${i}' data-column='${j}'>X</td>`
            } else {
                html += `<td data-row='${i}' data-column='${j}'></td>`
            }

        }
        html += "</tr>"
    }
    html += "</tbody>"
    uiBoard.innerHTML = html
}

const player = Player()
const computer = Player()

let isGameActive = false

UI.randomBtn.addEventListener("click", () => {
    for (let i = 0; i < 5; i++) {
        const x = getRandomInt(0, 9)
        const y = getRandomInt(0, 9)
        player.gameboard.placeShip(1, x, y)
    }
    for (let i = 0; i < 5; i++) {
        const x = getRandomInt(0, 9)
        const y = getRandomInt(0, 9)
        computer.gameboard.placeShip(1, x, y)
    }
    isGameActive = true
})

let activePlayer = player
let inactivePlayer = computer

renderBoard(UI.playerBoard, player)
renderBoard(UI.oponentBoard, computer)

UI.oponentBoard.addEventListener("click", (event) => {
    if(!isGameActive) return
    if (event.target.tagName === "TD") {
        const x = Number(event.target.dataset.row)
        const y = Number(event.target.dataset.column)
        if (!inactivePlayer.gameboard.missed.some(item => item[0] === x && item[1] === y) && !inactivePlayer.gameboard.succesful.some(item => item[0] === x && item[1] === y)) {
            if (inactivePlayer.gameboard.recieveAttack(x, y) === "all") {
                const name = (activePlayer === player) ? "player" : "computer"
                UI.toast.textContent = `${name} won!`
                isGameActive = false
            } else {
                activePlayer = (activePlayer === player) ? computer : player
                inactivePlayer = (inactivePlayer === player) ? computer : player
                if (activePlayer === computer) {
                    let randomX
                    let randomY
                    while (true) {
                        randomX = getRandomInt(0, 9)
                        randomY = getRandomInt(0, 9)
                        if (!inactivePlayer.gameboard.missed.some(item => item[0] === randomX && item[1] === randomY) && !inactivePlayer.gameboard.succesful.some(item => item[0] === randomX && item[1] === randomY)) {
                            break
                        }
                    }

                    player.gameboard.recieveAttack(randomX, randomY)
                    renderBoard(UI.playerBoard, player)
                    activePlayer = (activePlayer === player) ? computer : player
                    inactivePlayer = (inactivePlayer === player) ? computer : player
                }
            }
            renderBoard(UI.oponentBoard, computer)
        }
    }
})