const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// ນຳໃຊ້ bodyParser
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())


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


// ດຶງຂໍ້ມູນມາສະແດງທັງໝົດ
app.get('/products', (req,res)=>{
  res.send(products)
})

// ດຶງຂໍ້ມູນຕາມ id ໃຊ້ຮູບແບບ get pasrams
app.get('/product/:id', (req,res)=>{
   
  let id = req.params.id
  let get_product = products.find((item)=> item.id == id)

  if(get_product){
      res.status(200).send(get_product)
  } else {
      res.status(404).send('ບໍ່ມີຂໍ້ມູນ')
  }

})

// ຄົ້ນຫາຂໍ້ມູນຈາກຊື່ໂດຍໃຊ້ get query string
app.get('/search',(req,res)=>{
  let name = req.query.name
  let get_product = products.find((item)=> item.name == name)

  if(get_product){
      res.status(200).send(get_product)
  } else {
      res.status(404).send('ບໍ່ມີຂໍ້ມູນ')
  }
})

// post ເພີ່ມຂໍ້ມູນສິນຄ້າ --------------------------
app.post('/product', (req,res)=>{
    let id = products.length +1
    let name = req.body.name
    let price = req.body.price
    let product = new Product(id, name, price)
    // ເພີ່ມ product ເຂົ້າໄປໃນລາຍການສິນຄ້າ products
    products.push(product)
    res.status(201).json(product)

})

// post ຂໍ້ມູນແບບທີ່ 02
app.post('/product2', (req,res)=>{
  let id = products.length +1
  const {name, price } = req.body
  let product = new Product(id, name, price)
  // ເພີ່ມ product ເຂົ້າໄປໃນລາຍການສິນຄ້າ products
  products.push(product)
  res.status(201).json(product)

})

// ການຍິງ http request ແບບ put ເພື່ອອັບເດດຂໍ້ມູນ -------------------------------
// app.put('/product/:id',(req,res)=>{
//   let id = req.params.id
//   let index = products.findIndex((item)=> item.id == id)
//   if(index >=0){
//     const { name, price } = req.body
//     /// ອັບເດດຂໍ້ມູນ
//     products[index].name = name 
//     products[index].price = price
//     res.json(products)
//   } else {
//     res.status(404).send('Not found!')
//   }

// })

app.put('/product/:id',(req,res)=>{
  let id = req.params.id
  let index = products.findIndex((item)=> item.id == id)
  if(index >=0){
    const { name, price } = req.body
    /// ອັບເດດຂໍ້ມູນ
    // ແບບເຕັມ
    // if(name){ 
    //   products[index].name = name  
    // }
    
    // if(price){
    //   products[index].price = price
    // }

    // ແບບຍໍ້
    name?products[index].name = name:null
    price?products[index].price = price:null
    
    res.json(products)
  } else {
    res.status(404).send('Not found!')
  }

})


// delete product by id

app.delete('/product/:id',(req,res)=>{
  let id = req.params.id
  let index = products.findIndex((item)=> item.id == id)
  if(index >=0){
    // ລຶບຂໍ້ມູນຕາມ index
    products.splice(index,1)
    res.send(products)
  } else {
    res.status(404).send('Not found!')
  }
})




app.listen(3000, function(){
    console.log("Server Runing Port:3000!")
});