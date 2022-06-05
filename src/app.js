const config = require('./config')
const express = require('express')
const cors = require('express')
const helmet = require('helmet')
const notFound = require('./middleware/notFound')
const handleError = require('./middleware/handleError')
const createAdmin = require('./services/createAdmin')

const app = express()
createAdmin(config)

app.set('port', config.PORT)

app.use(cors())
app.use(helmet())
app.use(express.json())

app.use('/api/admin',require('./routes/admin'))
app.use('/api/users',require('./routes/users'))

app.use(notFound)
app.use(handleError)

module.exports = app