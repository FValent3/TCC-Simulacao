'use strict'

import {
    getAvailablePipelineObject,
    updatePipelineObjectToAvailable
} from '@utils/pipeline'
import { removeFromQueue } from '@utils/queue'

export function processSeatsArrivals(
    seats,
    usingSeats,
    seatingCapacity,
    currentSimulationTime,
    debug
) {
    const seatsArrivals = getSeatsArrivals(
        getAvailablePipelineObject(seats),
        seatingCapacity,
        usingSeats.length
    )

    processNewSeatsArrivals(seatsArrivals, currentSimulationTime)
    removeFromQueue(seats, seatsArrivals)
    printSeatsArrivals(seatsArrivals, debug)
    updatePipelineObjectToAvailable(seats, currentSimulationTime)

    return [...usingSeats, ...seatsArrivals]
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
