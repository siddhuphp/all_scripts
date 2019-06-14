function goto_login(email,pwd)
{
   var data = JSON.stringify({
      "email": email,
      "password": btoa(pwd)
   });
   
   var xhr = new XMLHttpRequest();
   xhr.withCredentials = true;
   
   xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
         console.log(this.responseText);       
      }
      sent_to_response_to_popjs(xhr.status);
   });
   
   xhr.open("POST", "http://glocalkart.australiasoutheast.cloudapp.azure.com/api/token/create");
   xhr.setRequestHeader("Content-Type", "application/json","charset=utf8");
   xhr.setRequestHeader("Access-Control-Allow-Origin", "*"); 
   xhr.send(data);  
}





// Below request send data to popup js 
   // Continues 
   chrome.extension.onConnect.addListener(function(port) {
      console.log("Connected .....");
      port.onMessage.addListener(function(msg) {
         //   console.log(msg);
         //   console.log(msg.email);
         //   console.log(msg.pwd);
            if(msg.email && msg.pwd)
            {
               goto_login(msg.email,msg.pwd);
               port.postMessage('Logged in request Sent');
            }                                 
      });
   });


   //Background js to popup js request sending
   function sent_to_response_to_popjs(status)
   {
      var port = chrome.extension.connect({
         name: "background_to_popup"
       });
       port.postMessage(status);
       port.onMessage.addListener(function(msg) {
             console.log(msg);        
       });
   }