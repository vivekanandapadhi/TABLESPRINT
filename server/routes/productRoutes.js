const express = require('express');
const multer = require('multer');
const path = require('path');
const {
    createProduct,
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct
  
} = require('../controllers/productController');
const router = express.Router();

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images1")
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({
    storage:storage
})



router.post('/createproduct',upload.single("file"), createProduct);
router.get('/getproduct', getProduct);
router.get('/getproductbyid/:id', getProductById);
router.put('/updateproduct/:id', updateProduct);
router.delete('/deleteproduct/:id', deleteProduct);

module.exports = router;
