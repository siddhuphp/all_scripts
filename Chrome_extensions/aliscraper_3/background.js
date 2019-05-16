console.log("Background script running");


/* When web page loads this background script fires the below script, When user hit the chrome extention popup opens
 at the time only background only this script sends message to content js and popup js. if popup or content send this specific msg, then it
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



  //reciving request from bulk_products.js
  chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      console.log("request receivied by content script");

      var response_arry = new Array;
      if(request.greeting == "urls_array")
      {
         //console.log(request.msg); 
         urls = request.msg; 
         response_arry = [{"urls":urls,"msg":"Im came from urls array"}];
         sendResponse({yes_recevied: response_arry}); 
      }


      if (request.greeting == "background")
      {
         // console.log(sender);
         // console.log(sender.tab.url);
         // console.log(sender.tab.id);
         var c_url = sender.tab.url; //Current tab URL value
         var c_tab_id = sender.tab.id; //Current tab Id
         if (typeof urls !== 'undefined')
         {
           // console.log(urls); urls array from bulk_product js
            urls.forEach(function(url){
               if(url == c_url) // checking url matched or not
               {                  
                  //console.log(url+"this url matched");
                  //console.log(request.msg); //send this data to store                 
                 var sts = send_product(request.msg); //send this data to store
                 response_arry = [{"url":url,"status":sts}];
                 
                 
                 if(sts)// got response from server then proceed
                 {
                    console.log("i reached here");
                     // Removing url value from urls
                     var index = urls.indexOf(url);
                     if (index !== -1)
                     {
                        urls.splice(index, 1); // remove url in current array
                     }
                     chrome.tabs.remove(c_tab_id);
                 }                  
               }
            });
            //console.log(urls);
            sendResponse({yes_recevied: response_arry}); 
         }
                 
         // console.log(request);
         //console.log(request.msg);        
         // console.log(JSON.stringify(request.msg));  //to copy json code in console.log
         //chrome.tabs.remove(sender.tab.id);  // this is used for close the tab
         
         
      }      
   });


   function send_product(details) // send product details to server
   {
      if(details)
      {
         console.log(details); //here we hit the server
         status = true;
      }
      else
      {
         status = false;
      }
      return status;
   }

   


 





 