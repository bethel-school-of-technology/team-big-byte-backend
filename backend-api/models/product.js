var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
 
   description: {
       type: String,
    },
    name: {
        type: String,
    },
    productPrice: {
        type: Number,
    },
    productImage: {
        type: String,
    }

})

var Product = mongoose.model('product', productSchema);

module.exports = Product