const CustomError = require("../extensions/custom-error")

module.exports = function transform(array) {
    class Discarded {}
    const discaredToken = new Discarded()
    if (arguments.length === 0) {
        throw new Error()
    }
    const transformed = []
    for (let i = 0; i < array.length; i++) {
        const element = array[i]
        if (element === "--discard-prev") {
            transformed.pop()
            transformed.push(discaredToken)
        } else if (element === "--discard-next") {
            transformed.push(discaredToken)
            i++
        } else if (element === "--double-prev") {
            const last = transformed.pop()
            transformed.push(last)
            transformed.push(last)
        } else if (element === "--double-next") {
            transformed.push(array[i + 1])
        } else {
            transformed.push(element)
        }
    }

    const filtered = transformed.filter((e) => e != discaredToken && e != undefined)
    return filtered
}
