const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello ສະບາຍດີ')
})

// get ພ້ອມສົ່ງຂໍ້ມູນແບບ param--------------------
app.get('/say/:name',(req,res)=>{
  res.send(`hello: ${req.params.name}`)
})

app.get('/say/:name/:age',(req,res)=>{
  res.send(`hello: ${req.params.name}, age:${req.params.age}`)
})

// get ພ້ອມສົ່ງຂໍ້ມູນແບບ query string-------------

app.get('/search', (req,res)=>{
  res.send(`MackBook Pro: ${req.query.name}, year:${req.query.year}`);
});




// app.get('/say', function(req,res){
//     res.send('Mr Sone!')
// })

app.listen(3000, function(){
    console.log("Server Runing Port:3000!")
});