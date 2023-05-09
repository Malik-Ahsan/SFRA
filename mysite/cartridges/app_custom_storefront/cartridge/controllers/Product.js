'use strict';

var server = require('server');
var page = module.superModule;
server.extend(page);

server.append('Show',function (req,res,next) {
    var viewData = res.getViewData();
    viewData.msg = 'New ';
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();