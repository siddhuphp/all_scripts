chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message){
    console.log(message.msg);
    //below request send data to popup js. 
		chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
			console.log(response.farewell);
		}); 
}


/*var jQueryScript = document.createElement('script');  
jQueryScript.setAttribute('src','https://cdn.ckeditor.com/4.11.4/standard/ckeditor.js');
document.head.appendChild(jQueryScript);*/

 var cssLink = document.createElement('link');  
 cssLink.setAttribute('rel','stylesheet');
 cssLink.setAttribute('href','https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.css');
 document.head.appendChild(cssLink);

 var jQueryScript = document.createElement('script');  
 jQueryScript.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.js');
 document.head.appendChild(jQueryScript);

 var jQueryScript = document.createElement('script');  
 jQueryScript.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.5/umd/popper.js');
 document.head.appendChild(jQueryScript);

 var jQueryScript = document.createElement('script');  
 jQueryScript.setAttribute('src','https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.js');
 document.head.appendChild(jQueryScript);



 var cssLink2 = document.createElement('link');  
 cssLink2.setAttribute('rel','stylesheet');
 cssLink2.setAttribute('href','https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote-bs4.css');
 document.head.appendChild(cssLink2);

 var jQueryScript1 = document.createElement('script');  
 jQueryScript1.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote-bs4.js');
 document.head.appendChild(jQueryScript1);





var dd = getElementByXpath("//div[@id='j-product-description']/div[@class='ui-box-title']");
dd.insertAdjacentHTML('beforeend', '<button id="editor_call"> Edit </button> &nbsp; &nbsp; &nbsp; <button id="preview_call"> Preview </button>');
dd.insertAdjacentHTML('afterend','<div id="summernote">Hello <b>Summernote</b></div>');

// $(document).ready(function() {
// 	alert();
// 	$('#summernote').summernote({
// 		height: 300,
// 		tabsize: 2,
// 		followingToolbar: true,
// 	});
// });


function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}




document.getElementById ("editor_call").addEventListener("click", myFunction, false);

function myFunction() {
	
	alert("edit");
	// $('.description-content').replaceWith('<textarea name="editor1" id="editor" class="ckeditor" style="width: 100%;">' + $('.description-content').html() +'</textarea>');
	$('.summernote').summernote({
		height: 300,
		tabsize: 2,
		followingToolbar: true,
	});
	
	//tinymce.init({ selector:'textarea.tinymce', plugins: ['code','image','imagetools' ]});
	//new nicEditor({fullPanel : true}).panelInstance('editor');
	
}

// document.getElementById ("preview_call").addEventListener("click", myFunction, false);

// function myFunction() {
//   alert("Hello! I am an alert box!!");
// }


















	
	








