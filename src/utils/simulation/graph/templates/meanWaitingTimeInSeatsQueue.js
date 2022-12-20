'use strict'

export function meanWaitingTimeInSeatsQueue(xValues, yValues) {
    const yValuesMeanWaitingTimeInSeatsQueue = yValues.map(
        el => el.meanWaitingTimeInSeatsQueue
    )
    const yMinValue = Math.min(...yValuesMeanWaitingTimeInSeatsQueue)

    return {
        divIdName: 'meanWaitingTimeInSeatsQueue',
        data: [
            {
                x: xValues,
                y: yValuesMeanWaitingTimeInSeatsQueue,
                type: 'bar',
                text: yValuesMeanWaitingTimeInSeatsQueue.map(el =>
                    el.toFixed(2)
                ),
                textposition: 'auto',
                hoverinfo: 'none',
                marker: {
                    color: yValuesMeanWaitingTimeInSeatsQueue.map(y =>
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
            title: 'Tempo Médio de Espera (Fila de espera pelos assentos)',
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
