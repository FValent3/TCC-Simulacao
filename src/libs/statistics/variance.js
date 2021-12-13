'use strict'

import { mean } from './mean'

export function variance(amount = values.length, ...values) {
    const m = mean(...values, amount)
    return (
        values.reduce(
            (previous, current) => previous + Math.pow(current - m, 2)
        ) / amount
    )
}
