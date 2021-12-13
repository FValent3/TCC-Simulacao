'use strict'

import { getDirsNames, readFile } from '@utils/file'
import { formatDatatoGraph, graph } from '@utils/simulation'

export function graphsComposition(path) {
    const dirNames = getDirsNames(path)
    let dirs = dirNames.map(name => `${path}/${name}`)
    dirs = dirs.map(el => getDirsNames(el))

    const greedyResults = dirs[0].map(name => {
        const _path = `${path}/greedy/${name}/simulationResults.json`
        return {
            name: name,
            ...JSON.parse(readFile(_path, 'utf8'))
        }
    })

    const simulationResults = dirs[2].map(name => {
        const _path = `${path}/simulation/${name}/simulationResults.json`
        return {
            name: name,
            ...JSON.parse(readFile(_path, 'utf8'))
        }
    })

    const simulationMetaResults = dirs[1].map(name => {
        const _path = `${path}/prioritySortingLocalSearch/${name}/simulationResults.json`
        return {
            name: name,
            ...JSON.parse(readFile(_path, 'utf8'))
        }
    })

    const properties = [
        'totalSimulationTime',
        'meanWaitingTime',
        'meanWaitingTimeInArrivalsQueue',
        'meanWaitingTimeInSeatsQueue',
        'meanLengthOfArrivalsQueue',
        'meanLengthOfSeatsQueue',
        'meanNumberOfUsedSeats'
    ]

    const result = [].concat(
        formatDatatoGraph(simulationResults, properties),
        formatDatatoGraph(greedyResults, properties),
        formatDatatoGraph(simulationMetaResults, properties)
    )
    graph(path, result)
}
