import {
    getAvailablePipelineObject,
    updatePipelineObjectToAvailable
} from '@utils/pipeline'
import { removeObjectsFromQueue } from '@utils/queue'

export function processSeatsArrivalsMeta(
    seats,
    usingSeats,
    seatingCapacity,
    currentSimulationTime,
    debug
) {
    const seatsArrivals = getSeatsArrivals(
        getAvailablePipelineObject(seats),
        seatingCapacity,
        getNumberOfOccupiedSpaces(usingSeats)
    )
    processNewSeatsArrivals(seatsArrivals, currentSimulationTime)
    removeObjectsFromQueue(seats, seatsArrivals)
    printSeatsArrivals(seatsArrivals, debug)
    updatePipelineObjectToAvailable(seats, currentSimulationTime)
    for (let i = 0; i < usingSeats.length; i++) {
        if (getNumberOfOccupiedSpaces(usingSeats) < seatingCapacity) {
            if (usingSeats[i] === null || usingSeats[i] === undefined) {
                usingSeats[i] = seatsArrivals.shift()
            }
        }
    }

    return usingSeats
}

function getSeatsArrivals(pipeline, seatingCapacity, numberOfUsingSeats) {
    return pipeline.splice(0, seatingCapacity - numberOfUsingSeats)
}

function processNewSeatsArrivals(seatsArrivals, currentSimulationTime) {
    seatsArrivals.forEach(instance => {
        instance.simulation.serviceArrivalTime = currentSimulationTime
    })
}

function printSeatsArrivals(seatsArrivals, debug) {
    seatsArrivals.forEach(instance => {
        if (debug) {
            console.log(`A pessoa nº ${instance.id} sentou na mesa`)
        }
    })
}

function getNumberOfOccupiedSpaces(arr) {
    let count = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === null || arr[i] === undefined) continue
        count++
    }
    return count
}
