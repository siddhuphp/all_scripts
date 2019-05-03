console.log("lodded");
$(function(){
    $("#shopping").click(function() {
        console.log("hitted");
        chrome.storage.sync.get(['data'], function(result) {
            console.log(result);
            $("#product_title").text(result.data.product_title);
            $("#product_price").text(result.data.product_price);
            $("#product_discount_price").text(result.data.product_discount_price);


            $.each(result.data.product_images, function( index, value ) {
                $("#product_images").append('<img src="'+value+'">&nbsp;&nbsp;');
              });
            
              clearStorage();
          });
    });
});

function clearStorage(){
        // Clear chrome storage before saving
        chrome.storage.local.clear(function() {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
            }
        }); 
}