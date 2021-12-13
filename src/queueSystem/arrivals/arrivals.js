import { removeObjectsFromQueue } from '@utils/queue'

export function processArrivals(
    population,
    arrivals,
    currentSimulationTime,
    debug
) {
    const newArrivals = getNewArrivals(population, currentSimulationTime)
    processNewArrivals(newArrivals, currentSimulationTime)
    printNewArrivals(newArrivals, debug)
    removeObjectsFromQueue(population, newArrivals)
    return [...arrivals, ...newArrivals]
}

function getNewArrivals(population, currentSimulationTime) {
    const filtered = []

    const populationLength = population.length
    for (let i = 0; i < populationLength; i++) {
        const instance = population[i]
        const { instanceSimulationData } = instance
        if (currentSimulationTime >= instanceSimulationData.cumulativeSumTime) {
            filtered.push(instance)
        }
    }
    return filtered
}

function processNewArrivals(newArrivals, currentSimulationTime) {
    newArrivals.forEach(instance => {
        instance.statusPipeline = 'unavailable'
        instance.simulation.arrivalTime = currentSimulationTime
    })
}

function printNewArrivals(newArrivals, debug = false) {
    newArrivals.forEach(instance => {
        if (debug) {
            console.log(`A pessoa nº ${instance.id} entrou na fila`)
        }
    })
}
