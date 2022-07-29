import mongoose from "mongoose"
import config from "config"
import logger from "./logger"

async function connect() {
    const dbUri = config.get<string>("dbUri");

    // using promise
    /* return mongoose.connect(dbUri)
        .then(() => {
                console.info('Database Connected')
        }).catch((error) => {
            console.error("Could mot connect to DB");
            process.exit(1)
        }) */
    
    // using async await
    
    try {
        await mongoose.connect(dbUri, { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        
        logger.info("DB connected")
    } catch (error) {
        logger.error("Could not connect to db");
        process.exit(1)
    }
}

export default connect;