

class Product{
    constructor(id, name, price){
        this.id = id;
        this.name = name;
        this.price = price;
    }
  }
  
  // ສ້າງຂໍ້ມູນ array ສິນຄ້າ
  
  let products = [
    new Product(1, 'Macbook Pro 2017', 3000000),
    new Product(2, 'Macbook Pro 2018', 4000000),
    new Product(3, 'Macbook Pro 2019', 5000000),
    new Product(4, 'Macbook Pro 2020', 6000000),
    new Product(5, 'Macbook Pro 2021', 7000000),
    new Product(6, 'Macbook Pro 2022', 8000000),
  ]

exports.getProducts = (req,res) => {
    res.json({ success: true, message:'ສຳເລັດ!' , products})
}

exports.getProductById = (req,res) => {
    const result = products.find((item)=> item.id == req.params.id)
    if(result) return res.json({ success: true, message:'ສຳເລັດ!' , result})
    res.status(404).json({ success: false, message:'ບໍ່ມີຂໍ້ມູນ!' })
}

exports.SearchProduct = (req,res) => {
    // console.log('testttttttttt')
    const result = products.find((item)=> item.name == req.query.name)
    if(result) return res.json({ success: true, message:'ສຳເລັດ!' , result})
    res.status(404).json({ success: false, message:'ຄົ້ນຫາຂໍ້ມູນບໍ່ເຫັນ!' })
}

exports.addProduct = (req,res) => {
    let id = products.length +1
    let { name, price }= req.body
    if(name && price){
      let product = new Product(id, name, price)
      // ເພີ່ມ product ເຂົ້າໄປໃນລາຍການສິນຄ້າ products
      products.push(product)
      res.status(201).json({ success: true, message:'ບັນທຶກຂໍ້ມູນສຳເລັດ!' })
    } else {
      res.status(404).json({ success: false, message:'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ!' })
    }
}

exports.updateProduct = (req, res) => {
    let index = products.findIndex((item)=> item.id == req.params.id)
    const { name, price } = req.body
    if(!name && !price) return res.status(404).json({ success: false, message:'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ!' })
    if(index >=0){
      // ແບບຍໍ້
      name?products[index].name = name:null
      price?products[index].price = price:null
      
      res.json({ success: true, message:'ອັບເດດຂໍ້ມູນສຳເລັດ!' })
    } else {
      res.status(404).json({ success: false, message:'ບໍ່ມີຂໍ້ມູນທີ່ທ່ານຕ້ອງການອັບເດດ!' })
    }
}

exports.deleteProduct = (req, res) => {
    let index = products.findIndex((item)=> item.id == req.params.id)
    if(index >=0){
      // ລຶບຂໍ້ມູນຕາມ index
      products.splice(index,1)
      res.json({ success: true, message:'ລຶບຂໍ້ມູນສຳເລັດ!' })
    } else {
        res.status(404).json({ success: false, message:'ບໍ່ມີຂໍ້ມູນ!' })
    }
}

