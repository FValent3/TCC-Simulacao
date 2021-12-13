import { removeObjectsFromQueue } from '@utils/queue'

export function processSeatsDepartures(
    seats,
    departures,
    currentSimulationTime,
    debug
) {
    const seatsDepartures = getSeatsDepartures(seats, currentSimulationTime)
    processNewSeatsDepartures(seatsDepartures, currentSimulationTime)
    printSeatsDepartures(seatsDepartures, debug)
    removeObjectsFromQueue(seats, seatsDepartures)

    return [...departures, ...seatsDepartures]
}

function getSeatsDepartures(seats, currentSimulationTime) {
    const restaurantTableLength = seats.length
    const filtered = []
    for (let i = 0; i < restaurantTableLength; i++) {
        const instance = seats[i]

        const { simulation, instanceSimulationData } = seats[i]
        const departureTime =
            simulation.serviceArrivalTime + instanceSimulationData.seatTime

        if (currentSimulationTime >= departureTime) filtered.push(instance)
    }
    return filtered
}

function processNewSeatsDepartures(seatsDepartures, currentSimulationTime) {
    seatsDepartures.forEach(instance => {
        instance.statusPipeline = 'unavailable'
        instance.simulation.restaurantTableDepartureTime = currentSimulationTime
    })
}

function printSeatsDepartures(seatsDepartures, debug) {
    seatsDepartures.forEach(instance => {
        if (debug) {
            console.log(`A pessoa nº ${instance.id} desocupou a mesa`)
        }
    })
}
