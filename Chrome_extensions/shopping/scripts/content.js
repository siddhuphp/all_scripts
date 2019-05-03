let product_title = document.evaluate('//*[@id="j-product-detail-bd"]/div[1]/div/h1', document,
  null, XPathResult.ANY_TYPE, null).iterateNext().textContent;

let product_price = document.evaluate('//*[@id="j-sku-price"]', document,
  null, XPathResult.ANY_TYPE, null).iterateNext().textContent;

let product_discount_price = document.evaluate('//*[@id="j-sku-discount-price"]', document,
  null, XPathResult.ANY_TYPE, null).iterateNext().textContent;

//console.log("product_title"+product_title + "product_price"+product_price + "product_discount_price"+product_discount_price);
let product_images = new Array();
  var tn_array = $("#j-image-thumb-list img").map(function() {
    product_images.push($(this).attr("src"));
  });
 // console.log(product_images);

  var data = {
      "product_title":product_title,
      "product_price":product_price,
      "product_discount_price":product_discount_price,
      "product_images":product_images,
  };


    // Data storage in chrome storage
    chrome.storage.sync.set({"data": data}, function() {
        console.log(data);
      });
  
  

 //console.log(data);