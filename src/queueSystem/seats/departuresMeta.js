export function processSeatsDeparturesMeta(
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
        if (seats[i] === null || seats[i] === undefined) continue
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

function removeObjectsFromQueue(queue, instancesToRemove) {
    const instancesToRemoveLength = instancesToRemove.length
    let countSplice = 0
    for (let j = 0; j < instancesToRemoveLength; j++) {
        for (let i = 0; i < queue.length; i++) {
            if (instancesToRemove[j].id === queue[i].id) {
                queue.splice(i--, 1)
                countSplice++
                break
            }
        }
    }

    for (let i = 0; i < countSplice; i++) {
        queue.push(null)
    }
}
