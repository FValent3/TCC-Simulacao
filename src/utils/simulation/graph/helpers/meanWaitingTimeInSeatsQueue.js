'use strict'

import { saveDataToFile } from '@utils/file'
import { meanWaitingTimeInSeatsQueue } from '@utils/simulation/graph/templates'

import { buildHtml } from './buildHtml'

export function buildMeanWaitingTimeInSeatsQueue(path, xValues, yValues) {
    const fileName = `meanWaitingTimeInSeatsQueue.html`
    saveDataToFile(
        `${path}/${fileName}`,
        buildHtml(meanWaitingTimeInSeatsQueue(xValues, yValues))
    )
}
