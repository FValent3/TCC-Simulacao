'use strict'

import { saveDataToFile } from '@utils/file'
import { meanLength } from '@utils/simulation/graph/templates'

import { buildHtml } from './buildHtml'

export function buildMeanLength(path, xValues, yValues) {
    const fileName = `meanLength.html`
    saveDataToFile(
        `${path}/${fileName}`,
        buildHtml(meanLength(xValues, yValues))
    )
}
