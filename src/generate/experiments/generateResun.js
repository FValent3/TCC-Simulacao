'use strict'

import { saveDataToJSON, makeDir } from '@utils/file'

const root = 'data/datasets/experiments'
const experimentName = 'experiment'

const swapFactors = [1, 0.8, 0.6]
const roundsAmount = [2, 4, 6]

const instanceQuantity = 10

const path = `${root}/${experimentName}`

makeDir(path)

for (const [A, swapFactor] of swapFactors.entries()) {
    for (const [B, rounds] of roundsAmount.entries()) {
        const saveDirPath = `${path}/${experimentName}_${A + 1}_${B + 1}`
        const saveAlgorithmPath = `${saveDirPath}/algorithmConfig.json`
        const saveInstancePath = `${saveDirPath}/instance.json`
        makeDir(saveDirPath)

        saveDataToJSON(saveAlgorithmPath, {
            algorithmConfig: {
                swapFactor: swapFactor,
                rounds: rounds
            }
        })
        saveDataToJSON(saveInstancePath, {
            instances: {
                quantity: instanceQuantity
            }
        })
    }
}
