'use strict'

import { greedySortQueue } from '@algorithms'
import { processArrivals } from '@queueSystem/arrivals'
import {
    processSeatsArrivals,
    processSeatsDepartures
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

export const greedySimulation = Object.assign(heritage, {
    start(dataset, distributions, algorithmConfig) {
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
            simulationData.populationSize,
            algorithmConfig.swapFactor
        )

        this.fixCalculationOfTimeIntervals(
            population,
            simulationData.numberOfServers
        )

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

            greedySortQueue(
                arrivals,
                intervalBetweenRounds,
                seats.length,
                simulationData.numberOfSeats,
                algorithmConfig.rounds,
                algorithmConfig.swapFactor,
                maxPenalitiesPerPerson,
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
                seatPriority: seatsNormalizedTime[id],
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
