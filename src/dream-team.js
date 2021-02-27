const CustomError = require("../extensions/custom-error")

module.exports = function createDreamTeam(members) {
    if (!Array.isArray(members)) {
        return false
    }
    return members
        .filter((m) => typeof m === "string")
        .map((m) => m.trimStart().substr(0, 1).toUpperCase())
        .slice()
        .sort()
        .join("")
}
