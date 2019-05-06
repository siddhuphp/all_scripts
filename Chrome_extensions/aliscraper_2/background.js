console.log("Background script running");


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


 