
const User = require('../models/user.model')

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
    User.create(newUser, (err, result)=>{
        if(err) return res.status(500).json({ success: false, message:err.message})
        res.status(201).json({ success: true, message:'ບັນທຶກຂໍ້ມູນສຳເລັດ!', result})
    })
}

exports.UpdateUser = (req, res) =>{
    User.update(req.params.id, new User(req.body), (err, result)=>{
        if(err) return res.status(500).json({ success: false, message:err.message})
        res.status(201).json({ success: true, message:'ອັບເດດສຳເລັດ', user: result })
    }) 
}

exports.DeleteUser = (req, res) => {
    User.delete(req.params.id, (err, result)=>{
        if(err) return res.status(500).json({ success: false, message:err.message})
        res.status(201).json({ success: true, message:'ລຶບຂໍ້ມູນສຳເລັດ!', user: result })
    })
}