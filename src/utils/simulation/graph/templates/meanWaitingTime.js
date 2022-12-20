'use strict'

export function meanWaitingTime(xValues, yValues) {
    const yValuesMeanWaitingTime = yValues.map(el => el.meanWaitingTime)
    const yMinValue = Math.min(...yValuesMeanWaitingTime)

    return {
        divId: 'meanWaitingTime',
        data: [
            {
                x: xValues,
                y: yValuesMeanWaitingTime.map(el => el.toFixed(2)),
                type: 'bar',
                text: yValuesMeanWaitingTime,
                textposition: 'auto',
                hoverinfo: 'none',
                marker: {
                    color: yValuesMeanWaitingTime.map(y =>
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
            title: 'Tempo Médio de Espera Total',
            width: 800,
            height: 600,
            xaxis: {
                title: 'Experimentos',
                tickfont: {
                    size: 14,
                    color: 'rgb(107, 107, 107)'
                },
                showlegend: true
            },
            yaxis: {
                title: 'Tempo (segundos)',
                // tickmode: 'array',
                // tickvals: [2400, 2500, 2600, 2700, 2800, 2900, 3000],
                // ticktext: ['', '2500', '2600', '2700', '2800', '2900', '3000'],
                // range: [2400, 3000],
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
    // if (value === min) return 'rgb(220,20,60)'
    return 'rgb(158,202,225)'
}
