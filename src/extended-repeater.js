module.exports = function repeater(str, options) {
    function repeat(element, times, separator, additionalMapper = (e) => e) {
        return Array(times)
            .fill(element)
            .map((e) => String(e))
            .map((e) => additionalMapper(e))
            .join(separator)
    }

    const separator = options.separator || "+"
    const addition = options.addition === undefined ? "" : options.addition
    const additionRepeatTimes = options.additionRepeatTimes || 1
    const additionSeparator = options.additionSeparator || ""
    const repeatTimes = options.repeatTimes

    return repeat(
        str,
        repeatTimes,
        separator,
        (e) => e + repeat(addition, additionRepeatTimes, additionSeparator)
    )
}
