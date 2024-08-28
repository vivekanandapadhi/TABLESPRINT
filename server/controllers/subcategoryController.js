const SubCategory = require('../model/subcategory.model');

exports.createSubCategory = async (req, res) => {
    try {
        const { category, subCategoryName,subCategorySequence } = req.body;
      
        if (!category || !subCategoryName||!subCategorySequence) {
          return res.status(400).send('Number and Category Name are required');
        }
      
        const newCategory = new SubCategory({
            category,
            subCategoryName,
            subCategorySequence,
            imageUrl:req.file.filename
        });
        
        await newCategory.save();
        res.status(200).send('Category created successfully');
      } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
      }
};

exports.getSubCategories = async (req, res) => {
    try {
        const categories = await SubCategory.find({});
        // console.log(categories)
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
    }
};
// Get a single category by ID
exports.getSubCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await SubCategory.findById(id);
        // console.log(category)
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

exports.updateSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id)
        const { category,subCategoryName, subCategorySequence, status } = req.body;
        if (!category ||!subCategoryName|| !subCategorySequence || status === undefined) {
            return res.status(400).json({ message: 'Number, Category Name, and Status are required' });
        }
        const updatedCategory = await SubCategory.findByIdAndUpdate(
            id,
            { category,subCategoryName, subCategorySequence, status },
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

exports.deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCategory = await SubCategory.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Failed to delete category', error: error.message });
    }
};


