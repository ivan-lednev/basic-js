const CustomError = require("../extensions/custom-error")

module.exports = function getSeason(date) {
    if (arguments.length != 1) {
        return "Unable to determine the time of year!"
    }
    if (!date.getMonth.toString().match(/\[native code\]/)) {
        throw new Error()
    }
    class Season {
        constructor(months, name) {
            this.months = months
            this.name = name
        }
    }
    const seasons = [
        new Season([11, 0, 1], "winter"),
        new Season([2, 3, 4], "spring"),
        new Season([5, 6, 7], "summer"),
        new Season([8, 9, 10], "fall"),
    ]
    return seasons.filter((s) => s.months.includes(date.getMonth()))[0].name
}
