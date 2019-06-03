chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message){
    console.log(message.msg);
    //below request send data to popup js. 
		chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
			console.log(response.farewell);
		}); 
}


// var jQueryScript = document.createElement('script');  
// jQueryScript.setAttribute('src','https://cdn.ckeditor.com/4.11.4/standard/ckeditor.js');
// document.head.appendChild(jQueryScript);





var dd = getElementByXpath("//div[@id='j-product-description']/div[@class='ui-box-title']");
dd.insertAdjacentHTML('beforeend', '<button id="editor_call"> Edit </button> &nbsp; &nbsp; &nbsp; <button id="preview_call"> Preview </button>');



function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}




document.getElementById ("editor_call").addEventListener("click", myFunction, false);

function myFunction() {
	//' + $('.description-content').html() +'
	alert("edit");
	$('.description-content').replaceWith('<textarea name="editor1" id="editor" class="ckeditor"></textarea>');
	//CKEDITOR.replace( 'editor1' );
}

// document.getElementById ("preview_call").addEventListener("click", myFunction, false);

// function myFunction() {
//   alert("Hello! I am an alert box!!");
// }


















	
	








