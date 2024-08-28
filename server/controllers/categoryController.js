const CategorySchema = require('../model/category.model');
const multer = require('multer');
const path = require('path');





exports.createCategory = async (req, res) => {
    try {
        const { number, categoryname,status} = req.body;
        // console.log(req.file)
        if (!number || !categoryname) {
          return res.status(400).send('Number and Category Name are required');
        }
        const newCategory = new CategorySchema({
          categoryname:categoryname,
          number:number,
          imageUrl:req.file.filename,
          status:status
        });
        // console.log(newCategory)
        
        await newCategory.save();
        res.status(200).send('Category created successfully');
      } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
      }
};
// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await CategorySchema.find({});
        // console.log(categories)
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
    }
};
// Get a single category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await CategorySchema.findById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ message: 'Failed to fetch category', error: error.message });
    }
};

// Update a category by ID

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { number, categoryname, status } = req.body;
        if (!number || !categoryname || status === undefined) {
            return res.status(400).json({ message: 'Number, Category Name, and Status are required' });
        }
        const updatedCategory = await CategorySchema.findByIdAndUpdate(
            id,
            { number, categoryname, status },
            { new: true } // Return the updated category document
        );
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        
        res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Failed to update category', error: error.message });
    }
};

// Delete a category by ID

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCategory = await CategorySchema.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Failed to delete category', error: error.message });
    }
};
