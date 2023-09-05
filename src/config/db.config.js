const mysql = require('mysql')

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'testnodejsv1'
})

db.connect((err)=>{
    if(err){ console.log(err.sqlMessage)}
    else {
       console.log('Connect database success!') 
    }
    
})

module.exports = db