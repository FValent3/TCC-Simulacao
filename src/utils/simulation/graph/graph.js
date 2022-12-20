import {
    buildMeanWaitingTime,
    buildTotalSimulationTime,
    buildMeanWaitingTimeInArrivalsQueue,
    buildMeanWaitingTimeInSeatsQueue,
    buildMeanLengthOfArrivalsQueue,
    buildMeanLengthOfSeatsQueue,
    buildMeanNumberOfUsedSeats,
    buildMeanLength
} from './helpers'

export function graph(path, arr) {
    const { xValues, yValues } = arr.reduce(
        (acc, el) => {
            const { name, ...rest } = el
            acc.xValues.push(name)
            acc.yValues.push(rest)
            return acc
        },
        { xValues: [], yValues: [] }
    )

    buildTotalSimulationTime(path, xValues, yValues)
    buildMeanWaitingTime(path, xValues, yValues)
    buildMeanWaitingTimeInArrivalsQueue(path, xValues, yValues)
    buildMeanWaitingTimeInSeatsQueue(path, xValues, yValues)
    buildMeanLengthOfArrivalsQueue(path, xValues, yValues)
    buildMeanLengthOfSeatsQueue(path, xValues, yValues)
    buildMeanLength(path, xValues, yValues)
    buildMeanNumberOfUsedSeats(path, xValues, yValues)
}
