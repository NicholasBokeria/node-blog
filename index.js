/*eslint-disable */
require('./server/config/config')

const mongoose = require('./server/db/mongoose') 
const { app } = require('./server/app')
/*eslint-enable */

app.listen(process.env.PORT, () => {
    console.log(`Server started ${process.env.PORT}`)
})