const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// ນຳໃຊ້ bodyParser
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(require('./src/routes/routes'))

// path image static
app.use('/image', express.static('upload'))


app.listen(3000, function(){
    console.log("Server Runing Port:3000!")
});