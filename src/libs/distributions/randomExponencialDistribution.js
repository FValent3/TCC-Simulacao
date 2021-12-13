'use strict'

import random from 'random'
import seedrandom from 'seedrandom'

export function randomExponencialDistribution(
    length = 100,
    arrivalRate = 1,
    seed = null
) {
    random.use(seedrandom(seed))
    const rngUniform = random.uniform(0, 1)
    const f = x => (Math.log(x) / -arrivalRate) * 60 * 60
    return [...Array(length)].map(() => rngUniform()).map(x => f(x))
}
