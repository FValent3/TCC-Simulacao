'use strict'

import fs from 'fs'

export function makeDir(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true })
    }
}
