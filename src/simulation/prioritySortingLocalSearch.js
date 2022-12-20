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
import { makeDir, readFile, saveDataToJSON } from '@utils/file'

import { greedySimulation } from './greedySimulation.js'

const PATH_DATASET = 'data/datasets'
const ARQUIVO_CONFIGURACAO = 'algorithmConfig.json'

const { salvarDadosSimulacao, ...heritage } = greedySimulation

export const prioritySortingLocalSearch = Object.assign(heritage, {
    start(dataset, distributions, algorithmConfig) {
        let currentSimulationTime = 0
        let arrivals = []
        let servers = []
        let waitingSeats = []
        let departures = []

        const { simulationData } = dataset

        const population = this.generatePopulation(
            distributions,
            simulationData.populationSize,
            algorithmConfig.swapFactor
        )

        const numberOfSeats = simulationData.numberOfSeats
        let seats = new Array(numberOfSeats).fill(null)

        this.fixCalculationOfTimeIntervals(
            population,
            simulationData.numberOfServers
        )

        const dataPerRounds = {
            arrivalsLength: [],
            waitingSeatsLength: [],
            numbersOfUsedSeats: []
        }

        const intervalBetweenRounds = Math.round(
            simulationData.maxSimulationTime / (algorithmConfig.rounds + 1)
        )
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

            if (
                this.isNewRound(
                    currentSimulationTime,
                    intervalBetweenRounds,
                    algorithmConfig.rounds
                )
            ) {
                const priority = this.determinePriority(
                    this.getNumberOfOccupiedSpaces(seats),
                    simulationData.numberOfSeats,
                    algorithmConfig.swapFactor
                )

                greedySortQueue(arrivals, priority, maxPenalitiesPerPerson)
                localSearch(arrivals, seats, intervalBetweenRounds)
            }

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

    getNumberOfOccupiedSpaces(arr) {
        let count = 0
        const arrLength = arr.length
        for (let i = 0; i < arrLength; i++) {
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
        makeDir(path)

        departures = departures.map(instance => {
            const { ...departures } = instance
            return departures
        })

        saveDataToJSON(`${path}/departures.json`, departures)

        const meanWaitingTimeInArrivalsQueue = this.averageWaitingTimeQueue(
            departures,
            simulationData.populationSize - notProcessed
        )
        const meanWaitingTimeInSeatsQueue = this.averageWaitingTimeSeat(
            departures,
            simulationData.populationSize - notProcessed
        )

        saveDataToJSON(`${path}/results.json`, {
            totalSimulationTime: currentSimulationTime,
            meanWaitingTime:
                meanWaitingTimeInArrivalsQueue + meanWaitingTimeInSeatsQueue,
            meanWaitingTimeInArrivalsQueue: meanWaitingTimeInArrivalsQueue,
            meanWaitingTimeInSeatsQueue: meanWaitingTimeInSeatsQueue,
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
            penaltiesApplied: this.getPenaltiesApplied(departures)
        })
    }
})
