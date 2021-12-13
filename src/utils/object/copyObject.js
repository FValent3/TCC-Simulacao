'use strict'

export function copyObject(object) {
    return JSON.parse(JSON.stringify(object))
}
