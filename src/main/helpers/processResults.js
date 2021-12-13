'use strict'

import { readFile, getDirsNames, saveDataToJSON } from '@utils/file'

export function processResults(path) {
    const dirNames = getDirsNames(path)
    const simulationResults = dirNames.map(name => {
        const _path = `${path}/${name}/results.json`
        return {
            name: name,
            ...JSON.parse(readFile(_path, 'utf8'))
        }
    })

    const length = dirNames.length
    const calculateProperty = (arr, property) =>
        arr
            .map(x => x[property])
            .reduce((previous, current) => (previous += current)) / length

    const names = [
        'totalSimulationTime',
        'meanWaitingTime',
        'meanWaitingTimeInArrivalsQueue',
        'meanWaitingTimeInSeatsQueue',
        'meanLengthOfArrivalsQueue',
        'meanLengthOfSeatsQueue',
        'meanNumberOfUsedSeats'
    ]

    const properties = [
        'totalSimulationTime',
        'meanWaitingTime',
        'meanWaitingTimeInArrivalsQueue',
        'meanWaitingTimeInSeatsQueue',
        'meanLengthOfArrivalsQueue',
        'meanLengthOfSeatsQueue',
        'meanNumberOfUsedSeats'
    ]

    const dataSimulation = {}
    for (let i = 0; i < names.length; i++) {
        dataSimulation[names[i]] = calculateProperty(
            simulationResults,
            properties[i]
        )
    }

    saveDataToJSON(`${path}/simulationResults.json`, dataSimulation)
}
