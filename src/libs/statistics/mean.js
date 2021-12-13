'use strict'

export function mean(amount = values.length, ...values) {
    const totalSum = values.reduce((previous, current) => previous + current)
    return totalSum / amount
}
