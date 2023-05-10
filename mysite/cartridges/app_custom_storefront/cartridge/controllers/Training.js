'use strict';

var server = require('server');

server.get('Product',function(req,res,next){
    var productMgr = require('dw/catalog/ProductMgr');

    var product = productMgr.getProduct(req.querystring.pid);
    if(product){
        res.json({
            productId: product.ID,
            productName: product.name,
            productDescription: product.shortDescription.toString()
        });
    }else{
        res.json({
            error: 'Product id is Invalid'
        });
    }
    next();
});

module.exports = server.exports();

//querystring = req.querystring.pid
//var params = querystring;
//var productId = params.pid