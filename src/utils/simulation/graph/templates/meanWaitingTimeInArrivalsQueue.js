'use strict'

export function meanWaitingTimeInArrivalsQueue(xValues, yValues) {
    const yValuesMeanWaitingTimeInArrivalsQueue = yValues.map(
        el => el.meanWaitingTimeInArrivalsQueue
    )
    const yMinValue = Math.min(...yValuesMeanWaitingTimeInArrivalsQueue)

    return {
        divId: 'meanWaitingTimeInArrivalsQueue',
        data: [
            {
                x: xValues,
                y: yValuesMeanWaitingTimeInArrivalsQueue,
                type: 'bar',
                text: yValuesMeanWaitingTimeInArrivalsQueue.map(el =>
                    el.toFixed(2)
                ),
                textposition: 'auto',
                hoverinfo: 'none',
                marker: {
                    color: yValuesMeanWaitingTimeInArrivalsQueue.map(y =>
                        getColors(y, yMinValue)
                    ),
                    line: {
                        color: 'rgb(8,48,107)',
                        width: 1.5
                    }
                }
            }
        ],
        layout: {
            title: 'Tempo Médio de Espera (Fila de espera do serviço)',
            xaxis: {
                title: 'Experimentos',
                tickfont: {
                    size: 14,
                    color: 'rgb(107, 107, 107)'
                }
            },
            yaxis: {
                title: 'Tempo (segundos)',
                titlefont: {
                    size: 16,
                    color: 'rgb(107, 107, 107)'
                },
                tickfont: {
                    size: 14,
                    color: 'rgb(107, 107, 107)'
                }
            }
        }
    }
}

function getColors(value, min) {
    if (value === min) return 'rgb(220,20,60)'
    return 'rgb(158,202,225)'
}
