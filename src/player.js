import { Gameboard } from "./gameboard.js"

export const Player = () => {
    const gameboard = Gameboard()

    return {
        get gameboard() {return gameboard}
    }
}