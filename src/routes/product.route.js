const router = require('express').Router()

const ProductController = require('../controllers/product.controller')
  
  
  // ດຶງຂໍ້ມູນມາສະແດງທັງໝົດ
  router.get('/', ProductController.getProducts)
  
  // ດຶງຂໍ້ມູນຕາມ id ໃຊ້ຮູບແບບ get pasrams
  router.get('/get/:id', ProductController.getProductById)
  
  // ຄົ້ນຫາຂໍ້ມູນຈາກຊື່ໂດຍໃຊ້ get query string
  router.get('/search', ProductController.SearchProduct)
  
  // post ເພີ່ມຂໍ້ມູນສິນຄ້າ --------------------------
  router.post('/', ProductController.addProduct)

  
  router.put('/:id', ProductController.updateProduct)
  

  // delete product by id
  
  router.delete('/:id', ProductController.deleteProduct)

  
module.exports = router