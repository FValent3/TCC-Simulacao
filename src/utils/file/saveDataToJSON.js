'use strict'

import fs from 'fs'

export function saveDataToJSON(path, data) {
    fs.appendFileSync(path, beautify(data))
}

function beautify(data) {
    return `${JSON.stringify(data, null, 2)}\n`
}
