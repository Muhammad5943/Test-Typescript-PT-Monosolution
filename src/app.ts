import express, { Request, Response } from "express"
import config from "config"
import responseTime from "response-time"
import connect from './utils/connect'
import logger from './utils/logger'
import routes from "./routes"
import { restResponseTimeHistogram, startMetricsServer } from "./utils/metrics"

const PORT = config.get<number>('port')
const app = express()

app.use(express.json())

app.use(
    responseTime((req: Request, res: Response, time: number) => {
        if (req?.route?.path) {
            restResponseTimeHistogram.observe(
                {
                    method: req.method,
                    route: req.route.path,
                    status_code: res.statusCode,
                },
                time * 1000
            )
        }
    })
)

app.listen(PORT, async () => {
    logger.info(`Server running on server http://localhost:${PORT}`)

    await connect()
    routes(app)
    startMetricsServer()
})