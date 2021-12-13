'use strict'

import { saveDataToJSON, makeDir } from '@utils/file'

const root = 'data/datasets'
const simulationName = 'resun'

const maxSimulationTime = 11700
const populationSize = 3500
const numbersOfSeats = [350, 300, 250, 200]
const numbersOfServers = [2, 3, 4]

const arrivalsLambda = 1077
const service = {
    mean: 8,
    standardDeviation: 4
}
const seats = {
    mean: 1200,
    standardDeviation: 600
}

const instanceQuantity = 10
const path = `${root}/${simulationName}`

export function generateResunInstance() {
    makeDir(path)
    for (const [A, numberOfSeats] of numbersOfSeats.entries()) {
        for (const [B, numberOfServers] of numbersOfServers.entries()) {
            const saveDirPath = `${path}/${simulationName}_${A + 1}_${B + 1}`
            const saveSimulationPath = `${saveDirPath}/simulation.json`
            const saveInstancePath = `${saveDirPath}/instance.json`
            makeDir(saveDirPath)
            saveDataToJSON(saveSimulationPath, {
                simulationData: {
                    maxSimulationTime: maxSimulationTime,
                    populationSize: populationSize,
                    numberOfSeats: numberOfSeats,
                    numberOfServers: numberOfServers
                },
                arrivals: {
                    lambda: arrivalsLambda
                },
                service: {
                    mean: service.mean,
                    standardDeviation: service.standardDeviation
                },
                seats: {
                    mean: seats.mean,
                    standardDeviation: seats.standardDeviation
                }
            })

            saveDataToJSON(saveInstancePath, {
                instances: {
                    quantity: instanceQuantity
                }
            })
        }
    }
}
