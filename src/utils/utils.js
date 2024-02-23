
const numberFormat = Intl.NumberFormat()

export const validateVideoFee = (value) => {
    if (value === "") {
        return new Error("Please enter a fee")
    }
    if (isNaN(numberFormat.format(value))) {
        return new Error("Please enter a fee")
    }
    return null
}