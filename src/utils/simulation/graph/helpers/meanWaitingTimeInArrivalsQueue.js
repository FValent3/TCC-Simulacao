'use strict'

import { saveDataToFile } from '@utils/file'
import { meanWaitingTimeInArrivalsQueue } from '@utils/simulation/graph/templates'

import { buildHtml } from './buildHtml'

export function buildMeanWaitingTimeInArrivalsQueue(path, xValues, yValues) {
    const fileName = 'meanWaitingTimeInArrivalsQueue.html'
    saveDataToFile(
        `${path}/${fileName}`,
        buildHtml(meanWaitingTimeInArrivalsQueue(xValues, yValues))
    )
}
