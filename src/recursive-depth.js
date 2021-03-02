const CustomError = require("../extensions/custom-error")

module.exports = class DepthCalculator {
    calculateDepth(array) {
        const innerDepths = []
        for (const e of array) {
            if (Array.isArray(e)) {
                innerDepths.push(this.calculateDepth(e))
            }
        }
        return innerDepths.length === 0 ? 1 : Math.max(...innerDepths) + 1
    }
}
