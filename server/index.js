require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models.js')
const cors = require('cors')
const fileUpload = require('express-fileUpload')
const routes = require('./routes/index.js')
const errorHandler = require('./midlleware/ErrorHandlingMiddleware.js')
const path = require('path')


const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api',routes)

app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ alter: true })
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()
