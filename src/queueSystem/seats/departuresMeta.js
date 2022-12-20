'use strict'

export function processSeatsDeparturesMeta(
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
        if (seat === null || seat === undefined) return

        const { simulation, simulationData } = seat
        const departureTime =
            simulation.seatArrivalTime + simulationData.seatTime

        return currentSimulationTime >= departureTime
    })
}

function processNewSeatsDepartures(seatsDepartures, currentSimulationTime) {
    const seatsDeparturesLength = seatsDepartures.length
    for (let i = 0; i < seatsDeparturesLength; i++) {
        seatsDepartures[i].simulation.seatDepartureTime = currentSimulationTime
        seatsDepartures[i].statusPipeline = 'unavailable'
    }
}

function removeFromQueue(queue, toRemove) {
    const toRemoveLength = toRemove.length
    for (let j = 0; j < toRemoveLength; j++) {
        for (let i = 0; i < queue.length; i++) {
            if (queue[i] === null) continue
            if (toRemove[j].id === queue[i].id) {
                queue[i] = null
                break
            }
        }
    }
}

function printSeatsDepartures(seatsDepartures, debug) {
    if (!debug) return
    seatsDepartures.forEach(departure => {
        console.log(`A pessoa nº ${departure.id} desocupou a mesa`)
    })
}
