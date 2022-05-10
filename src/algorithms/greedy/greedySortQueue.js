'use strict'

import { copyObject } from '@utils/object'

export function greedySortQueue(
    queue,
    intervalBetweenRounds,
    lengthOfQueueSeats,
    numberOfSeatsInSystem,
    quantityRounds,
    swapFactor,
    maxPenalitiesPerPerson,
    currentSimulationTime
) {
    const currentRound = currentSimulationTime % intervalBetweenRounds
    if (
        currentSimulationTime % intervalBetweenRounds !== 0 ||
        currentRound > quantityRounds
    )
        return 'notExecuted'

    const priority = determinePriority(
        lengthOfQueueSeats,
        swapFactor,
        numberOfSeatsInSystem
    )

    orderByPriority(queue, priority, maxPenalitiesPerPerson)
    return 'executed'
}

function determinePriority(
    lengthOfQueueSeats,
    swapFactor,
    numberOfSeatsInSystem
) {
    if (lengthOfQueueSeats >= swapFactor * numberOfSeatsInSystem)
        return 'seatPriority'
    return 'queuePriority'
}

function orderByPriority(queue, priority, maxPenalitiesPerPerson) {
    const originalQueue = copyObject(queue)
    const aux = []

    const newQueue = queue
        .filter((element, index) => {
            if (element.penalties <= maxPenalitiesPerPerson) return element
            aux.push(index)
        })
        .sort((x, y) => x[priority] - y[priority])

    aux.forEach(element => newQueue.splice(element, 0, queue[element]))

    let j = queue.length
    while (j--) queue[j] = newQueue[j]

    applyPenalties(queue, originalQueue)
}

function applyPenalties(queue, originalQueue) {
    const queueLength = queue.length
    const originalQueueLength = originalQueue.length
    for (let j = 0; j < originalQueueLength; j++) {
        for (let i = 0; i < queueLength; i++) {
            if (originalQueue[j].id === queue[i].id && j < i) {
                queue[i].penalties++
                break
            }
        }
    }
}
