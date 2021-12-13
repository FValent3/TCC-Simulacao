'use strict'

import {
    simulation,
    greedySimulation,
    prioritySortingLocalSearch
} from '@simulation'

export function handler(algorithmName) {
    if (algorithmName === 'simulation') return simulation
    else if (algorithmName === 'greedy') return greedySimulation
    else if (algorithmName === 'prioritySortingLocalSearch')
        return prioritySortingLocalSearch
}
