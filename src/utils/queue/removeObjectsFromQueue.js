'use strict'

export function removeObjectsFromQueue(queue, objectsToRemove) {
    const objectsToRemoveLength = objectsToRemove.length
    for (let j = 0; j < objectsToRemoveLength; j++) {
        for (let i = 0; i < queue.length; i++) {
            if (objectsToRemove[j].id === queue[i].id) {
                queue.splice(i--, 1)
                break
            }
        }
    }
}
