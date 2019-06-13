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


    var port = chrome.extension.connect({
      name: "Sample Communication"
    });
    port.postMessage("Hi BackGround! i'M cOMING FROM pop.JS ");
    port.onMessage.addListener(function(msg) {
          console.log(msg);
          msg.forEach(element => {
            console.log(element);
            $("#urls").append('<div><p>'+element+'</p><button onclick="test()"> Proceed </button></div>');
          });
    });

    function test()
    {
      console.log("Clicked");
    }
  
  

    document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('button').addEventListener('click', loginAction);     
    });

    function loginAction() {
     var email = $("#email").val();
      var pwd = $("#pwd").val();
      console.log(email + pwd);
      port.postMessage(email + pwd);
    }
    


   


   