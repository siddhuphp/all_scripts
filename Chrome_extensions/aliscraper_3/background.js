console.log("Background script running");

/* When web page loads this background script fires the below script, When user hit the chrome extention popup opens
 at the time only backgrouund only this script sends message to content js and popup js. if popup or content send this specific msg, then it
 starts working of their code */
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message.popupOpen)
     {
        console.log("inside background script"); 
       
        chrome.tabs.query({'active': true}, function(tabs) {
            console.log(tabs[0].id);
            let options = {
                msg:"Hello" 
             }
             chrome.tabs.sendMessage(tabs[0].id, options)
             
          });
     }
  });





 