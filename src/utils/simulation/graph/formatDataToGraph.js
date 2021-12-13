'use strict'

import { decimalPlaceFix } from '@libs/statistics'

export function formatDatatoGraph(data, properties) {
    return data.map(el => {
        const nameFix = el.name.split('_').pop()
        el.name = nameFix
        for (let i = 0; i < properties.length; i++) {
            el[properties[i]] = decimalPlaceFix(el[properties[i]], 2)
        }
        return el
    })
}
