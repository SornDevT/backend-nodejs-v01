const multer = require('multer')
const fs = require('fs')

exports.keyUpload = 'image' // key ທີ່ໃຊ້ເພື່ອທຳການອັບໂຫຼດຮູບພາບ

exports.config = {
    storage: multer.diskStorage({
        destination:(req, file, next)=>{
            const dir = './upload'
            if(!fs.existsSync(dir)){
                fs.mkdirSync(dir)
            }
            next(null, dir)
        },
        filename: (req, file, next) => {
            const ext = file.mimetype.split('/')[1];
            next(null, `${file.fieldname}-${Date.now()}.${ext}`)
        },
        limits:{
            fileSize: 1024 * 1204 * 5
        },
        fileFilter: (req, file, next) => {
            const allowed = ['image/png','image/jpg','image/ipeg']
            if(allowed.includes(file.mimetype)){
                next(null, true)
            } else {
                next({massage:'File Type not supported!'}, false)
            }
        }

    })
}