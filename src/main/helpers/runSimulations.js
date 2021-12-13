'use strict'

import { copyObject } from '@utils/object'
import { handler } from '@utils/simulation'

export function runSimulations(dataset, experiment, distributions, path) {
    const simulation = handler(experiment.algorithmName)
    simulation.saveSimulationDataToFile(
        ...simulation.start(
            copyObject(dataset),
            copyObject(distributions),
            copyObject(experiment.config)
        ),
        path
    )
}
