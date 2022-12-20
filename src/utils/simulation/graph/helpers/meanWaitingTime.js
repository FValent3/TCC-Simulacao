'use strict'
import { saveDataToFile } from '@utils/file'
import { meanWaitingTime } from '@utils/simulation/graph/templates'

import { buildHtml } from './buildHtml'

export function buildMeanWaitingTime(path, xValues, yValues) {
    const fileName = `meanWaitingTime.html`

    saveDataToFile(
        `${path}/${fileName}`,
        buildHtml(meanWaitingTime(xValues, yValues))
    )
}
