const router = require('express').Router()

const ProductController = require('../controllers/product.controller')
const auth = require('../middlewares/auth.middleware')
  
  // ດຶງຂໍ້ມູນມາສະແດງທັງໝົດ
  router.get('/', auth, ProductController.getProducts)
  
  // ດຶງຂໍ້ມູນຕາມ id ໃຊ້ຮູບແບບ get pasrams
  router.get('/get/:id', auth, ProductController.getProductById)
  
  // ຄົ້ນຫາຂໍ້ມູນຈາກຊື່ໂດຍໃຊ້ get query string
  router.get('/search', auth, ProductController.SearchProduct)
  
  // post ເພີ່ມຂໍ້ມູນສິນຄ້າ --------------------------
  router.post('/', auth, ProductController.addProduct)

  
  router.put('/:id', auth, ProductController.updateProduct)
  

  // delete product by id
  
  router.delete('/:id', auth, ProductController.deleteProduct)

  
module.exports = router