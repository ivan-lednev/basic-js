const CustomError = require("../extensions/custom-error")

module.exports = function calculateHanoi(disks, speed) {
    const turns = Math.pow(2, disks) - 1
    const seconds = Math.floor((3600 / speed) * turns)
    return {
        turns: turns,
        seconds: seconds,
    }
}
