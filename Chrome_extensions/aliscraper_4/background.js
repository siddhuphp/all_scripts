console.log("Background script running");
var gloabal_given_urls = [];
var gloabal_chunk_urls = [];
var global_res = 1;
var no_of_res = 0;
var gloabal_completed_urls = [];

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
      var not_allow_list_page = false;

      var response_arry = new Array;
      if(request.greeting == "urls_array") //its work on product list
      {
         //console.log(request.msg); 
         g_urls = request.msg;
         g_urls.forEach(function(u){
            gloabal_given_urls.push(u);
         }); 
         response_arry = [{"urls":gloabal_given_urls,"msg":"Im came from urls array"}];
         chunk_dis(gloabal_given_urls,3);
         sendResponse({yes_recevied: response_arry});
         
      }

      


      if (request.greeting == "background") //its work on single product
      {
         // console.log(sender);
         // console.log(sender.tab.url);
         // console.log(sender.tab.id);
         var c_url = sender.tab.url; //Current tab URL value
         var c_tab_id = sender.tab.id; //Current tab Id        
         if (typeof gloabal_given_urls !== 'undefined')
         {
           // console.log(urls); urls array from bulk_product js
           gloabal_given_urls.forEach(function(url){
               if(url == c_url) // checking url matched or not
               {                  
                  //console.log(url+"this url matched");
                  //console.log(request.msg); //send this data to store                 
                 var sts = send_product(request.msg); //send this data to store
                 gloabal_completed_urls.push(url);
                 response_arry = [{"url":url,"status":sts,"global":gloabal_completed_urls}];

                 
                 
                 if(sts)// got response from server then proceed
                 {
                    console.log("i reached here");
                     // Removing url value from urls
                     var index = gloabal_given_urls.indexOf(url);
                     if (index !== -1)
                     {
                        gloabal_given_urls.splice(index, 1); // remove url in current array
                     }
                     chrome.tabs.remove(c_tab_id);
                 }
                 not_allow_list_page = true;
                 no_of_res = no_of_res + 1;
                  if(no_of_res == 3)
                  {
                     no_of_res = 0;
                     gloabal_chunk_urls.shift();
                     global_res = 1;
                     call_dis();
                  }                  
               }
            });
            //console.log(urls);
            if(not_allow_list_page)
            {
               sendResponse({response_insert: response_arry}); 
            }else
            {
               sendResponse({response_insert: null});
            }
            
         }
         else
         {
            sendResponse({response_insert: null});
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

   // chunks array [1,2,3,4,5,6] as [[1,2][3,4][5,6]] if pass chunk_size 2
   function chunkArray(myArray, chunk_size){
      var index = 0;
      var arrayLength = myArray.length;
      var tempArray = [];
      
      for (index = 0; index < arrayLength; index += chunk_size) {
         myChunk = myArray.slice(index, index+chunk_size);
         // Do something if you want with the group
         tempArray.push(myChunk);
      }

      return tempArray;
   }

   
 function chunk_dis(urls,grp_chunk)
 {
   var chun = chunkArray(urls,grp_chunk);
   gloabal_chunk_urls = chun;
   console.log(gloabal_chunk_urls);
   call_dis();   
 }

 
 function call_dis()
 {   
   gloabal_chunk_urls.forEach(function(chunk_grp_arry){   
   if(global_res == 1)
   {
      global_res = 0;
     chunk_grp_arry.forEach(function(url){
       //alert(url);
       window.open(url, '_blank'); // new windows open here
     });
     console.log("here I'm hitting the server");    
   }
 });
 }




 function tst(){
   var xhr = new XMLHttpRequest();
   xhr.open("GET", "https://www.aliexpress.com/item/BIANYILONG-2019-t-shirt-men-Newest-Venom-Marvel-t-shirt-3D-Printed-T-shirts-Men-Women/32972594727.html?spm=2114.search0103.3.9.13351a9788kZlF&ws_ab_test=searchweb0_0,searchweb201602_5_10065_10068_319_10059_10884_317_10887_10696_321_322_10084_453_10083_454_10103_10618_10307_537_536,searchweb201603_52,ppcSwitch_0&algo_expid=a44de6fc-ddc4-4ac1-834d-bbd0ad84acab-1&algo_pvid=a44de6fc-ddc4-4ac1-834d-bbd0ad84acab&transAbTest=ae803_3", true);
   xhr.responseType="document";
   xhr.onreadystatechange = function() {
     if (xhr.readyState == 4) {      
       //console.log(xhr.response);     
       value = document.evaluate('//*[@id="j-product-detail-bd"]/div[1]/div/h1', xhr.response, null, XPathResult.ANY_TYPE, null).iterateNext().textContent;
       //console.log(value);
       //let sku_details = validate_xpath("//div[@class='detail-wrap'][1]/script[1]");
       sku_details = document.evaluate("//div[@class='detail-wrap'][1]/script[1]", xhr.response, null, XPathResult.ANY_TYPE, null).iterateNext().textContent;
       //console.log(sku_details);
       var b = /(?<=skuProducts=)(.*)(?=;)/g.exec(sku_details);
         var SKUVariants=JSON.parse(b[0]);
         console.log(b[0]);
      }
   }
   xhr.send();
 }

 tst();


 function make_data()
 {
   
 }