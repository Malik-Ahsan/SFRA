'use strict';

var createErrorNotification = require('base/components/errorNotification');

module.exports = {
    subscribe: function () {
        $('form.subscription').submit(function (e) {
            var form = $(this);
            e.preventDefault();
            var url = form.attr('action');
            form.spinner().start();
            $('form.subscription').trigger('login:subscribe', e);
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: form.serialize(),
                success: function (data) {
                    form.spinner().stop();
                    if (!data.success) {
                        $('form.subscription').trigger('login:subscribe:error', data);
                        $('#form-email-error').html(data.msg);
                        $('#form-email-error').show();
                    } else {
                        $('form.subscription').trigger('login:subscribe:success', data);
                        $('#form-email-error').html(data.msg);
                        $('#form-email-error').show();
                    }
                },
                error: function (err) {
                    if (err.responseJSON.redirectUrl) {
                        window.location.href = err.responseJSON.redirectUrl;
                    } else {
                        createErrorNotification($('.error-messaging'), err.responseJSON.errorMessage);
                    }
                    form.spinner().stop();
                }
            });
            return false;
        });
    },
    newsletterTrigger : function () {
        $('form.subscription').on('login:subscribe',function(){
            alert('Submitting form');
        });

        $('form.subscription').on('login:subscribe:error',function(){
            alert('An error occured');
        });

        $('form.subscription').on('login:subscribe:success',function(){
            alert('Form is submitted successfully');
        });
    }
};
