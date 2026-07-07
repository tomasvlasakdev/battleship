import {Ship} from "./ship.js"

describe("ship", () => {
    
    test("", () => {
        const ship = Ship(1)
        ship.hit()
        expect(ship.isSunk()).toBe(true)
    })
    test("", () => {
        
    })
})