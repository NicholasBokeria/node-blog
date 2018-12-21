/*eslint-disable */
const { app } = require('./app')
const db = require('./db') 
const { PORT } = require('./config')
/*eslint-enable */

app.listen(PORT, () => {
    console.log(`Server started ${PORT}`)
})