'use strict';

var base = module.superModule;

module.exports = function fullProduct(product, apiProduct, options){
    base.call(this,product, apiProduct, options);

    Object.defineProperty(product, 'msg',{
        enumerable: true,
        value: 'New '
    });
    return product;
}