'use strict'

import { removeFromQueue } from '@utils/queue'

export function processArrivals(
    population,
    arrivals,
    currentSimulationTime,
    debug
) {
    const newArrivals = getArrivals(population, currentSimulationTime)
    processNewArrivals(newArrivals, currentSimulationTime)
    printNewArrivals(newArrivals, debug)
    removeFromQueue(population, newArrivals)

    return [...arrivals, ...newArrivals]
}

function getArrivals(population, currentSimulationTime) {
    return population.filter(arrival => {
        const { simulationData } = arrival
        const { cumulativeSumTime } = simulationData
        return currentSimulationTime >= cumulativeSumTime
    })
}

function processNewArrivals(newArrivals, currentSimulationTime) {
    const newArrivalsLength = newArrivals.length
    for (let i = 0; i < newArrivalsLength; i++) {
        newArrivals[i].simulation.arrivalTime = currentSimulationTime
        newArrivals[i].statusPipeline = 'unavailable'
    }
}

function printNewArrivals(newArrivals, debug = false) {
    if (!debug) return
    newArrivals.forEach(arrival => {
        console.log(`A pessoa nº ${arrival.id} entrou na fila`)
    })
}
