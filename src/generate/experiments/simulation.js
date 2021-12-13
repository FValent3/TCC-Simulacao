'use strict'

import { simulationExperiment } from '@entities/simulationExperiment.js'
import { saveDataToJSON, makeDir } from '@utils/file'

const root = 'data'
const basePath = `${root}/experiments`

export function generateSimulationExperiment() {
    const experimentName = 'simulation'
    const path = `${basePath}/${experimentName}`

    const saveDirPath = `${path}/experiment_A`
    makeDir(saveDirPath)

    const filePath = `${saveDirPath}/algorithm.json`
    saveDataToJSON(filePath, simulationExperiment)
}
