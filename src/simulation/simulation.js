'use strict'

import { processArrivals } from '@queueSystem/arrivals'
import {
    processSeatsArrivals,
    processSeatsDepartures
} from '@queueSystem/seats'
import {
    processServiceDepartures,
    processServicesArrivals
} from '@queueSystem/services'
import { cumulativeSums } from '@utils/data'
import { makeDir, saveDataToJSON } from '@utils/file'

export const simulation = {
    start(dataset, distributions, config = {}) {
        let currentSimulationTime = 0
        let arrivals = []
        let servers = []
        let waitingSeats = []
        let seats = []
        let departures = []

        const dataPerRounds = {
            arrivalsLength: [],
            waitingSeatsLength: [],
            numbersOfUsedSeats: []
        }
        const { simulationData } = dataset

        const population = this.generatePopulation(
            distributions,
            simulationData.populationSize
        )
        this.fixCalculationOfTimeIntervals(
            population,
            simulationData.numberOfServers
        )

        while (
            currentSimulationTime < simulationData.maxSimulationTime &&
            departures.length < simulationData.populationSize
        ) {
            arrivals = processArrivals(
                population,
                arrivals,
                currentSimulationTime
            )

            servers = processServicesArrivals(
                arrivals,
                servers,
                simulationData.numberOfServers,
                currentSimulationTime
            )

            waitingSeats = processServiceDepartures(
                servers,
                waitingSeats,
                currentSimulationTime
            )

            seats = processSeatsArrivals(
                waitingSeats,
                seats,
                simulationData.numberOfSeats,
                currentSimulationTime
            )

            departures = processSeatsDepartures(
                seats,
                departures,
                currentSimulationTime
            )

            dataPerRounds.numbersOfUsedSeats.push(seats.length)
            dataPerRounds.arrivalsLength.push(arrivals.length)
            dataPerRounds.waitingSeatsLength.push(waitingSeats.length)
            currentSimulationTime++
        }

        while (!this.isQueueSystemEmpty(servers, waitingSeats, seats)) {
            servers = processServicesArrivals(
                arrivals,
                servers,
                simulationData.numberOfServers,
                currentSimulationTime
            )

            waitingSeats = processServiceDepartures(
                servers,
                waitingSeats,
                currentSimulationTime
            )

            seats = processSeatsArrivals(
                waitingSeats,
                seats,
                simulationData.numberOfSeats,
                currentSimulationTime
            )

            departures = processSeatsDepartures(
                seats,
                departures,
                currentSimulationTime
            )

            currentSimulationTime++
        }

        const notProcessed = arrivals.length
        return [
            simulationData,
            departures,
            currentSimulationTime,
            dataPerRounds,
            notProcessed
        ]
    },

    generatePopulation(distributions = [], populationSize = 1) {
        const cumulativeSumsTime = cumulativeSums(...distributions.arrivals)
        const servingTime = [...distributions.service]
        const seatsTime = [...distributions.seats]

        return [...Array(populationSize)].map((_, id) => ({
            id: id,
            statusPipeline: 'available',
            instanceSimulationData: {
                cumulativeSumTime: cumulativeSumsTime[id],
                serviceTime: servingTime[id],
                seatTime: seatsTime[id]
            },
            simulation: {}
        }))
    },

    isQueueSystemEmpty(servers, waitingSeats, seats) {
        return servers.length + waitingSeats.length + seats.length === 0
    },

    fixCalculationOfTimeIntervals(population, numberOfServers) {
        const SERVICE_TIME = 300
        const SEAT_TIME = 900
        const arrOfReferences = population.slice({ start: 0 }, numberOfServers)

        arrOfReferences.forEach(instance => {
            const { instanceSimulationData } = instance
            instanceSimulationData.serviceTime = SERVICE_TIME
            instanceSimulationData.seatTime = SEAT_TIME
        })
    },

    saveSimulationDataToFile(
        simulationData,
        departures,
        currentSimulationTime,
        dataPerRounds,
        notProcessed,
        path
    ) {
        makeDir(path)
        saveDataToJSON(`${path}/departures.json`, departures)
        saveDataToJSON(`${path}/results.json`, {
            totalSimulationTime: currentSimulationTime,
            meanWaitingTime: this.averageWaitingTime(
                departures,
                simulationData.populationSize - notProcessed
            ),
            meanWaitingTimeInArrivalsQueue: this.averageWaitingTimeQueue(
                departures,
                simulationData.populationSize - notProcessed
            ),
            meanWaitingTimeInSeatsQueue: this.averageWaitingTimeSeat(
                departures,
                simulationData.populationSize - notProcessed
            ),
            meanLengthOfArrivalsQueue: this.averageSize(
                dataPerRounds.arrivalsLength,
                currentSimulationTime
            ),
            meanLengthOfSeatsQueue: this.averageSize(
                dataPerRounds.waitingSeatsLength,
                currentSimulationTime
            ),
            meanNumberOfUsedSeats: this.averageUsage(
                dataPerRounds.numbersOfUsedSeats,
                currentSimulationTime
            )
        })
    },

    averageUsage(arr, time) {
        return arr.reduce((acc, s) => (acc += s)) / time
    },

    averageSize(arr, currentSimulationTime) {
        return arr.reduce((acc, s) => (acc += s)) / currentSimulationTime
    },

    averageWaitingTime(departures, length) {
        return (
            departures.reduce(
                (acc, s) =>
                    (acc +=
                        s.simulation.serviceArrivalTime -
                        s.simulation.arrivalTime -
                        1 +
                        (s.simulation.serviceArrivalTime -
                            s.simulation.serviceDepartureTime -
                            1)),
                0
            ) / length
        )
    },

    averageWaitingTimeQueue(departures, length) {
        return (
            departures.reduce(
                (acc, s) =>
                    (acc +=
                        s.simulation.serviceArrivalTime -
                        s.simulation.arrivalTime -
                        1),
                0
            ) / length
        )
    },

    averageWaitingTimeSeat(departures, length) {
        return (
            departures.reduce(
                (acc, s) =>
                    (acc +=
                        s.simulation.serviceArrivalTime -
                        s.simulation.serviceDepartureTime -
                        1),
                0
            ) / length
        )
    }
}
