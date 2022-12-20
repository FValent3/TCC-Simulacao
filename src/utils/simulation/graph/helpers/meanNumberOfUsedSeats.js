'use strict'

import { saveDataToFile } from '@utils/file'
import { meanNumberOfUsedSeats } from '@utils/simulation/graph/templates'

import { buildHtml } from './buildHtml'

export function buildMeanNumberOfUsedSeats(path, xValues, yValues) {
    const fileName = `meanNumberOfUsedSeats.html`
    saveDataToFile(
        `${path}/${fileName}`,
        buildHtml(meanNumberOfUsedSeats(xValues, yValues))
    )
}
