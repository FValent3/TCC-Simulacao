'use strict'

import fs from 'fs'

export function saveDataToFile(path, data) {
    fs.appendFileSync(path, data)
}
