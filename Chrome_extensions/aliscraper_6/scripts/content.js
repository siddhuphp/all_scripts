chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message){
    console.log(message.msg);
    //below request send data to popup js. 
		chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
			console.log(response.farewell);
		}); 
}




var jQueryScript = document.createElement('script');  
jQueryScript.setAttribute('src','https://cdn.ckeditor.com/4.11.4/standard/ckeditor.js');
document.head.appendChild(jQueryScript);






























	
	








