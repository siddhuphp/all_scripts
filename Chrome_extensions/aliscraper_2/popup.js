chrome.runtime.sendMessage({popupOpen: true});

console.log("POPUP js fired");

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      console.log(request);
      if (request.greeting == "hello")
      {
        sendResponse({farewell: "goodbye"});
        $("#product_title").text(request.final.product_title);
        $("#product_price").text(request.final.product_price);
        $("#product_discount_price").text(request.final.product_discount_price); 

        $.each(request.final.product_images, function( index, value ) {
            $("#product_images").append('<img src="'+value+'">&nbsp;&nbsp;');
          });
          
          
          $.each(request.final.product_item_list, function( index, value ) {
            $("#products_item_options").append('<h4>'+value.item_name+'</h4>');
            if(value.item_values)
            {
              $.each(value.item_values, function( k, v ) {
                if(value.item_type == "TEXT-TYPE")
                {
                  $("#products_item_options").append('<p>'+v+'</p>');
                }
                else if(value.item_type == "IMG-TYPE")
                {
                  $("#products_item_options").append('<img src="'+v+'">&nbsp;&nbsp;');
                }                
              });
            }
          });

              
      }
        
    });