'use strict';

var server = require('server');

server.get('Show',function(req,res,next){
    res.json({msg : "${req.queryString}"});
    next();
});

module.exports = server.exports();