'use strict'

import { makeDir, saveDataToJSON, saveDistributionsToFile } from '@utils/file'

export function saveReplicationToFile(path, distributions) {
    makeDir(path)
    saveDataToJSON(`${path}/distributions.json`, distributions)
    saveDistributionsToFile(path, distributions)
}
