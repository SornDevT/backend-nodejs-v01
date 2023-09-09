const router = require('express').Router()
const UserController = require('../controllers/user.controtroller')
const auth = require('../middlewares/auth.middleware')

router.use('/products', require('./product.route'))
router.use('/users', require('./user.route'))

router.post('/login', UserController.login)
router.get('/logout',auth, UserController.logout)

module.exports = router