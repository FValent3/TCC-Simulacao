'use strict'

import { getDateMilliseconds } from '@utils/data'
import crypto from 'crypto'
import random from 'random'

export function getHash(
    dateMilliseconds = getDateMilliseconds(),
    cryptographyAlgorithm = 'sha1'
) {
    return crypto
        .createHash(cryptographyAlgorithm)
        .update(
            dateMilliseconds.toString() + JSON.stringify(random.uniform(0, 1)())
        )
        .digest('hex')
}
