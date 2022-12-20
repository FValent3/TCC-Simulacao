'use strict'

import { saveDataToFile } from '@utils/file'
import { meanLengthOfArrivalsQueue } from '@utils/simulation/graph/templates'

import { buildHtml } from './buildHtml'

export function buildMeanLengthOfArrivalsQueue(path, xValues, yValues) {
    const fileName = `meanLengthOfArrivalsQueue.html`
    saveDataToFile(
        `${path}/${fileName}`,
        buildHtml(meanLengthOfArrivalsQueue(xValues, yValues))
    )
}
