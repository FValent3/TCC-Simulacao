'use strict'

export function updatePipelineObjectToAvailable(pipe) {
    pipe.forEach(instance => {
        instance.statusPipeline = 'available'
    })
}
