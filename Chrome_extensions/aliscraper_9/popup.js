chrome.runtime.sendMessage({popupOpen: true});
console.log("POPUP js fired");

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      console.log(request);
      if (request.greeting == "hello")
      {
        sendResponse({farewell: "goodbye"});    
      }           
    });

    //Request sending popup.js to background.js 
    var port = chrome.extension.connect({
      name: "Sample Communication"
    });
    // port.postMessage("Hi BackGround! i'M cOMING FROM pop.JS ");
    port.onMessage.addListener(function(msg) {
          console.log(msg);        
    });
  
  

    document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('button').addEventListener('click', loginAction);     
    });

    function loginAction()
    {
      var email = $("#email").val();
      var pwd = $("#pwd").val();      
      obj = {"email":email,"pwd":pwd};
      port.postMessage(obj);
    }
    

  //Request receving from background js to popup js
  chrome.extension.onConnect.addListener(function(port) {      
      port.onMessage.addListener(function(msg) {
           console.log(msg);                     
           port.postMessage('Recevied logged in response');
           notify_user(msg);                      
      });
   });


   function notify_user(status)
   {
      if(status == 200)
      {
        $("#notify").html('<h3><font color="green">Logged in Successfully</font></h3>');
        $("#email").val('');
        $("#pwd").val('');
      }
      else
      {
        $("#notify").html('<span id="error"><b><font color="red">Failed</font></b></span>');
      }
   }