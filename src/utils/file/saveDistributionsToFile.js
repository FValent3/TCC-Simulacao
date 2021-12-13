import { saveDataToFile } from './saveDataToFile'

export function saveDistributionsToFile(path, distributions) {
    for (const distribution of Object.entries(distributions)) {
        const [name, distributionData] = distribution
        const data = [
            {
                x: distributionData,
                type: 'histogram'
            }
        ]
        const layout = {
            title: 'Distribution Graph'
        }

        const fileName = `${path}/${name}.html`
        saveDataToFile(fileName, buildHtml(name, data, layout))
    }
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
