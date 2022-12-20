'use strict'

import { saveDataToFile } from '@utils/file'
import { meanLengthOfSeatsQueue } from '@utils/simulation/graph/templates'

import { buildHtml } from './buildHtml'
export function buildMeanLengthOfSeatsQueue(path, xValues, yValues) {
    const fileName = `meanLengthOfSeatsQueue.html`
    saveDataToFile(
        `${path}/${fileName}`,
        buildHtml(meanLengthOfSeatsQueue(xValues, yValues))
    )
}
