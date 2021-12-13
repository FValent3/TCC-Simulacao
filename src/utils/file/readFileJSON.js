'use strict'

import { readFile } from '.'

export function readFileJSON(pathFile, enconding = 'utf8') {
    return JSON.parse(readFile(pathFile, enconding))
}
