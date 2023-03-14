require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./routes/index')
const db = require('./config/db')
const errorMiddleware = require("./middlewares/errorMiddleware")
const {Group} = require("./models/models")
const swaggerDocs = require('./utils/swagger')

const port = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/', router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await db.authenticate()
        await db.sync()
        await Group.findOrCreate({where: {name: 'Not sorted'}})
        app.listen(port, () => {
            console.log(`Api is running on port ${port}`)
            swaggerDocs(app)
        })
    } catch (e) {
        console.log(e)
    }
}

start()