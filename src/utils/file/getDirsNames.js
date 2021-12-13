'use strict'

import fs from 'fs'

export function getDirsNames(path) {
    return fs
        .readdirSync(path, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
}
