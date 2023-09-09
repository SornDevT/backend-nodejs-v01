const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const corsOption = {
    origin: ['https://www.w3schools.com'],
    optionsSuccessStatus: 200
}

// ດຶງໂຕແປແບບ global ມານຳໃຊ້
require('./src/global/blacklist.global')

// ນຳໃຊ້ CORS
app.use(cors(corsOption))

// ນຳໃຊ້ bodyParser
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(require('./src/routes/routes'))

// path image static
app.use('/image', express.static('upload'))


app.listen(3000, function(){
    console.log("Server Runing Port:3000!")
});