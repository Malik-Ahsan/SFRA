'use strict';

var server = require('server');

server.get('Product',function(req,res,next){
    var productMgr = require('dw/catalog/ProductMgr');

    var product = productMgr.getProduct('25517958M');
    res.json({
        productId: product.ID,
	    productName: product.name,
	    productDescription: product.shortDescription.toString()
    });
    next();
});

module.exports = server.exports();