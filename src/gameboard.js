import { Ship } from "./ship.js"

export const Gameboard = () => {
    const board = Array.from({ length: 10 }, () => [])
    const missed = []
    const succesful = []
    let ships = 0

    return {
        get board() { return board },
        get missed() { return missed },
        get succesful() { return succesful },
        placeShip(length, x, y) {
            const ship = Ship(length)
            if (!board[x][y]) {
                board[x][y] = ship
                ships += 1 * length
            }

        },

        recieveAttack(x, y) {
            if (board[x][y] && !missed.some(item => item[0] === x && item[1] === y) && !succesful.some(item => item[0] === x && item[1] === y)) {
                const ship = board[x][y]
                ship.hit()
                let count = 0
                for (const x of board) {
                    for (const y of x) {
                        if (y) {
                            if(y.isSunk()) count++
                        }
                    }
                }
                succesful.push([x, y])
                if (count === ships) return "all"
            } else {
                missed.push([x, y])
            }
        }
    }
}