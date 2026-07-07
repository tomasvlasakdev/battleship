import { Gameboard } from "./gameboard"

describe("gameboard", () => {
    const gameboard = Gameboard()
    gameboard.placeShip(1, 0, 0)
    gameboard.recieveAttack(0, 0)
    const board = gameboard.board
    test("placeShip", () => {
        expect(board[0][0]).toBe({})
    })

    test("recieveAttack", () => {
        expect(board[0][0].isSunk()).toBe(true)
    })
})