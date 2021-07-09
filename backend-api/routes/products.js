var express = require('express');
var router = express.Router();
var Product = require('../models/product')


router.post('/addProduct', async (req, res, next) => { 
    try{
      // console.log(req.body);
      let newProduct = new Product({
        description: req.body.description,
        name: req.body.name,
        productPrice: req.body.productPrice,
        productImage: req.body.productImage

        
      });
      console.log(newProduct)
      let result = await newProduct.save();
      // console.log(result);
      res.json({
        status: 200,
        massage: "Product created",
        newProduct: result 
      });
    }
    catch(err){
      console.log(err);
      res.send("error");
  
    }
  
  })

  router.get('/getAllProducts', async (req, res, next) => {

    try{
       const products = await Product.find();
       res.json({
        status: 200,
        massage: "All Products Found",
        AllProduct: products 
      });
      }
      catch(err){
        console.log(err);
        res.send("error");
    
      }
  })

  module.exports = router;