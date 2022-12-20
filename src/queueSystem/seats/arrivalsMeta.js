'use strict'

import {
    getAvailablePipelineObject,
    updatePipelineObjectToAvailable
} from '@utils/pipeline'
import { removeFromQueue } from '@utils/queue'

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
    printSeatsArrivals(seatsArrivals, debug)
    removeFromQueue(seats, seatsArrivals)
    updatePipelineObjectToAvailable(seats, currentSimulationTime)

    const usingSeatsLength = usingSeats.length
    for (let i = 0; i < usingSeatsLength; i++) {
        if (seatsArrivals.length === 0) break
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
    const seatsArrivalsLength = seatsArrivals.length
    for (let i = 0; i < seatsArrivalsLength; i++) {
        seatsArrivals[i].simulation.seatArrivalTime = currentSimulationTime
    }
}

function printSeatsArrivals(seatsArrivals, debug) {
    if (!debug) return
    seatsArrivals.forEach(arrival => {
        console.log(`A pessoa nº ${arrival.id} sentou na mesa`)
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
