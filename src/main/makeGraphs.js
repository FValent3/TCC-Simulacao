import { getDirsNames, readFileJSON } from '@utils/file'

import { graphsComposition } from './helpers'

const PATH_OUTPUTS = 'data/outputs'
const PATH_DATASETS = 'data/datasets'
const FILE_INSTANCE = 'simulation.json'

;(function main() {
    const groupOfDatasets = getDirsNames(PATH_DATASETS)
    makeGraphs(groupOfDatasets)
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

function makeGraphs(groupOfDatasets) {
    for (const groupOfDataset of groupOfDatasets) {
        const datasetsPath = `${PATH_DATASETS}/${groupOfDataset}`
        const datasetsNames = getDirsNames(datasetsPath)
        const datasets = getDatasetsJSON(datasetsNames, groupOfDataset)

        for (const dataset of datasets) {
            const pathGraphsComposition = `${PATH_OUTPUTS}/${dataset.parent}/${dataset.name}`
            graphsComposition(pathGraphsComposition)
        }
    }
}
