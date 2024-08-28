const express = require('express');
const multer=require("multer")
const path=require("path")
const {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory
} = require('../controllers/subcategoryController');
const router = express.Router();

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"public/images2")
  },
  filename:(req,file,cb)=>{
    cb(null,file.filename+"_"+Date.now()+path.extname(file.originalname))
  }
})
const upload=multer({
  storage:storage
})

router.post('/subaddcategory',upload.single("file"), createSubCategory);
router.get('/subaddcategory', getSubCategories);
router.get('/updatesubcategory/:id', getSubCategoryById);
router.put('/addsubcategorys/:id', updateSubCategory);
router.delete('/deletesubcategorys/:id', deleteSubCategory);

module.exports = router;
