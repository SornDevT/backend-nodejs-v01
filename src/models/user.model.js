const dbConn = require('../config/db.config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class User{
    constructor(user){
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.email = user.email;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
  }

  User.login = (user, result) => {
    dbConn.query('SELECT * FROM users WHERE email =?', user.email, (err, res)=>{
        if(err) return result(err, null)
        if(res.length == 0) return result({message:'ອີເມວລ໌ນີ້ ບໍ່ມີໃນລະບົບ!'}, null)
        bcrypt.compare(user.password, res[0].password, (err, isMatch)=>{
            if(!isMatch) return result({message:'ລະຫັດຜ່ານບໍ່ຖຶກຕ້ອງ!'}, null)
            const token = jwt.sign({id:res[0].id},'mysecret-Key',{ expiresIn:'1h' })
            return result(null, token)
        })
    })
  }

  User.logout = (req, result) => {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token,'mysecret-Key', (err,decode)=>{
        if(err) return result(err, null)
        global.blacklist.push(token)
        result(null,decode)
    })
  }

  User.create = (newUser, result) => {
    // ຖ້າບໍ່ມີຕາຕະລາງ products ແມ່ນໃຫ້ທຳການສ້າງ ຕາຕະລາງໃໝ່
    dbConn.query('CREATE TABLE IF NOT EXISTS users(id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), email VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP , updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)'), (err, res) => {
        if(err) return result(err, null)
    }

    dbConn.query('INSERT INTO users SET ?', newUser, (err, res)=>{
        if(err) return result(err, null)
        return result(null, res.insertId)
    })
}

User.findAll = (result) => {
    dbConn.query('SELECT * FROM users', (err, res)=>{
        if(err) return result(err, null)
        return result(null, res)
    })
}

User.findById = (id, result) => {
    dbConn.query('SELECT * FROM users WHERE id = ?', id, (err, res)=>{
        if(err) return result(err, null)
        return result(null, res)
    })
}

User.search = (name, result)=>{
    // console.log(name)
    dbConn.query('SELECT * FROM users WHERE username LIKE "%'+ name +'%" ', (err, res)=>{
        if(err) return result(err, null)
        return result(null, res)
    })
}

User.update = (id, updateUser, result)=>{

    if(updateUser.password){
        dbConn.query('UPDATE users SET username=?, email=?, password=? WHERE id=?', [updateUser.username, updateUser.email, updateUser.password, id], (err, res) => 
            {
                if(err) return result(err, null)
                return result(null, res)
            })
    } else {
        dbConn.query('UPDATE users SET username=?, email=?, WHERE id=?', [updateUser.username, updateUser.email, id], (err, res) => 
        {
            if(err) return result(err, null)
            return result(null, res)
        })
    }

    
}

User.delete = (id, result) => {
    dbConn.query('DELETE FROM users WHERE id=?', [id], (err, res)=>{
        if(err) return result(err, null)
        return result(null, res)
    })
}

module.exports = User