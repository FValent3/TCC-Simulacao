'use strict'

import { saveDataToJSON } from '@utils/file'

export function saveSeeds(path, seeds) {
    saveDataToJSON(path, seeds)
}
