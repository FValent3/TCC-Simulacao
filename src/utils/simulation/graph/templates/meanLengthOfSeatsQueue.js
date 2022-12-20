'use strict'

export function meanLengthOfSeatsQueue(xValues, yValues) {
    const yValuesMeanLengthOfSeatsQueue = yValues.map(
        el => el.meanLengthOfSeatsQueue
    )

    return {
        divId: 'meanLengthOfSeatsQueue',
        data: [
            {
                x: xValues,
                y: yValuesMeanLengthOfSeatsQueue,
                type: 'bar',
                text: yValuesMeanLengthOfSeatsQueue.map(el => el.toFixed(2)),
                textposition: 'auto',
                hoverinfo: 'none',
                marker: {
                    color: 'rgb(158,202,225)',
                    line: {
                        color: 'rgb(8,48,107)',
                        width: 1.5
                    }
                }
            }
        ],
        layout: {
            title: 'Tamanho Médio da Fila de Espera pelas Mesas',
            xaxis: {
                title: 'Experimentos',
                tickfont: {
                    size: 14,
                    color: 'rgb(107, 107, 107)'
                }
            },
            yaxis: {
                title: 'Tamanho (por unidade)',
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
