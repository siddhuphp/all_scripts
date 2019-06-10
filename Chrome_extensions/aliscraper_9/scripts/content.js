chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message){
    console.log(message.msg);
    //below request send data to popup js. 
		chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
			console.log(response.farewell);
		}); 
}

document.addEventListener('readystatechange', event => {

	if (event.target.readyState === "interactive") {  
			alert("All HTML DOM elements are accessible");
	}

	if (event.target.readyState === "complete") {
			console.log("Now external resources are loaded too, like css,src etc... ");
			if(validate_xpath_only('//div[@class="ui-breadcrumb"]'))
			{
				when_page_loads();
				append_after_page_load();
			}			
	}
});




function getElementByXpath(path) {
	if(validate_xpath_only(path))
	{
		return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}
	else
	{
		console.log("Failed to read xpath in content.js 21 line");
		return false;
	}  
}

function updateaction() {
	final_product = products();
	final_product.product_title = $(".product-name").text();
	final_product.product_desc = $(".description-content").html();
	final_product.product_short_desc = $("#shrt_desc").html();
	console.log(final_product);
	console.log(JSON.stringify(final_product));	
}


function remove_div_products()
{

	try
	{
		var allListElements = $( 'div' );
		var t = $( ".origin-part" ).find( allListElements );
		

		if ($('.detailmodule_dynamic').length) {
			$('.detailmodule_dynamic').remove();// to remove unwated data
		}
		else if(t.length > 0)
		{
			
			//t.first().css( "background-color", "red" );
			x=t.first().attr('style');
			
			if (x)
			{
			if(x.indexOf("overflow:")>0){
				t.first().remove(); 
			}  
		}  
		}	
		else 
		{
			if ($('.origin-part div').length)
			{
				var styletext=$('.origin-part div').attr('style');
				if (styletext.length>0)
				{
				if (styletext.indexOf("overflow")==0)
				{
					$('.origin-part div').remove();
				}
			}
			}
		}
	}
	catch (e)
	{
		console.log( e);	
	}
}


function product_title_area()
{
	$('.product-name').replaceWith('<textarea name="product-name" class="product-name" rows="3" cols="70">' + $('.product-name').html() +'</textarea>');
}



function when_page_loads()
{
	var dd = getElementByXpath('//div[@class="ui-breadcrumb"]');
	dd.insertAdjacentHTML('beforebegin', '<button id="editor_call"> Edit </button> &nbsp; &nbsp; &nbsp; <button id="preview_call"> Save </button>');
}

var first_click = 1;
function append_after_page_load()
{
	document.getElementById ("editor_call").addEventListener("click", editaction, false);
	function editaction() {
		remove_div_products();
		product_title_area();
		$('.description-content').summernote({
			height: 300,
			tabsize: 2,
			followingToolbar: true,
		});	
		
		
		if(first_click == 1)
		{
			$('.product-property-list').parent().append('<div class="ui-box-title">Short Description </div><span id="shrt_desc">'+$('.product-property-list').html()+'</span>');	
			first_click = 0;
		}
		$('#shrt_desc').summernote({
			height: 300,
			tabsize: 2,
			followingToolbar: true,
		});
		
		
	}

	document.getElementById ("preview_call").addEventListener("click", previewaction, false);
	function previewaction() {
		$('.description-content').summernote('destroy');
		$('#shrt_desc').summernote('destroy');
		$('.product-name').replaceWith('<h1 class="product-name">' + $('.product-name').val() +'</h1>');
		updateaction();
	}
}

// console.log(products());






	
	








