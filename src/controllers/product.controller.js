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
    Product.findById(req.params.id, (err, product)=>{
      if(err) return res.status(500).json({ success: false, message:err.message})
      if(product.length<=0) return res.status(404).json({ success: false, message:'ບໍ່ມີຂໍ້ມູນ!' })
      res.json({ success: true, product: product})

    })
    // const result = products.find((item)=> item.id == req.params.id)
    // if(result) return res.json({ success: true, message:'ສຳເລັດ!' , result})
    // res.status(404).json({ success: false, message:'ບໍ່ມີຂໍ້ມູນ!' })
}

exports.SearchProduct = (req,res) => {

    Product.search(req.query.name, (err, product)=>{
      if(err) return res.status(500).json({ success: false, message:err.message})
      res.json({ success: true, product: product})
    }) 

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


}

exports.updateProduct = (req, res) => {

    upload(req, res, (err)=>{
      
      if(err) return res.status(400).json({ success: false, message:err.message })

      if(req.body.constructor === Object && Object.keys(req.body).length === 0) 
      return res.status(400).json({ success: false, message:'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ!'})

      // ກວດຊອບຖ້າມີໄຟລ໌ໃໝ່ສົ່ງມາ ໃຫ້ລຶບໄຟລ໌ເກົ່າອອກ
      if(req.file){

        Product.findById(req.params.id, (err, product)=>{
          if(err) return res.status(500).json({ success: false, message:err.message })
          if(product.length > 0 && product[0].image){
              const filePath = path.join(__dirname,`../../upload/${product[0].image}`)
              fs.unlinkSync(filePath)
          }
        })

        req.body.image = req.file.filename
      }

      Product.update(req.params.id, new Product(req.body), (err, product) => {
          if(err) return res.status(500).json({ success: false, message:err.message })
          res.status(201).json({ success: true, message:'ອັບເດດສຳເລັດ' })
      })

    })

}

exports.deleteProduct = (req, res) => {

  Product.findById(req.params.id, (err, product)=>{
    if(err) return res.status(500).json({ success: false, message:err.message })
    if(product.length > 0 && product[0].image){
        const filePath = path.join(__dirname,`../../upload/${product[0].image}`)
        fs.unlinkSync(filePath)
    }
    })

  Product.delete(req.params.id, (err, product)=>{
    if(err) return res.status(500).json({ success: false, message:err.message })
    res.status(201).json({ success: true, message:'ລຶບຂໍ້ມູນສຳເລັດ!' })
  })

}

