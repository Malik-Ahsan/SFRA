'use strict';

var decorators = require('*/cartridge/models/product/decorators/index');

module.exports = function compareProduct(product, apiProduct, options) { //for only requiring desired attributes of product
    decorators.base(product, apiProduct, options.productType);//contain id and name
    decorators.price(product, apiProduct, options.promotions, false, options.optionModel);
    decorators.description(product, apiProduct);
    decorators.options(product, options.optionModel, options.variables, options.quantity);

    var category = apiProduct.getPrimaryCategory();

    if (!category && (options.productType === 'variant' || options.productType === 'variationGroup')) {
        category = apiProduct.getMasterProduct().getPrimaryCategory();
    }

    Object.defineProperty(product, 'cat', {  //a custom property for category
        enumerable: true,
        value: apiProduct.primaryCategory.displayName,
    });

    return product;
};