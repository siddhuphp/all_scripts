chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message){
    console.log(message.msg);
    products();
}

function products(){

let product_title = validate_xpath('//*[@id="j-product-detail-bd"]/div[1]/div/h1');
let product_price = validate_xpath('//*[@id="j-sku-price"]');
let product_discount_price = validate_xpath('//*[@id="j-sku-discount-price"]');
let product_detail_title = validate_xpath('//div[@class="main-content"]/div[@id="j-product-tabbed-pane"]/ul/li[1]/a');
let product_detail_sub_title = validate_xpath('//div[@class="main-content"]/div[@id="j-product-tabbed-pane"]/div/div/div/div[2]/div[@class="ui-box-title"]');
let product_id = ($("#hid-product-id").val())?($("#hid-product-id").val()):0;
//console.log("product_title"+product_title + "product_price"+product_price + "product_discount_price"+product_discount_price);

let product_images = new Array();
  $("#j-image-thumb-list img").map(function() {
    product_images.push($(this).attr("src"));
  });
 // console.log(product_images);


  var data = {
      "product_id":product_id,
      "product_title":product_title,
      "product_price":product_price,
      "product_discount_price":product_discount_price,
      "product_images":product_images,
      "product_item_list":list_items(),
      "product_detail_title":product_detail_title,
      "product_detail_sub_title":product_detail_sub_title,
      "product_detail_list":get_product_details(),
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


function validate_xpath_only(xpath)
{
  return document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null).iterateNext() instanceof Node;  
}

// This is for item list details
function list_items()
{
	if(validate_xpath_only('//*[@id="j-product-info-sku"]')) // check exist or not
	{
		// take list of item options
		var iterator = document.evaluate('//*[@id="j-product-info-sku"]/dl/dt', document, null, XPathResult.ANY_TYPE, null );
		
		try {
		  var thisNode = iterator.iterateNext();
		  var list_items = [];		  
		  var i = 1;
		  while (thisNode) {
					if(thisNode.textContent !== null && thisNode.textContent !== '') {
					 list_items[i] = thisNode.textContent;
					 thisNode = iterator.iterateNext();
						i++;
					}
			  } 
		}
		catch (e) {
		  console.log( 'Error: Document tree modified during iteration ' + e );
		}		
		console.log(list_items);
    console.log(list_item_details(list_items));
    return list_item_details(list_items);
	}
}

function list_item_details(list_items)
{
	var final_list_items = [];
	list_items.forEach(function(value,key) {
		console.log("key = "+key+ ": value = "+value);
		 final_list_items.push({
            item_name: value, 
            item_type: check_type(key),
            item_values: get_item_values(key),
        });
	});
	return final_list_items;
}


function check_type(key)
{
	type = ' - ';
	if(validate_xpath_only('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li/a/img/@src'))
	{
		type = "IMAGE";
	}
	else if(validate_xpath_only('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li/a/span'))
	{
		type = "TEXT";
	}
	return type;
}


function get_item_values(key)
{
	if(check_type(key) == "IMAGE")
	{
		return get_images_data(key);
	}
	else if(check_type(key) == "TEXT")
	{
		return get_text_data(key);
	}
}


function get_images_data(key)
{
	var iterator = document.evaluate('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li/a/img/@src', document, null, XPathResult.ANY_TYPE, null );
	try {
		  var thisNode = iterator.iterateNext();
		  var list_items = [];		  
		  var i = 0;
		  while (thisNode) {
					if(thisNode.textContent !== null && thisNode.textContent !== '') {
					 list_items[i] = thisNode.textContent;
					 thisNode = iterator.iterateNext();
						i++;
					}
			  } 
		}
		catch (e) {
		  console.log( 'Error: Document tree modified during iteration ' + e );
		}
		return list_items;
}


function get_text_data(key)
{
	var iterator = document.evaluate('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li/a/span', document, null, XPathResult.ANY_TYPE, null );
	try {
		  var thisNode = iterator.iterateNext();
		  var list_items = [];		  
		  var i = 0;
		  while (thisNode) {
					if(thisNode.textContent !== null && thisNode.textContent !== '') {
					 list_items[i] = thisNode.textContent;
					 thisNode = iterator.iterateNext();
						i++;
					}
			  } 
		}
		catch (e) {
		  console.log( 'Error: Document tree modified during iteration ' + e );
		}
		return list_items;
}


function get_product_details()
{
	var iterator = document.evaluate('//div[@class="main-content"]/div[@id="j-product-tabbed-pane"]/div/div/div/div[2]/div[2]/ul/li', document, null, XPathResult.ANY_TYPE, null );
	try {
		  var thisNode = iterator.iterateNext();
		  var list_items = [];		  
		  var i = 0;
		  while (thisNode) {
					if(thisNode.textContent !== null && thisNode.textContent !== '') {
					 list_items[i] = thisNode.textContent;
					 thisNode = iterator.iterateNext();
						i++;
					}
			  } 
		}
		catch (e) {
		  console.log( 'Error: Document tree modified during iteration ' + e );
		}
		return list_items;
}






