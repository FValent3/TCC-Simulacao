'use strict'

export function buildHtml({ divId, data, layout }) {
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
