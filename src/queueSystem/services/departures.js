'use strict'

import { removeFromQueue } from '@utils/queue'

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
    removeFromQueue(servers, serviceDepartures)

    return [...waitingSeats, ...serviceDepartures]
}

function getServiceDepartures(servers, currentSimulationTime) {
    return servers.filter(departure => {
        const { simulation, simulationData } = departure
        const arrivalTimeQueueSeats =
            simulation.serviceArrivalTime + simulationData.serviceTime

        return currentSimulationTime >= arrivalTimeQueueSeats
    })
}

function processNewServiceDepartures(serviceDepartures, currentSimulationTime) {
    const serviceDeparturesLength = serviceDepartures.length
    for (let i = 0; i < serviceDeparturesLength; i++) {
        serviceDepartures[i].simulation.serviceDepartureTime =
            currentSimulationTime
        serviceDepartures[i].statusPipeline = 'unavailable'
    }
}

function printNewServiceDepartures(serviceDepartures, debug) {
    if (!debug) return
    serviceDepartures.forEach(departure => {
        console.log(`A pessoa nº ${departure.id} finalizou o serviço`)
    })
}
