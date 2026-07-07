export const Ship = (length) => {
    let hits = 0

    return {
        get hits() {return hits},
        get length() {return length},
        hit() {
            hits++
        },
        isSunk() {
            if (hits >= length) return true
            return false
        }
    }
}