'use strict'

import {
    getAvailablePipelineObject,
    updatePipelineObjectToAvailable
} from '@utils/pipeline'
import { removeFromQueue } from '@utils/queue'

export function processServicesArrivals(
    arrivals,
    servers,
    serviceCapacity,
    currentSimulationTime,
    debug
) {
    const pipeline = getAvailablePipelineObject(arrivals)

    const serviceArrivals = getServiceArrivals(
        pipeline,
        serviceCapacity,
        servers.length
    )

    processNewServiceArrivals(serviceArrivals, currentSimulationTime)
    printNewServicesArrivals(serviceArrivals, debug)
    removeFromQueue(arrivals, serviceArrivals)
    updatePipelineObjectToAvailable(arrivals)

    return [...servers, ...serviceArrivals]
}

function getServiceArrivals(pipeline, serviceCapacity, serviceLength) {
    return pipeline.splice(0, serviceCapacity - serviceLength)
}

function processNewServiceArrivals(serviceNewArrivals, currentSimulationTime) {
    const serviceNewArrivalsLength = serviceNewArrivals.length
    for (let i = 0; i < serviceNewArrivalsLength; i++) {
        serviceNewArrivals[i].simulation.serviceArrivalTime =
            currentSimulationTime
    }
}

function printNewServicesArrivals(serviceNewArrivals, debug) {
    if (!debug) return
    serviceNewArrivals.forEach(arrival => {
        console.log(`A pessoa nº ${arrival.id} iniciou o serviço`)
    })
}
