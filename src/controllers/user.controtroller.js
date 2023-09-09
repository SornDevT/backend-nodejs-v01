
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')

exports.login = (req,res) => {
    User.login(req.body, (err,token)=>{
        if(err) return res.status(500).json({ success: false, message:err.message})
        if(token) return res.json({ success: true, message:'ເຂົ້າລະບົບສຳເລັດ!', token: token})
    })
}

exports.logout = (req, res) => {
    User.logout(req, (err, result)=>{
        if(err) return res.status(500).json({ success: false, message:err.message})
        res.json({ success: true, message:'ອອກລະບົບສຳເລັດ!'})
    })
}


exports.getAllUser = (req, res) => {
    User.findAll((err, result)=>{
        if(err) return res.status(500).json({ success: false, message:err.message})
        res.json({ success: false, message:'ສຳເລັດ!' , result})
    })
}

exports.GetUserById = (req, res) => {
    User.findById(req.params.id, (err,result)=>{
        if(err) return res.status(500).json({ success: false, message:err.message})
        if(result.length<=0) return res.status(404).json({ success: false, message:'ບໍ່ມີຂໍ້ມູນ!' })
        res.json({ success: true, User: result})
    })
}

exports.SearchUser = (req, res) => {
    User.search(req.query.name, (err, result)=>{
        if(err) return res.status(500).json({ success: false, message:err.message})
        res.json({ success: true, User: result})
    })
}

exports.RegisterUser = (req, res) =>{
    const newUser = new User(req.body)
    // ການເຂົ້າລະຫັດ password
    if(!newUser.password) return res.status(500).json({ success: false, message:'ກະລຸນາປ້ອນລະຫັດຜ່ານ!'})
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            // console.log(hash)
            newUser.password = hash
            // console.log(newUser)

            User.create(newUser, (err, result)=>{
                if(err) return res.status(500).json({ success: false, message:err.message})
                res.status(201).json({ success: true, message:'ບັນທຶກຂໍ້ມູນສຳເລັດ!', result})
            })

        })
    })
    // newUser.password = 55566666
    // console.log(newUser)
    
}

exports.UpdateUser = (req, res) =>{
    const newUser = new User(req.body)
    if(newUser.password){  /// ຖ້າມີການສົ່ງລະຫັດມາ ໃຫ້ທຳການເຂົ້າລະຫັດຄວາມປອດໄພ
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash)=>{
                newUser.password = hash

                User.update(req.params.id, new User(req.body), (err, result)=>{
                    if(err) return res.status(500).json({ success: false, message:err.message})
                    res.status(201).json({ success: true, message:'ອັບເດດສຳເລັດ', user: result })
                }) 
    
            })
        })

    } else { 
        User.update(req.params.id, new User(req.body), (err, result)=>{
            if(err) return res.status(500).json({ success: false, message:err.message})
            res.status(201).json({ success: true, message:'ອັບເດດສຳເລັດ', user: result })
        }) 
    }
    
}

exports.DeleteUser = (req, res) => {
    User.delete(req.params.id, (err, result)=>{
        if(err) return res.status(500).json({ success: false, message:err.message})
        res.status(201).json({ success: true, message:'ລຶບຂໍ້ມູນສຳເລັດ!', user: result })
    })
}