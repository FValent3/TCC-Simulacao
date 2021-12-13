'use strict'

import { getHash } from '@utils/hash'

export function generateSeeds(numberOfReplications = 20) {
    const arrSeeds = []
    for (let index = 0; index < numberOfReplications; index++) {
        const seeds = {
            id: index,
            arrivals: getHash(),
            service: getHash(),
            departures: getHash()
        }
        arrSeeds.push(seeds)
    }
    return arrSeeds
}
