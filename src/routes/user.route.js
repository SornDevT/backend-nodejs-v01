const router = require('express').Router()

const UserController = require('../controllers/user.controtroller')
const auth = require('../middlewares/auth.middleware')

  // ດຶງຂໍ້ມູນມາສະແດງທັງໝົດ
  router.get('/', auth, UserController.getAllUser)
  
  // ດຶງຂໍ້ມູນຕາມ id ໃຊ້ຮູບແບບ get pasrams
  router.get('/get/:id', auth, UserController.GetUserById)
  
  // ຄົ້ນຫາຂໍ້ມູນຈາກຊື່ໂດຍໃຊ້ get query string
  router.get('/search', auth, UserController.SearchUser)
  
  // post ເພີ່ມຂໍ້ມູນສິນຄ້າ --------------------------
  router.post('/', auth,  UserController.RegisterUser)

  
  router.put('/:id', auth, UserController.UpdateUser)
  

  // delete product by id
  
  router.delete('/:id', auth, UserController.DeleteUser)

  
module.exports = router