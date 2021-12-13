import {
    getAvailablePipelineObject,
    updatePipelineObjectToAvailable
} from '@utils/pipeline'
import { removeObjectsFromQueue } from '@utils/queue'

export function processServicesArrivals(
    arrivals,
    servers,
    serviceCapacity,
    currentSimulationTime,
    debug
) {
    const pipeline = getAvailablePipelineObject(arrivals)

    const serviceNewArrivals = getNewServiceArrivals(
        pipeline,
        serviceCapacity,
        servers.length
    )

    removeObjectsFromQueue(arrivals, serviceNewArrivals)
    processNewServiceArrivals(serviceNewArrivals, currentSimulationTime)
    printNewServicesArrivals(serviceNewArrivals, debug)
    updatePipelineObjectToAvailable(arrivals)

    return [...servers, ...serviceNewArrivals]
}

function getNewServiceArrivals(pipeline, serviceCapacity, serviceLength) {
    return pipeline.splice(0, serviceCapacity - serviceLength)
}

function processNewServiceArrivals(serviceNewArrivals, currentSimulationTime) {
    serviceNewArrivals.forEach(instance => {
        instance.simulation.serviceArrivalTime = currentSimulationTime
    })
}

function printNewServicesArrivals(serviceNewArrivals, debug) {
    serviceNewArrivals.forEach(instance => {
        if (debug) {
            console.log(`A pessoa nº ${instance.id} iniciou o serviço`)
        }
    })
}
