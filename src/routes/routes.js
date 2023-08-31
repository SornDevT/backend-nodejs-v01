const router = require('express').Router()

router.use('/products', require('./product.route'))

module.exports = router