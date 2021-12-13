'use strict'

import {
    positiveNormalDistribution,
    randomExponencialDistribution
} from '@libs/distributions'
import { getDirsNames, readFileJSON } from '@utils/file'

import {
    graphsComposition,
    processResults,
    runSimulations,
    saveReplicationToFile
} from './helpers'

const PATH_OUTPUTS = 'data/outputs'
const PATH_DATASETS = 'data/datasets'
const PATH_EXPERIMENTS = 'data/experiments'
const FILE_INSTANCE = 'simulation.json'
const FILE_ALGORITHM = 'algorithm.json'
const FILE_SEEDS = 'seeds.json'

;(function main() {
    const seedsPath = `${PATH_EXPERIMENTS}/${FILE_SEEDS}`
    const seeds = readFileJSON(seedsPath)

    const groupOfDatasets = getDirsNames(PATH_DATASETS)
    const groupOfExperiments = getDirsNames(PATH_EXPERIMENTS)

    for (const groupOfDataset of groupOfDatasets) {
        const datasetsPath = `${PATH_DATASETS}/${groupOfDataset}`
        const datasetsNames = getDirsNames(datasetsPath)
        const datasets = getDatasetsJSON(datasetsNames, groupOfDataset)

        for (const dataset of datasets) {
            for (const groupOfExperiment of groupOfExperiments) {
                const experimentsNames = getDirsNames(
                    `${PATH_EXPERIMENTS}/${groupOfExperiment}`
                )
                const experiments = getAlgorithmsJSON(
                    experimentsNames,
                    groupOfExperiment
                )

                for (const experiment of experiments) {
                    const numberOfReplications = seeds.length

                    for (let i = 0; i < numberOfReplications; i++) {
                        const { simulationData, arrivals, service, seats } =
                            dataset
                        const distributions = {
                            arrivals: randomExponencialDistribution(
                                simulationData.populationSize,
                                arrivals.lambda,
                                seeds[i].arrivals
                            ),
                            service: positiveNormalDistribution(
                                simulationData.populationSize,
                                service.mean,
                                service.standardDeviation,
                                seeds[i].departures,
                                service.min
                            ),
                            seats: positiveNormalDistribution(
                                simulationData.populationSize,
                                seats.mean,
                                seats.standardDeviation,
                                seeds[i].service,
                                seats.min
                            )
                        }
                        const replicationName = `replication_${i}`
                        const pathReplication = `${PATH_OUTPUTS}/${dataset.parent}/${dataset.name}/${experiment.algorithmName}/${experiment.name}/${replicationName}`
                        saveReplicationToFile(pathReplication, distributions)
                        runSimulations(
                            dataset,
                            experiment,
                            distributions,
                            pathReplication
                        )
                    }

                    const pathResults = `${PATH_OUTPUTS}/${dataset.parent}/${dataset.name}/${experiment.algorithmName}/${experiment.name}`
                    processResults(pathResults)
                }
            }
            const pathGraphsComposition = `${PATH_OUTPUTS}/${dataset.parent}/${dataset.name}`
            graphsComposition(pathGraphsComposition)
        }
    }
})()

function getDatasetsJSON(nameDatasets, groupOfDataset) {
    return nameDatasets.map(name => {
        const path = `${PATH_DATASETS}/${groupOfDataset}/${name}/${FILE_INSTANCE}`
        return {
            name: name,
            parent: groupOfDataset,
            ...readFileJSON(path)
        }
    })
}

function getAlgorithmsJSON(nameExperiments, groupOfExperiment) {
    return nameExperiments.map(name => {
        const path = `${PATH_EXPERIMENTS}/${groupOfExperiment}/${name}/${FILE_ALGORITHM}`
        return {
            name: name,
            parent: groupOfExperiment,
            ...readFileJSON(path)
        }
    })
}
