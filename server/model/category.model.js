const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    categoryname: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    imageUrl:{
        type:String,
        required:false
    },
    status:{
        type:Boolean,
        default:true

    }
    
    
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
