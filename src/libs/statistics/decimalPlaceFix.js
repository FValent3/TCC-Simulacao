'use strict'

export function decimalPlaceFix(value, amountOfDecimalPlace = 4) {
    const alpha = Math.pow(10, amountOfDecimalPlace)
    return Math.round((value + Number.EPSILON) * alpha) / alpha
}
