'use strict';

var server = require('server');

server.get('Show',function(req,res,next){
    var ProductMgr = require('dw/catalog/ProductMgr');
    var compareProduct = require('*/cartridge/models/product/compareProduct');//my model
    var productHelper = require('*/cartridge/scripts/helpers/productHelpers');

    var params = req.querystring.pid;
    params = params.split(",");

    var products = [];
    var apiProduct,product,options;
    for (let i = 0; i < params.length; i++)
    {
        product = Object.create(null);
        apiProduct = ProductMgr.getProduct(params[i]); 
        options = productHelper.getConfig(apiProduct, {pid:params[i]});

        products.push(compareProduct(product,apiProduct,options));
    }
        
    res.render('compare', {
        products: products,
    });
    
    next();
});

module.exports = server.exports();