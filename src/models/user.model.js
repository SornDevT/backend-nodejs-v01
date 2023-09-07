const dbConn = require('../config/db.config')

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