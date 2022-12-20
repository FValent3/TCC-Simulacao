'use strict'
import { saveDataToFile } from '@utils/file'
import { totalSimulationTime } from '@utils/simulation/graph/templates'

import { buildHtml } from './buildHtml'

export function buildTotalSimulationTime(path, xValues, yValues) {
    const fileName = `totalSimulationTime.html`
    saveDataToFile(
        `${path}/${fileName}`,
        buildHtml(totalSimulationTime(xValues, yValues))
    )
}
