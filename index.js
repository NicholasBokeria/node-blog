/*eslint-disable */
const { app } = require('./app')
const database = require('./database') 
const { PORT } = require('./config')
/*eslint-enable */

app.listen(PORT, () => {
    console.log(`Server started ${PORT}`)
})