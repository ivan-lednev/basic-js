const CustomError = require("../extensions/custom-error")

class VigenereCipheringMachine {
    constructor(isDirect) {
        if (typeof isDirect === "boolean") {
            this.isDirect = isDirect
        } else if (arguments.length === 0) {
            this.isDirect = true
        } else {
            throw new Error()
        }
        this.alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
        this.vigenereTable = new Map()
        for (let index = 0; index < this.alphabet.length; index++) {
            this.vigenereTable.set(
                this.alphabet[index],
                this._getShiftedCopyOf(this.alphabet, index)
            )
        }
        this.finalize = (result) =>
            this.isDirect ? result : result.split("").reverse().join("")
    }

    _getShiftedCopyOf(array, startIndex) {
        const result = []
        const endIndex = startIndex + array.length
        for (let i = startIndex; i < endIndex; i++) {
            result.push(this._getByCircularIndex(array, i))
        }
        return result
    }

    _getByCircularIndex(array, i) {
        const shiftedIndex = i >= array.length ? i % array.length : i
        return array[shiftedIndex]
    }

    _runThroughTable(message, keyword, mapper) {
        function isAlpha(symbol) {
            return symbol.match(/[a-zA-Z]/)
        }

        const keywordLetters = message
            .toLowerCase()
            .split("")
            .filter((l) => isAlpha(l))
            .map((_, i) => {
                const keyLetters = keyword.toLowerCase().split("")
                return this._getByCircularIndex(keyLetters, i)
            })
            .reverse()

        const result = message
            .toLowerCase()
            .split("")
            .map((symbol) => {
                if (isAlpha(symbol)) {
                    const keyLetter = keywordLetters.pop()
                    const lookupRow = this.vigenereTable.get(keyLetter)
                    return mapper(lookupRow, symbol)
                } else {
                    return symbol
                }
            })
            .map((s) => s.toUpperCase())
            .join("")
        return this.finalize(result)
    }

    encrypt(message, keyword) {
        if (arguments.length != 2) {
            throw new Error()
        }

        return this._runThroughTable(
            message,
            keyword,
            (lookupRow, symbol) => lookupRow[this.alphabet.indexOf(symbol)]
        )
    }

    decrypt(message, keyword) {
        if (arguments.length != 2) {
            throw new Error()
        }

        return this._runThroughTable(
            message,
            keyword,
            (lookupRow, symbol) => this.alphabet[lookupRow.indexOf(symbol)]
        )
    }
}

module.exports = VigenereCipheringMachine
let directMachine = new VigenereCipheringMachine()
console.log(directMachine.encrypt("Samelengthkey", "Samelengthkey"))
