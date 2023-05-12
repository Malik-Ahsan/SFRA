'use strict';

var processInclude = require('base/util');

$(document).ready(function() {
    processInclude(require('base/search'));

    function buttonEnabledDisabled(){
        var pids = [];

        $('.custom-checkbox:checked').each(function(){
            pids.push($(this).attr('data-id'));
        });

        if(pids.length > 1 && pids.length <=4){
            $('.compare-btn').attr('disabled',false);
            
            $('.compare-btn').on('click',function(){
                var url = $(this).attr('data-url');
                url += '?pid=';
                url += pids.toString();
                window.location.href = url;
            });
        }
        else{
            $('.compare-btn').attr('disabled',true);
        }
    }

    buttonEnabledDisabled();

    $('.custom-checkbox').on('change',function(){
        buttonEnabledDisabled();
    });

    
    // $('.compare-btn').on('click',function(){
    //     var url = $('.compare-btn').attr('data-url');
    //     var pids = [];

    //     $('.custom-checkbox:checked').each(function(){
    //         pids.push($(this).attr('data-id'));
    //     });

    //     if(pids.length >= 1 && pids.length <=4){
    //         $(this).attr('disabled',false);
    //         url += '?pid=';
    //         url += pids.toString();
    //         window.location.href = url;
    //     }
    //     else{
    //         $(this).attr('disabled',true);

    //     }
    //});
});

//-----------Logic to Add Alert Box for 5 seconds----------
//<div class="alert alert-success add-to-basket-alert text-center" role="alert">Product added to cart</div>
// $('.add-to-cart-messages').append(
//     '<div class="alert ' + messageType + ' add-to-basket-alert text-center" role="alert">'
//     + response.message
//     + '</div>'
// );

// setTimeout(function () {
//     $('.add-to-basket-alert').remove();
// }, 5000);