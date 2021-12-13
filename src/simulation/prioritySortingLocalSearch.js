'use strict'

import { greedySortQueue, localSearch } from '@algorithms'
import { processArrivals } from '@queueSystem/arrivals'
import {
    processSeatsArrivalsMeta,
    processSeatsDeparturesMeta
} from '@queueSystem/seats'
import {
    processServiceDepartures,
    processServicesArrivals
} from '@queueSystem/services'
import { cumulativeSums, normalization } from '@utils/data'
import { makeDir, readFile, saveDataToJSON } from '@utils/file'

import { simulation } from './simulation.js'

const PATH_DATASET = 'data/datasets'
const ARQUIVO_CONFIGURACAO = 'algorithmConfig.json'

const { salvarDadosSimulacao, ...heritage } = simulation

export const prioritySortingLocalSearch = Object.assign(heritage, {
    start(dataset, distributions, algorithmConfig) {
        let currentSimulationTime = 0
        let arrivals = []
        let servers = []
        let waitingSeats = []
        let departures = []
        let state = ''

        const { simulationData } = dataset

        const population = this.generatePopulation(
            distributions,
            simulationData.populationSize,
            algorithmConfig.swapFactor
        )

        const numberOfSeats = simulationData.numberOfSeats
        let seats = new Array(numberOfSeats)

        this.fixCalculationOfTimeIntervals(
            population,
            simulationData.numberOfServers
        )

        const dataPerRounds = {
            arrivalsLength: [],
            waitingSeatsLength: [],
            numbersOfUsedSeats: []
        }

        const intervalBetweenRounds =
            simulationData.maxSimulationTime / algorithmConfig.rounds - 1
        const maxPenalitiesPerPerson = 1
        while (
            currentSimulationTime < simulationData.maxSimulationTime &&
            departures.length < simulationData.populationSize
        ) {
            arrivals = processArrivals(
                population,
                arrivals,
                currentSimulationTime
            )

            state = greedySortQueue(
                arrivals,
                intervalBetweenRounds,
                seats.length,
                simulationData.numberOfSeats,
                algorithmConfig.rounds,
                algorithmConfig.swapFactor,
                maxPenalitiesPerPerson,
                currentSimulationTime
            )

            localSearch(arrivals, seats, intervalBetweenRounds, state)

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

            seats = processSeatsArrivalsMeta(
                waitingSeats,
                seats,
                simulationData.numberOfSeats,
                currentSimulationTime
            )

            departures = processSeatsDeparturesMeta(
                seats,
                departures,
                currentSimulationTime
            )

            dataPerRounds.numbersOfUsedSeats.push(
                this.getNumberOfOccupiedSpaces(seats)
            )
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

            seats = processSeatsArrivalsMeta(
                waitingSeats,
                seats,
                simulationData.numberOfSeats,
                currentSimulationTime
            )

            departures = processSeatsDeparturesMeta(
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

    getConfig(datasetsName, parentDatasetName) {
        const PATH_CONFIGURACAO = `${PATH_DATASET}/${parentDatasetName}/${datasetsName}/${ARQUIVO_CONFIGURACAO}`
        return JSON.parse(readFile(PATH_CONFIGURACAO, 'utf8'))
    },

    generatePopulation(distributions = [], populationSize = 1) {
        const cumulativeSumsTime = cumulativeSums(...distributions.arrivals)
        const cumulativeSumsNormalizedTime = normalization(
            distributions.service
        )
        const seatsNormalizedTime = normalization(distributions.seats)
        const population = [...Array(populationSize)].map((_, id) => {
            return {
                id: id,
                statusPipeline: 'available',
                penalties: 0,
                queuePriority: cumulativeSumsNormalizedTime[id],
                restaurantTablePriority: seatsNormalizedTime[id],
                instanceSimulationData: {
                    cumulativeSumTime: cumulativeSumsTime[id],
                    serviceTime: distributions.service[id],
                    seatTime: distributions.seats[id]
                },
                simulation: {}
            }
        })

        return population
    },

    getPenaltiesApplied(departures) {
        return departures.reduce(
            (previous, current) => (previous += current.penalties),
            0
        )
    },

    getNumberOfOccupiedSpaces(arr) {
        let count = 0
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === null || arr[i] === undefined) continue
            count++
        }
        return count
    },

    isQueueSystemEmpty(servers, waitingSeats, seats) {
        return (
            servers.length +
                waitingSeats.length +
                this.getNumberOfOccupiedSpaces(seats) ===
            0
        )
    },

    saveSimulationDataToFile(
        simulationData,
        departures,
        currentSimulationTime,
        dataPerRounds,
        notProcessed,
        path
    ) {
        departures = departures.map(instance => {
            const { ...departures } = instance
            return departures
        })
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
            ),
            PenaltiesApplied: this.getPenaltiesApplied(departures)
        })
    }
})
