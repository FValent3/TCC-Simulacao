'use strict'

export function totalSimulationTime(xValues, yValues) {
    const yTotalSimulationTime = yValues.map(el => el.totalSimulationTime)
    return {
        divIdName: 'totalSimulationTime',
        data: [
            {
                x: xValues,
                y: yTotalSimulationTime,
                type: 'bar',
                text: yTotalSimulationTime.map(el => el.toFixed(2)),
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
            title: 'Tempo Médio de Simulação',
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
