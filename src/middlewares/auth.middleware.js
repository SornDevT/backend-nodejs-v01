const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token) return res.status(401).json({message:'Auth failed'})
        const decode = jwt.verify(token, 'mysecret-Key')
        req.userData = decode

        console.log(global.blacklist)
        if(global.blacklist.includes(token)) return res.status(401).json({message:'Auth failed'})
        next()

    } catch(err){
        return res.status(401).json({message:'token expire or Unauthorized'})
    }

}