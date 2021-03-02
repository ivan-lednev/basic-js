const CustomError = require("../extensions/custom-error")

const chainMaker = {
    links: [],
    getLength() {
        return this.links.length
    },
    addLink(value) {
        if (arguments.length === 0) {
            this.links.push("")
        } else {
            this.links.push(value)
        }
        return this
    },
    removeLink(position) {
        if (!Number.isInteger(position)) {
            this.resetChain()
            throw new Error()
        }
        this.links.splice(position - 1, 1)
        return this
    },
    reverseChain() {
        this.links.reverse()
        return this
    },
    finishChain() {
        const finished = this.links.map((l) => `( ${l} )`).join("~~")
        this.resetChain()
        return finished
    },
    resetChain() {
        this.links = []
    }
}

module.exports = chainMaker
