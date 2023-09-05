
const dbConn = require('../config/db.config')


class Product{
    constructor(product){
        this.id = product.id;
        this.image = product.image;
        this.name = product.name;
        this.price = product.price;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
  }

Product.create = (newProduct, result) => {
    // ຖ້າບໍ່ມີຕາຕະລາງ products ແມ່ນໃຫ້ທຳການສ້າງ ຕາຕະລາງໃໝ່
    dbConn.query('CREATE TABLE IF NOT EXISTS products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), price INT, image VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP , updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)'), (err, res) => {
        if(err) return result(err, null)
    }

    dbConn.query('INSERT INTO products SET ?', newProduct, (err, res)=>{
        if(err) return result(err, null)
        return result(null, res)
    })
}

Product.findAll = (result) => {
    dbConn.query('SELECT * FROM products', (err, res)=>{
        if(err) return result(err, null)
        return result(null, res)
    })
}

module.exports = Product