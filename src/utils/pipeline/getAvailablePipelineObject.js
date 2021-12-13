'use strict'

export function getAvailablePipelineObject(pipe) {
    return pipe.filter(object => object.statusPipeline === 'available')
}
