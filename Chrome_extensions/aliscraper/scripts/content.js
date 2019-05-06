chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message){
    console.log(message.msg);
    products();
}

function products(){

let product_title = validate_xpath('//*[@id="j-product-detail-bd"]/div[1]/div/h1');

let product_price = validate_xpath('//*[@id="j-sku-price"]');

let product_discount_price = validate_xpath('//*[@id="j-sku-discount-price"]');
let product_color_item_title = validate_xpath('//*[@id="j-product-info-sku"]/dl[1]/dt');
//console.log("product_title"+product_title + "product_price"+product_price + "product_discount_price"+product_discount_price);

let product_images = new Array();
  $("#j-image-thumb-list img").map(function() {
    product_images.push($(this).attr("src"));
  });
 // console.log(product_images);

let product_colors = new Array();
$("#j-sku-list-1 img").map(function() {
  product_colors.push($(this).attr("src"));
});

let product_sizes = new Array();
$("#j-sku-list-2 a").map(function() {
  product_sizes.push($(this).text());
});

  var data = {
      "product_title":product_title,
      "product_price":product_price,
      "product_discount_price":product_discount_price,
      "product_images":product_images,
      "product_color_item_title":product_color_item_title,
      "product_colors":product_colors,
      "product_size_item_title":'Size',
      "product_sizes":product_sizes,
  };

  chrome.runtime.sendMessage({greeting: "hello",final:data}, function(response) {
    console.log(response.farewell);
  });
 
}

function validate_xpath(xpath)
{
  var chk = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null).iterateNext() instanceof Node;  
  if(chk == true)
  {
     value = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null).iterateNext().textContent;
  }
  else
  {
    value = ' - ';
  }
  return value;
}

