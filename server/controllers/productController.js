const path = require('path');
const productSchema = require('../model/product.model');





exports.createProduct = async (req, res) => {
    try {
        const { categoryname,subcategory,productname,status } = req.body;
       
        
       
        if (!categoryname || !subcategory||!productname) {
            
          return res.status(400).send('categoryname ,subCategory and product name  are required');
        }
        
        const newCategory = new productSchema({
          categoryname:categoryname,
          subcategory:subcategory,
          productname:productname,
          imageUrl:req.file.filename,
          status:status
        });
        
        await newCategory.save();
        res.status(200).send('Category created successfully');
      } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
      }
};
// Get all Product
exports.getProduct = async (req, res) => {
    try {
        const categories = await productSchema.find({});
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
    }
};
// Get a single Product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await productSchema.findById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ message: 'Failed to fetch category', error: error.message });
    }
};

// Update a Product by ID

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryname, subcategory,productname,status } = req.body;

        if (!categoryname || !subcategory||!productname||status===undefined) {
            return res.status(400).send('categoryname ,subCategory and product name  are required');
          }
        const updatedProduct = await productSchema.findByIdAndUpdate(
            id,
            { categoryname, subcategory, productname,status },
            { new: true } 
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated successfully', category: updatedProduct });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Failed to update category', error: error.message });
    }
};

// Delete a Product by ID

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await productSchema.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Failed to delete category', error: error.message });
    }
};
