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
         url_list_manage(request);        
         sendResponse({yes_recevied: "Yes Recevied"});         
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
         url_bucket.push(request.url);
      }
      else if(request.status == 0)
      {
         remove_dis_value(request.url);
      }
      console.log(url_bucket);
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