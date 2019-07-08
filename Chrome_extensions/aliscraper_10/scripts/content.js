chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message){
    console.log(message);
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
			if(validate_xpath_only('//div[@class="glodetail-wrap"]'))
			{
				when_page_loads();
				append_after_page_load();
				//get_checked_urls();
				// window.scrollTo(0,document.body.scrollHeight); // it's scroll down to load the descriptions purpose
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
	
	var category = $("#category").val();
	var manfacture = $("#manfacture").val();
	
	if(!category && !manfacture)
	{
		alert("please select category and manfacture details");
		return false;
	}
	else
	{	
		obj = {
			"category":category,
			"manfacture":manfacture,
		};	
		inilize(obj);
		$('#preview_call').text('Product Saved');
	}
		
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
	$('.product-title').replaceWith('<textarea name="product-name" class="product-name" rows="3" cols="70">' + $('.product-title').html() +'</textarea>');
}



function when_page_loads()
{
	var dd = getElementByXpath('//div[@class="glodetail-wrap"]');
	dd.insertAdjacentHTML('beforebegin', '<button id="editor_call"> Edit </button> &nbsp; &nbsp; &nbsp; <button id="preview_call"> Save </button>');
}

var first_click = 1;
function append_after_page_load()
{
	document.getElementById ("editor_call").addEventListener("click", editaction, false);
	function editaction() {
		//remove_div_products();
		product_title_area();		
		// $('.description-content').summernote({
		// 	height: 300,
		// 	tabsize: 2,
		// 	followingToolbar: true,
		// });		
		
		if(first_click == 1)
		{
			get_user_manf_cate();
			manf_cate_html();
			first_click = 0;
		}	
		$('#preview_call').text('Save');
			
	}

	document.getElementById ("preview_call").addEventListener("click", previewaction, false);
	function previewaction() {
		// $('.description-content').summernote('destroy');
		
		if($('.product-name').val())
		{
			$('.product-name').replaceWith('<div class="product-title">' + $('.product-name').val() +'</div>');
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


//Below function sends request to apis.js
//For getting user 'manfactures' and 'categories' details
//User must login to sucsses this request bcoz it needs TOKEN
function get_user_manf_cate()
{
	chrome.runtime.sendMessage({msg: "get_manf_cate"}, function(response) {
		console.log(response); //response from APIS.js script
		manf_cate_html_append(response);   
   }); 
}
 


function manf_cate_html()
{
	$("#editor_call").after(`
		<select name="category" id="category">
		  <option value=""> Select category </option>
		</select>
		<select name="manfacture" id="manfacture">
			<option value=""> Select manfacture </option>
		  </select>`);
	append_lisener();
}

function manf_cate_html_append(response)
{
	if(response.cate)
	{
		var optionsAsString = "";		
		$.each(response.cate, function(k, v) {
			optionsAsString += "<option value='" + v.key + "'>" +v.value + "</option>";
		  });
		$( 'select[name="category"]' ).append( optionsAsString );
	}

	if(response.manf)
	{
		var optionsAsString = "";
		$.each(response.manf, function(k, v) {
			optionsAsString += "<option value='" + v.key + "'>" +v.value + "</option>";
		  });
		$( 'select[name="manfacture"]' ).append( optionsAsString );
	}
	
}



function append_lisener()
{
	document.getElementById("category").addEventListener("change", category_dropdown, false);
}


function category_dropdown()
{
    chrome.runtime.sendMessage({msg:"get_attributes",value:this.value}, function(response) {
		console.log(response); //response from APIS.js script
		if(response)
		{
			make_attributes_dropdown(response.attr);
		}
					 
	}); 	
	console.log("kljotest");
}


function make_attributes_dropdown(res)
{
	var chk_class = document.getElementsByClassName("g_attributes");
	if(chk_class.length > 0)
	{
		$(".g_attributes").remove();
	}	
	// console.log(JSON.stringify(res));
	c = document.querySelectorAll('.sku-title').length;
	console.log(c);
	for(i=1;i<=c;i++)
	{
		var html = '';
		page_attribute_txt = validate_xpath("//div[@class='product-sku']/div[@class='sku-wrap']/div[@class='sku-property']["+i+"]/div").toLowerCase().replace(':','').trim();
		if(res.AttributeMappings && (page_attribute_txt != 'ships from'))
		{
			html = '<select class="g_attributes">';
			show_all = true;
			res.AttributeMappings.forEach(function (v,k) {
				if(page_attribute_txt)
				{
					if(v.ProductAttributeInternalName.includes(page_attribute_txt))
					{
						html += '<option value="'+v.ProductAttributeInternalName+'">'+ v.ProductAttributeInternalName + '</option>';
						show_all = false;
					}					
				}						
			});

			if(show_all)
			{
				res.AttributeMappings.forEach(function (v,k) {
					html += '<option value="'+v.ProductAttributeInternalName+'">'+ v.ProductAttributeInternalName + '</option>';
				});	
			}
			html += '</select>';
		}

		if(validate_xpath_only("//div[@class='product-sku']/div[@class='sku-wrap']/div[@class='sku-property']["+i+"]/div"))
		{
			var dd =  getElementByXpath("//div[@class='product-sku']/div[@class='sku-wrap']/div[@class='sku-property']["+i+"]/div");
			dd.insertAdjacentHTML('beforeend', html);
		}
				
	}
}

