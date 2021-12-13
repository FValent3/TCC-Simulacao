'use strict'

import random from 'random'
import seedrandom from 'seedrandom'

export function positiveNormalDistribution(
    length = 100,
    mean,
    standardDeviation,
    seed = null,
    min = 0,
    max = min + 1
) {
    random.use(seedrandom(seed))
    const rngUniform = random.normal(mean, standardDeviation)

    return [...Array(length)]
        .map(_ => rngUniform() * (max - min) + min)
        .map(x => (x < min ? resampleRngUniform(rngUniform, min) : x))
}

function resampleRngUniform(rngUniform, min) {
    const resampled = rngUniform()
    if (resampled < min) return resampleRngUniform(rngUniform)
    return resampled
}
