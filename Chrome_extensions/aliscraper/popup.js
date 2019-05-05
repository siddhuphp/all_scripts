chrome.runtime.sendMessage({popupOpen: true});

console.log("POPUP js fired");

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting == "hello")
      {
        sendResponse({farewell: "goodbye"});
        $("#product_title").text(request.final.product_title);
        $("#product_price").text(request.final.product_price);
        $("#product_discount_price").text(request.final.product_discount_price);


        $.each(request.final.product_images, function( index, value ) {
            $("#product_images").append('<img src="'+value+'">&nbsp;&nbsp;');
          });          
      }
        
    });