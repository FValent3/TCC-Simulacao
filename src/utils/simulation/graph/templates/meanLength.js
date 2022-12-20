'use strict'

export function meanLength(xValues, yValues) {
    const yValuesMeanLength = yValues.map(
        el => el.meanLengthOfArrivalsQueue + el.meanLengthOfSeatsQueue
    )

    const yMinValue = Math.min(...yValuesMeanLength)

    return {
        divId: 'meanLength',
        data: [
            {
                x: xValues,
                y: yValuesMeanLength,
                type: 'bar',
                text: yValuesMeanLength.map(el => el.toFixed(2)),
                textposition: 'auto',
                hoverinfo: 'none',
                marker: {
                    color: yValuesMeanLength.map(y => getColors(y, yMinValue)),
                    line: {
                        color: 'rgb(8,48,107)',
                        width: 1.5
                    }
                }
            }
        ],
        layout: {
            title: 'Tamanho Médio Total da Fila de Espera',
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

function getColors(value, min) {
    if (value === min) return 'rgb(220,20,60)'
    return 'rgb(158,202,225)'
}
