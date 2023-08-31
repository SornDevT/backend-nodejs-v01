const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello ສະບາຍດີ')
})

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

app.listen(3000, function(){
    console.log("Server Runing Port:3000!")
});