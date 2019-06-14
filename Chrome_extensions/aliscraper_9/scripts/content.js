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
				get_checked_urls();
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
		if($('.product-name').val())
		{
			$('.product-name').replaceWith('<h1 class="product-name">' + $('.product-name').val() +'</h1>');
		}		
		updateaction();
	}
}

// console.log(products());

// Check this current url in our url_bucket list. To Append 'Next' button
// If exits check the count of url_bucket list. If it is grater than 0 then append next button.
function get_checked_urls()
{
    obj = { greeting:"urls_count" };
     chrome.runtime.sendMessage(obj, function(response) {    
			  console.log(response);
			  remain_process(response);			
     });        
}

function remain_process(res)
{
	var dis_url = window.location.href.split("?")[0];	
	if(isInArray(dis_url,res.urls) && (res.urls_count > 1))
	{
		$('#preview_call').after(' &nbsp; &nbsp; &nbsp; <button id="next_call"> Close & Next </button>');
		document.getElementById ("next_call").addEventListener("click", nextaction, false);		
	}	
}


function nextaction() {
	var dis_url = window.location.href.split("?")[0];
	obj = { greeting:"next_url", remove_url:dis_url };
	chrome.runtime.sendMessage(obj, function(response) {    
			 console.log(response);
			 window.location = response.open_url;
             window.open(response.open_url, '_self');			 			
	});	
}



function goto_login(url)
{
	console.log("Im login");
   var xhr = new XMLHttpRequest();
   xhr.open("POST", url, true);
   xhr.responseType="document";
   xhr.onreadystatechange = function() {
   if (xhr.readyState == 4) {
	   if(xhr.response)
	   {
			console.log(xhr.response);		                        
	   }         
	  }
   }
   xhr.send("email=09trimurthulu81@gmail.com&password=YWRtaW4=");      
}




function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
	  var c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
  }
	
  console.log(getCookie('aep_usuc_f'));
  coke = getCookie('aep_usuc_f');
  var res = coke.split('&');
  if(res)
  {
	if(isInArray('c_tp=USD',res) && isInArray('region=IN',res)) //set what u want here
	{
		console.log("Cookies already exists");
	}
	else
	{
		setCookie('aep_usuc_f', 'site=glo&c_tp=USD&region=IN&b_locale=en_US', 1); //set what u want here
	}
  }
  	
  

  function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	location.reload();
  }

  

// function delete_cookie(name)
// {
// 	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=[something];";
// }


// delete_cookie('aep_usuc_f');


