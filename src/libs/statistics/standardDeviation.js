'use strict'

import { variance } from './variance'

export function standardDeviation(...values) {
    return Math.sqrt(variance(...values))
}
