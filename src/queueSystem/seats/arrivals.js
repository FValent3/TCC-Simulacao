import {
    getAvailablePipelineObject,
    updatePipelineObjectToAvailable
} from '@utils/pipeline'
import { removeObjectsFromQueue } from '@utils/queue'

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
    removeObjectsFromQueue(seats, seatsArrivals)
    printSeatsArrivals(seatsArrivals, debug)
    updatePipelineObjectToAvailable(seats, currentSimulationTime)

    return [...usingSeats, ...seatsArrivals]
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
