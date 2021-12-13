'use strict'

import fs from 'fs'

export function readFile(pathFile, enconding = 'utf8') {
    return fs.readFileSync(pathFile, enconding)
}
