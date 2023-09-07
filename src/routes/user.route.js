const router = require('express').Router()

const UserController = require('../controllers/user.controtroller')

  // ດຶງຂໍ້ມູນມາສະແດງທັງໝົດ
  router.get('/', UserController.getAllUser)
  
  // ດຶງຂໍ້ມູນຕາມ id ໃຊ້ຮູບແບບ get pasrams
  router.get('/get/:id', UserController.GetUserById)
  
  // ຄົ້ນຫາຂໍ້ມູນຈາກຊື່ໂດຍໃຊ້ get query string
  router.get('/search', UserController.SearchUser)
  
  // post ເພີ່ມຂໍ້ມູນສິນຄ້າ --------------------------
  router.post('/', UserController.RegisterUser)

  
  router.put('/:id', UserController.UpdateUser)
  

  // delete product by id
  
  router.delete('/:id', UserController.DeleteUser)

  
module.exports = router