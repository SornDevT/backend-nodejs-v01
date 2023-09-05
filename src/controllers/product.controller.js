const multer = require("multer")
const multerConfig = require('../config/multer.config')
const upload = multer(multerConfig.config).single(multerConfig.keyUpload)
const fs = require('fs')
const path = require('path')

// ນຳໃຊ້ Model Product
const Product = require('../models/product.model')

  
  // ສ້າງຂໍ້ມູນ array ສິນຄ້າ
  


exports.getProducts = (req,res) => {
    Product.findAll((err, product)=>{
      if(err) return res.status(500).json({ success: false, message:err.message})
      res.json({ success: false, message:'ສຳເລັດ!' , product})
    })
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

    upload(req, res, (err) => {
      // console.log(err)
      if(err) return res.status(400).json({ success: false, message:err.message })

      
      // req.file?req.body.image = req.file.filename:req.body.image=null
      // req.body.id = products.length +1
      // const newProduct = new Product(req.body.id, req.body.image, req.body.name, req.body.price)
      // console.log(newProduct)

      if(req.file) req.body.image = req.file.filename

      if(req.body.constructor === Object && Object.keys(req.body).length === 0) 
      return res.status(400).json({ success: false, message:'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ!'})
      // products.push(newProduct)
      const newProduct = new Product(req.body)
      // add product
      Product.create(newProduct, (err, product)=>{
        if(err) return res.status(500).json({ success: false, message:err.message})
        res.status(201).json({ success: true, message:'ບັນທຶກຂໍ້ມູນສຳເລັດ!', product})
      })
      

    })

    // let id = products.length +1
    // let { name, price }= req.body
    // if(name && price){
    //   let product = new Product(id, name, price)
    //   // ເພີ່ມ product ເຂົ້າໄປໃນລາຍການສິນຄ້າ products
    //   products.push(product)
    //   res.status(201).json({ success: true, message:'ບັນທຶກຂໍ້ມູນສຳເລັດ!' })
    // } else {
    //   res.status(404).json({ success: false, message:'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ!' })
    // }
}

exports.updateProduct = (req, res) => {

    upload(req, res, (err)=>{
      
      if(err) return res.status(400).json({ success: false, message:err.message })
      
      let index = products.findIndex((item)=> item.id == req.params.id)

      // ກວດຊອບຖ້າມີໄຟລ໌ໃໝ່ສົ່ງມາ ໃຫ້ລຶບໄຟລ໌ເກົ່າອອກ
      if(req.file){
        if(products[index].image){
          const filePath = path.join(__dirname,`../../upload/${products[index].image}`)
          fs.unlinkSync(filePath)
        }
      }

      if(req.body.constructor === Object && Object.keys(req.body).length === 0) 
      return res.status(400).json({ success: false, message:'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ!'})
   
      if(index >= 0){
        const { name, price } = req.body
        if(req.file) products[index].image = req.file.filename
        name?products[index].name = name:null
        price?products[index].price = price:null
        res.json({ success: true, message:'ອັບເດດຂໍ້ມູນສຳເລັດ!' })
      } else {
        res.status(404).json({ success: false, message:'ບໍ່ມີຂໍ້ມູນທີ່ທ່ານຕ້ອງການອັບເດດ!' })
      }


    })

    // let index = products.findIndex((item)=> item.id == req.params.id)
    // const { name, price } = req.body
    // if(!name && !price) return res.status(404).json({ success: false, message:'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ!' })
    // if(index >=0){
    //   // ແບບຍໍ້
    //   name?products[index].name = name:null
    //   price?products[index].price = price:null
      
    //   res.json({ success: true, message:'ອັບເດດຂໍ້ມູນສຳເລັດ!' })
    // } else {
    //   res.status(404).json({ success: false, message:'ບໍ່ມີຂໍ້ມູນທີ່ທ່ານຕ້ອງການອັບເດດ!' })
    // }
}

exports.deleteProduct = (req, res) => {
    let index = products.findIndex((item)=> item.id == req.params.id)

    if(index >=0){
      // ລຶບຂໍ້ມູນຕາມ index
      if(products[index].image){
        const filePath = path.join(__dirname,`../../upload/${products[index].image}`)
        fs.unlinkSync(filePath)
      }
      products.splice(index,1)
      res.json({ success: true, message:'ລຶບຂໍ້ມູນສຳເລັດ!' })
    } else {
        res.status(404).json({ success: false, message:'ບໍ່ມີຂໍ້ມູນ!' })
    }
}

