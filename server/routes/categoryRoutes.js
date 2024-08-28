const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
  
} = require('../controllers/categoryController');
const router = express.Router();

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,"public/images")
  },
  filename:(req,file,cb)=>  {
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
  }
})
const upload=multer({
  storage:storage
})

router.post('/addcategorys',upload.single("file"), createCategory);
router.get('/addcategorys', getCategories);
router.get('/updatecategory/:id', getCategoryById);
router.put('/addcategorys/:id', updateCategory);
router.delete('/deletecategorys/:id', deleteCategory);

module.exports = router;
