'use strict'

export function meanNumberOfUsedSeats(xValues, yValues) {
    const yValuesMeanNumberOfUsedSeats = yValues.map(
        el => el.meanNumberOfUsedSeats
    )

    return {
        divId: 'meanNumberOfUsedSeats',
        data: [
            {
                x: xValues,
                y: yValuesMeanNumberOfUsedSeats,
                type: 'bar',
                text: yValuesMeanNumberOfUsedSeats.map(el => el.toFixed(2)),
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
            title: 'Número médio de mesas utilizadas pelo sistema',
            xaxis: {
                title: 'Experimentos',
                tickfont: {
                    size: 14,
                    color: 'rgb(107, 107, 107)'
                }
            },
            yaxis: {
                title: 'Quantidade (por unidade)',
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
