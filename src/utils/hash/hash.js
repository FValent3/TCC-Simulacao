'use strict'

// implement a export function that returns a hash of the given string
// the hash function is a simple hash function that returns a number
// between 0 and the given max
// the hash function is not cryptographically secure
// the hash function is not reversible

function hash(str, max) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        hash += str.charCodeAt(i)
    }
    return hash % max
}
