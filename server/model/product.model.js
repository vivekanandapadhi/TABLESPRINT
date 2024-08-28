const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    categoryname: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    productname:{
        type:String,
        required:true
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
