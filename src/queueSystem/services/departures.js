'use strict'

import { removeObjectsFromQueue } from '@utils/queue'

export function processServiceDepartures(
    servers,
    waitingSeats,
    currentSimulationTime,
    debug
) {
    const serviceDepartures = getServiceDepartures(
        servers,
        currentSimulationTime
    )
    processNewServiceDepartures(serviceDepartures, currentSimulationTime)
    printNewServiceDepartures(serviceDepartures, debug)
    removeObjectsFromQueue(servers, serviceDepartures)
    return [...waitingSeats, ...serviceDepartures]
}

function getServiceDepartures(servers, currentSimulationTime) {
    const filtered = []

    for (let i = 0; i < servers.length; i++) {
        const instance = servers[i]
        const { simulation, instanceSimulationData } = instance
        const arrivalTimeQueueSeats =
            simulation.serviceArrivalTime + instanceSimulationData.serviceTime

        if (currentSimulationTime >= arrivalTimeQueueSeats)
            filtered.push(instance)
    }

    return servers.filter(instance => {
        const { simulation, instanceSimulationData } = instance
        const arrivalTimeQueueSeats =
            simulation.serviceArrivalTime + instanceSimulationData.serviceTime

        return currentSimulationTime >= arrivalTimeQueueSeats
    })
}

function processNewServiceDepartures(serviceDepartures, currentSimulationTime) {
    serviceDepartures.forEach(instance => {
        instance.statusPipeline = 'unavailable'
        instance.simulation.serviceDepartureTime = currentSimulationTime
    })
}

function printNewServiceDepartures(serviceDepartures, debug) {
    serviceDepartures.forEach(instance => {
        if (debug) {
            console.log(`A pessoa nº ${instance.id} finalizou o serviço`)
        }
    })
}
