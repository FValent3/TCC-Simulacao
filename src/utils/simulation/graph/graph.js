import { saveDataToFile } from '@utils/file'

export function graph(path, arr) {
    const xValues = arr.map(el => el.name)
    const yTotalSimulationTime = arr.map(el => el.totalSimulationTime)

    const data = [
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
    ]

    const layout = {
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

    const fileName = `totalSimulationTime.html`
    saveDataToFile(
        `${path}/${fileName}`,
        buildHtml('totalSimulationTime', data, layout)
    )

    const yValuesMeanWaitingTime = arr.map(el => el.meanWaitingTime)
    const data1 = [
        {
            x: xValues,
            y: yValuesMeanWaitingTime,
            type: 'bar',
            text: yValuesMeanWaitingTime.map(el => el.toFixed(2)),
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
    ]

    const layout1 = {
        title: 'Tempo Médio de Espera Total',
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

    const fileName1 = `meanWaitingTime.html`
    saveDataToFile(
        `${path}/${fileName1}`,
        buildHtml('meanWaitingTime', data1, layout1)
    )

    const yValuesMeanWaitingTimeInArrivalsQueue = arr.map(
        el => el.meanWaitingTimeInArrivalsQueue
    )
    const data2 = [
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
                color: 'rgb(158,202,225)',
                line: {
                    color: 'rgb(8,48,107)',
                    width: 1.5
                }
            }
        }
    ]
    const layout2 = {
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

    const fileName2 = `meanWaitingTimeInArrivalsQueue.html`
    saveDataToFile(
        `${path}/${fileName2}`,
        buildHtml('meanWaitingTimeInArrivalsQueue', data2, layout2)
    )

    const yValuesMeanWaitingTimeInSeatsQueue = arr.map(
        el => el.meanWaitingTimeInSeatsQueue
    )
    const data3 = [
        {
            x: xValues,
            y: yValuesMeanWaitingTimeInSeatsQueue,
            type: 'bar',
            text: yValuesMeanWaitingTimeInSeatsQueue.map(el => el.toFixed(2)),
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
    ]
    const layout3 = {
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

    const fileName3 = `meanWaitingTimeInSeatsQueue.html`
    saveDataToFile(
        `${path}/${fileName3}`,
        buildHtml('meanWaitingTimeInSeatsQueue', data3, layout3)
    )

    const yValuesMeanLengthOfArrivalsQueue = arr.map(
        el => el.meanLengthOfArrivalsQueue
    )
    const data4 = [
        {
            x: xValues,
            y: yValuesMeanLengthOfArrivalsQueue,
            type: 'bar',
            text: yValuesMeanLengthOfArrivalsQueue.map(el => el.toFixed(2)),
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
    ]
    const layout4 = {
        title: 'Tamanho Médio da Fila de Espera pelo Serviço',
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

    const fileName4 = `meanLengthOfArrivalsQueue.html`
    saveDataToFile(
        `${path}/${fileName4}`,
        buildHtml('meanLengthOfArrivalsQueue', data4, layout4)
    )

    const yValuesMeanLengthOfSeatsQueue = arr.map(
        el => el.meanLengthOfSeatsQueue
    )
    const data5 = [
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
    ]
    const layout5 = {
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

    const fileName5 = `meanLengthOfSeatsQueue.html`
    saveDataToFile(
        `${path}/${fileName5}`,
        buildHtml('meanLengthOfSeatsQueue', data5, layout5)
    )

    const yValuesMeanNumberOfUsedSeats = arr.map(el => el.meanNumberOfUsedSeats)
    const data6 = [
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
    ]
    const layout6 = {
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

    const fileName6 = `meanNumberOfUsedSeats.html`
    saveDataToFile(
        `${path}/${fileName6}`,
        buildHtml('meanNumberOfUsedSeats', data6, layout6)
    )
}

function buildHtml(divId, data, layout) {
    return `
    <!DOCTYPE html>
    <html>

        <head>
            <script src='https://cdn.plot.ly/plotly-latest.min.js'></script>
        </head>

        <body>
            <div id='${divId}'></div>
        </body>

        <script>
            Plotly.newPlot('${divId}', ${JSON.stringify(
        data
    )}, ${JSON.stringify(layout)});
        </script>

    </html>`
}
