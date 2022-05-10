'use strict'

import { copyObject } from '@utils/object'
import { removeFromQueue } from '@utils/queue'

export function localSearch(arrivals, seats, intervalBetweenRounds, state) {
    if (state === 'notExecuted') return

    const remainingTimeInTables = getRemainingTimeInTables(
        seats,
        intervalBetweenRounds
    )

    const firstSolution = getNewSolution(
        arrivals,
        copyObject(remainingTimeInTables)
    )

    const removed = []
    let currentSolution = firstSolution
    for (let i = 0; i < firstSolution.queue.length; i++) {
        removed.push(firstSolution.queue[i])

        const newArrivals = copyObject(arrivals)
        removeFromQueue(newArrivals, removed)

        const newSolution = getNewSolution(
            newArrivals,
            copyObject(remainingTimeInTables)
        )

        if (newSolution.effectiveness < currentSolution.effectiveness) {
            currentSolution = newSolution
        } else {
            removed.pop()
        }
    }

    removeFromQueue(arrivals, removed)
    for (const el of removed) {
        arrivals.push(el)
    }
}

function getRemainingTimeInTables(seats, intervalBetweenRounds) {
    const remainingTimeInTables = []

    for (let i = 0; i < seats.length; i++) {
        let remainingTime

        if (seats[i] === null || seats[i] === undefined) {
            remainingTime = intervalBetweenRounds
            remainingTimeInTables.push(remainingTime)
        } else {
            remainingTime =
                intervalBetweenRounds - seats[i].simulationData.seatTime
            remainingTimeInTables.push(remainingTime)
        }
    }
    return remainingTimeInTables
}

function getNewSolution(queue, remainingTimeInTables, solution = []) {
    const tablesLength = remainingTimeInTables.length
    const queueLength = queue.length
    const arr = new Array(tablesLength).fill(0)

    let policy =
        arr.reduce(
            (previousValue, currentValue) => previousValue + currentValue
        ) >= tablesLength

    let j = 0
    for (let i = 0; i < queueLength; i++) {
        if (policy) break
        j = i % tablesLength

        const instance = queue[i]
        const remainingTime = remainingTimeInTables[j]
        const timeToBeBurned = instance.simulationData.seatTime

        if (remainingTime >= timeToBeBurned) {
            remainingTimeInTables[j] = remainingTime - timeToBeBurned
            solution.push(instance)
        } else {
            arr[j] = 1
        }

        policy =
            arr.reduce(
                (previousValue, currentValue) => previousValue + currentValue
            ) >= tablesLength
    }

    const effectiveness = remainingTimeInTables.reduce(
        (previousValue, currentValue) => previousValue + currentValue
    )

    return { queue: solution, effectiveness: effectiveness }
}
