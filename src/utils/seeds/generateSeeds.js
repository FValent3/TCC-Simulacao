'use strict'

import { getHash } from '@utils/hash'

export function generateSeed0s(numberOfReplications = 20) {
    const arrSeeds = new Array(numberOfReplications).fill(-1)
    return arrSeeds.map((_, index) => ({
        id: index,
        arrivals: getHash(),
        service: getHash(),
        departures: getHash()
    }))
}
