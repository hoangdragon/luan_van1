const express = require('express')
const db = require('./models')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

const categoryRouter = require('./routes/Category')
app.use('/api/category', categoryRouter)

const postSoftRouter = require('./routes/PostSoft')
app.use('/api/postsoft', postSoftRouter)

const accountProfileRouter = require('./routes/AccountProfile')
app.use('/api/account', accountProfileRouter)
app.use('/uploads/accountProfile', express.static('uploads'))

const accountRouter = require('./routes/Account')
app.use('/api/auth', accountRouter)
app.use('/uploads', express.static('uploads'))

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('server start luanvan')
    })
})
