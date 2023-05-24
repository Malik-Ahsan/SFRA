'use strict';

var server = require('server');

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

function validateEmail(email) {
    var regex = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
    return regex.test(email);
}

server.get(
    'Show',
    consentTracking.consent,
    server.middleware.https,
    csrfProtection.generateToken,
    function (req, res, next) {
        var URLUtils = require('dw/web/URLUtils');
        var actionUrl = URLUtils.url('Subscription-Confirm');

        var subscriptionForm = server.forms.getForm('subscription');
        subscriptionForm.clear();

        res.render('/email', {
            actionUrl: actionUrl,
            subscriptionForm: subscriptionForm,
        });

        next();
    },
);

server.post(
    'Confirm',
    server.middleware.https,
    csrfProtection.validateRequest,
    function (req, res, next) {
        var subscriptionForm = server.forms.getForm('subscription');
        var Resource = require('dw/web/Resource');
        var email = subscriptionForm.customer.email.value;
        var isValid,msg;

        if (email) {
            isValid = validateEmail(email);
            if (isValid) {

                this.on('route:BeforeComplete', function (req, res) {
                    var Transaction = require('dw/system/Transaction');
                    var CustomObjectMgr = require('dw/object/CustomObjectMgr');

                    try {
                        Transaction.wrap(function () {
                            var CustomObject = CustomObjectMgr.createCustomObject('NewsletterSubscription',email);
                        });
                    }
                    catch(e){
                        msg = Resource.msg('error.message.subscription', 'subscription', null);
                        res.render('/confirmation',{
                            success: false,
                            msg: msg,
                        });
                    }
                });

                msg = Resource.msg('success.message.subscription', 'subscription', null);
                res.render('/confirmation',{
                    success: true,
                    email: email,
                    msg: msg,
                });
            }
            else {
                msg = Resource.msg('error.message.subscription', 'subscription', null);
                res.render('/confirmation',{
                    success: false,
                    msg: msg,
                });
            }
        }

        next();
    },
);

module.exports = server.exports();