'use strict';

var server = require('server');
var page = module.superModule;
server.extend(page);

server.append('Show',function (req,res,next) {
    var Site = require('dw/system/Site');

    var viewData = res.getViewData();
    viewData.msg = Site.current.getCustomPreferenceValue('prefixMsg');
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();