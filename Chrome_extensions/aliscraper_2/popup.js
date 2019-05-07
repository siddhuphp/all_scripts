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
        $("#product_id").text(request.final.product_id);
        $("#product_title").text(request.final.product_title);
        $("#product_price").text(request.final.product_price);
        $("#product_discount_price").text(request.final.product_discount_price); 

        $.each(request.final.product_images, function( index, value ) {
            $("#product_images").append('<img src="'+value+'">&nbsp;&nbsp;');
          });
          
          $("#product_images").append('<hr>');
          $.each(request.final.product_item_list, function( index, value ) {
            $("#products_item_options").append('<h4>'+value.item_name+'</h4>');           
            if(value.item_values)
            {
              $.each(value.item_values, function( k, v ) {
                if(value.item_type == "TEXT")
                {
                  $("#products_item_options").append('<p>'+v+'</p>');
                }
                else if(value.item_type == "IMAGE")
                {
                  $("#products_item_options").append('<img src="'+v+'">&nbsp;&nbsp;');
                }                
              });
            }
            $("#products_item_options").append('<p><b>Item Type: </b>'+value.item_type+'</p>');
          });
          $("#products_item_options").append('<hr>');

          // Product details
          $("#products_item_options").append('<h4>'+request.final.product_detail_title+'</h4>');
          $("#products_item_options").append('<p><b>'+request.final.product_detail_sub_title+'</b></p>');
          $.each(request.final.product_detail_list, function( index, value ) {
            $("#products_item_options").append('<p>'+value+'</p>');
          });
          
          //India Shipping Details
          if(request.final.product_id)
          {
            $.ajax({
              url: "https://freight.aliexpress.com/ajaxFreightCalculateService.htm?productid="+request.final.product_id+"&country=IN",
              type: 'GET',
              crossDomain:true,
              cache:false,
              async:false,
              //dataType: 'json', // added data type
              success: function(res) {
                  console.log(res);                 
              }
            });
          }
      }
        
    });