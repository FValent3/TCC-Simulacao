'use strict'

import { removeFromQueue } from '@utils/queue'

export function processSeatsDepartures(
    seats,
    departures,
    currentSimulationTime,
    debug
) {
    const seatsDepartures = getSeatsDepartures(seats, currentSimulationTime)

    processNewSeatsDepartures(seatsDepartures, currentSimulationTime)
    printSeatsDepartures(seatsDepartures, debug)
    removeFromQueue(seats, seatsDepartures)

    return [...departures, ...seatsDepartures]
}

function getSeatsDepartures(seats, currentSimulationTime) {
    return seats.filter(seat => {
        const { simulation, simulationData } = seat
        const departureTime =
            simulation.seatArrivalTime + simulationData.seatTime

        if (currentSimulationTime >= departureTime) return seat
    })
}

function processNewSeatsDepartures(seatsDepartures, currentSimulationTime) {
    const seatsDeparturesLength = seatsDepartures.length
    for (let i = 0; i < seatsDeparturesLength; i++) {
        seatsDepartures[i].simulation.seatDepartureTime = currentSimulationTime
        seatsDepartures[i].statusPipeline = 'unavailable'
    }
}

function printSeatsDepartures(seatsDepartures, debug) {
    if (!debug) return
    seatsDepartures.forEach(departure => {
        console.log(`A pessoa nº ${departure.id} desocupou a mesa`)
    })
}
