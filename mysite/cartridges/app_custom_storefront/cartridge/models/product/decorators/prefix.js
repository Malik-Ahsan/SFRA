'use strict';

module.exports = function (product, apiProduct){
    Object.defineProperty(product, 'msg',{
        enumerable: true,
        value: 'New '
    });
}