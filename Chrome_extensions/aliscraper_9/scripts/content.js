chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message){
    console.log(message.msg);
    //below request send data to popup js. 
		chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
			console.log(response.farewell);
		}); 
}

var dd = getElementByXpath('//div[@class="main-content"]/div/div/div/div[@id="j-product-desc"]');
dd.insertAdjacentHTML('beforebegin', '<button id="editor_call"> Edit </button> &nbsp; &nbsp; &nbsp; <button id="preview_call"> Preview </button><br/>');


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

function validate_xpath_only(xpath)
{
  return document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null).iterateNext() instanceof Node;  
}


document.getElementById ("editor_call").addEventListener("click", editaction, false);
function editaction() {
	remove_div_products();
	$('#j-product-desc').summernote({
		height: 300,
		tabsize: 2,
		followingToolbar: true,
	});	
}

document.getElementById ("preview_call").addEventListener("click", previewaction, false);
function previewaction() {
	$('#j-product-desc').summernote('destroy');
}



function when_page_loads()
{
	// product-name
	$('#target').replaceWith('<textarea name="product_title">' + $('target').html() +'</textarea>')
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
	return;
}
}













	
	








