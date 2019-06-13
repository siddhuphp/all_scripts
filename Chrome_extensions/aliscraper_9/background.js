console.log("This is from Back ground js");
const url_bucket = new Array();



  //reciving request from bulk_products.js
  chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      console.log("request receivied by content script");      

      var response_arry = new Array;
      if(request.greeting == "url_adding") //its work on product list
      {
         // console.log(request.url);        
         // console.log(request.status);
         var make_list = url_list_manage(request);
         obj = {
                  yes_recevied: "Yes Recevied",
                  data: make_list                 
               };         
         sendResponse(obj); 
         // data: make_list        
      }
      
      if(request.greeting == "open_urls")
      {
         var url = url_bucket[0];
         obj = {
            yes_recevied: "Yes Recevied from open URLS",
            open_url:url     
         };         
         sendResponse(obj); 
      }

      if(request.greeting == "urls_count")
      {
         obj = {
            yes_recevied: "Given URL's count",      
            urls_count: url_bucket.length,      
            urls: url_bucket  
         };         
         sendResponse(obj); 
      }

      if(request.greeting == "next_url")
      {
         var url = load_next_url(request);
         obj = {
            yes_recevied: "Next URL's loaded",
            open_url:url          
         };         
         sendResponse(obj); 
      }


   });

   function url_list_manage(request)
   {
      console.log(request.url);        
      console.log(request.status);

      // Before pushing URL into url_bucket, first check URL exist or Not
      // If You got request.status = 0, Which means you need to remove this url in url_bucket.(User unselect the product)
      
      if(!isInArray(request.url,url_bucket) && (request.status == 1))
      {
         url_bucket.push(request.url.split("?")[0]);         
      }
      else if(request.status == 0)
      {
         remove_dis_value(request.url);
      }
      console.log(url_bucket);
      return url_bucket;
   }  

   function isInArray(value, array)
   {
      return array.indexOf(value) > -1;
   }

   function remove_dis_value(url)
   {
      for( var i = 0; i < url_bucket.length; i++){ 
         if ( url_bucket[i] === url) {
            url_bucket.splice(i, 1); 
         }
      }
   }


   //reciving request from bulk_products.js
   chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      if (request.msg == "get_urls") 
      {
         sendResponse({status:true,url_bucket:url_bucket}); 
      }

   });

  
   // Below request send data to popup js 
   // Continues 
   chrome.extension.onConnect.addListener(function(port) {
      console.log("Connected .....");
      port.onMessage.addListener(function(msg) {
           console.log("message recieved" + msg);           
           port.postMessage(url_bucket);           
      });
   });


function load_next_url(req)
{
   console.log(req.remove_url);
   remove_dis_value(req.remove_url);
   return url_bucket[0];
}
 
