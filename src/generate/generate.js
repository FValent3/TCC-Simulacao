'use strict'

import { generateGreedySimulationExperiment } from '@generate/experiments/greedySimulation'
import { generateSimulationExperiment } from '@generate/experiments/simulation.js'
import { generateResunInstance } from '@generate/instances/resun.js'
;(function generate() {
    generateInstances()
    generateExperiments()
})()

function generateInstances() {
    generateResunInstance()
}

function generateExperiments() {
    generateSimulationExperiment()
    generateGreedySimulationExperiment()
}
