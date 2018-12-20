const { app } = require('./app')
const db = require('./db')
const { PORT } = require('./config')


app.listen(PORT, () => {
    console.log(`Server started ${PORT}`)
})