'use strict'

export function removeFromQueue(queue, toRemove) {
    const toRemoveLength = toRemove.length
    for (let j = 0; j < toRemoveLength; j++) {
        for (let i = 0; i < queue.length; i++) {
            if (toRemove[j].id === queue[i].id) {
                queue.splice(i--, 1)
                break
            }
        }
    }
}
