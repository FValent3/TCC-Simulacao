'use strict'

import { saveDataToJSON, makeDir } from '@utils/file'

const root = 'data'
const basePath = `${root}/experiments`

export function generateGreedySimulationExperiment() {
    const experimentName = 'greedy'
    const path = `${basePath}/${experimentName}`

    const swapFactors = [1, 0.8, 0.6]
    const roundsAmount = [2, 4, 6]

    let index = 0
    for (const swapFactor of swapFactors) {
        for (const rounds of roundsAmount) {
            const i = (index + 11).toString(36).toUpperCase() + ''

            const saveDirPath = `${path}/experiment_${i}`
            const saveAlgorithmPath = `${saveDirPath}/algorithm.json`
            makeDir(saveDirPath)

            saveDataToJSON(saveAlgorithmPath, {
                algorithmName: 'greedy',
                numberOfReplications: 10,
                config: {
                    swapFactor: swapFactor,
                    rounds: rounds
                }
            })
            index++
        }
    }
}
