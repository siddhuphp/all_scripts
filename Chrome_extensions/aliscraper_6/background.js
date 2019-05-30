console.log("This is from Back ground js");
const url_bucket = new Array();
var url_response_aftr_scrape = new Array();


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
         goto_scrape(request.url);
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

  
   // Scrape starts
   function goto_scrape(url)
   {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType="document";
      xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
          if(xhr.response)
          {
             rst = make_scrape(xhr.response);
             console.log(rst);
             url_response_aftr_scrape[url] = rst;
             console.log(url_response_aftr_scrape);                        
          }         
         }
      }
      xhr.send();      
   }


   function make_scrape(document)
   {   
      get_singles = single_value_scrape(document);
      var data = {
         'product_id':get_singles.product_id,
         'product_title':get_singles.product_title,
         'product_price':get_singles.product_price,
         'product_discount_price':get_singles.product_discount_price,
         'product_detail_title':get_singles.product_detail_title,
         'product_detail_sub_title':get_singles.product_detail_sub_title,
         "product_item_list":list_items(document),
         "product_images":get_product_images(document),
         "product_detail_list":get_product_details(document),
         "product_sku_details":get_sku_details(document),
         "product_package_details":get_package_details(document),
         "product_sold_by_details":get_sold_by(document),
         "product_breadcrumb_details":get_breadcrumb_details(document),
      };
      // console.log(data);
      return data;
   }


   function single_value_scrape(document)
   {
      let product_id = validate_xpath('//*[@id="hid-product-id"]/@value',document);
      let product_title = validate_xpath('//*[@id="j-product-detail-bd"]/div[1]/div/h1',document);
      let product_price = validate_xpath('//*[@id="j-sku-price"]',document);
      let product_discount_price = validate_xpath('//*[@id="j-sku-discount-price"]',document);
      let product_detail_title = validate_xpath('//div[@class="main-content"]/div[@id="j-product-tabbed-pane"]/ul/li[1]/a',document);
      let product_detail_sub_title = validate_xpath('//div[@class="main-content"]/div[@id="j-product-tabbed-pane"]/div/div/div/div[2]/div[@class="ui-box-title"]',document);

      var response_obj = {
         'product_id':product_id,
         'product_title':product_title,
         'product_price':product_price,
         'product_discount_price':product_discount_price,
         'product_detail_title':product_detail_title,
         'product_detail_sub_title':product_detail_sub_title,         
      };      
      return response_obj;
   }

   function list_items(nDocument)
   {
       if(validate_xpath_only('//*[@id="j-product-info-sku"]',nDocument)) // check exist or not
      {
         // take list of item options
         var iterator = document.evaluate('//*[@id="j-product-info-sku"]/dl/dt', nDocument, null, XPathResult.ANY_TYPE, null );
         
         try {
         var thisNode = iterator.iterateNext();
         var list_items = [];		  
         var i = 1; // why one means. To pass value in xpath
         while (thisNode) {
                  if(thisNode.textContent !== null && thisNode.textContent !== '') {
                  list_items[i] = thisNode.textContent;
                  thisNode = iterator.iterateNext();
                     i++;
                  }
            } 
         }
         catch (e) {
         console.log( 'Error: Document tree modified during iteration ' + e );
         }		
         // console.log(list_items);
      // console.log(list_item_details(list_items));
      return list_item_details(list_items,nDocument);
      }
   }

   function list_item_details(list_items,nDocument)
   {
      var final_list_items = [];
      list_items.forEach(function(value,key) {        
         // alert("key = "+key+ ": value = "+value);        
         // console.log("key = "+key+ ": value = "+value);        
         final_list_items.push({
            item_name: value, 
            item_type: check_type(key,nDocument),
            item_values: get_item_values(key,nDocument),
         });         
      });
      return final_list_items;
   }

   function check_type(key,nDocument)
   {
      type = null;
      if(nDocument)
      {
         if(validate_xpath_only('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li/a/img/@src',nDocument))
         {
            type = "IMAGE";
         }
         else if(validate_xpath_only('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li/a/span',nDocument))
         {
            type = "TEXT";
         }
      }     
      return type;
   }


   function get_item_values(key,nDocument)
   {
      if(check_type(key,nDocument) == "IMAGE")
      {
         return get_images_data(key,nDocument);
      }
      else if(check_type(key,nDocument) == "TEXT")
      {
         return get_text_data(key,nDocument);
      }
   }

   function get_images_data(key,nDocument)
   {
      var iterator = document.evaluate('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li/a/img/@src', nDocument, null, XPathResult.ANY_TYPE, null );
      try {
               var thisNode = iterator.iterateNext();
               var list_items = [];		  
               var i = 0; var j = 1;
               while (thisNode) {
                     if(thisNode.textContent !== null && thisNode.textContent !== '') {
                     var id = validate_xpath('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li['+j+']/a/@id',nDocument);
                     var data_sku_id = validate_xpath('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li['+j+']/a/@data-sku-id',nDocument);
                     var title = validate_xpath('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li['+j+']/a/@title',nDocument);

                     make_list_obj = {
                                                "img":thisNode.textContent,
                                                "id":id,
                                                "data_sku_id":data_sku_id,
                                                "title":title,
                                             };	

                     list_items[i] = make_list_obj;
                     thisNode = iterator.iterateNext();
                        i++; j++;
                     }
                  } 
         }
         catch (e) {
         console.log( 'Error: Document tree modified during iteration ' + e );
         }
         return list_items;
   }

   function get_text_data(key,nDocument)
   {
      var iterator = document.evaluate('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li/a/span', nDocument, null, XPathResult.ANY_TYPE, null );
      try {
         var thisNode = iterator.iterateNext();
         var list_items = [];		  
         var i = 0; var j = 1;
         while (thisNode) {
                  if(thisNode.textContent !== null && thisNode.textContent !== '') {
                     var id = validate_xpath('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li['+j+']/a/@id',nDocument);
                     var data_sku_id = validate_xpath('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li['+j+']/a/@data-sku-id',nDocument);
                  

                     make_list_obj = {
                                                "text":thisNode.textContent,
                                                "id":id,
                                                "data_sku_id":data_sku_id															
                                             };	

                  list_items[i] = make_list_obj;					
                  thisNode = iterator.iterateNext();
                  i++; j++;
                  }
            } 
         }
         catch (e) {
         console.log( 'Error: Document tree modified during iteration ' + e );
         }
         return list_items;
   }

   function get_product_images(nDocument)
   {
      var list_items = null;
      if(validate_xpath_only('//*[@id="j-image-thumb-list"]/li/span/img/@src',nDocument)) // check exist or not
      {
         var iterator = document.evaluate('//*[@id="j-image-thumb-list"]/li/span/img/@src', nDocument, null, XPathResult.ANY_TYPE, null );
         try {
            var thisNode = iterator.iterateNext();
            var list_items = [];	 
            var i = 0; 
            while (thisNode) {
                     if(thisNode.textContent !== null && thisNode.textContent !== '') {
                        list_items[i] = thisNode.textContent;					
                        thisNode = iterator.iterateNext();
                        i++; 
                     }
               } 
            }
            catch (e) {
            console.log( 'Error: Document tree modified during iteration ' + e );
         }
      }
      return list_items;
   }

   function get_product_details(nDocument)
   {
      var iterator = document.evaluate('//div[@class="main-content"]/div[@id="j-product-tabbed-pane"]/div/div/div/div[2]/div[2]/ul/li', nDocument, null, XPathResult.ANY_TYPE, null );
      try {
         var thisNode = iterator.iterateNext();
         var list_items = [];		  
         var i = 0; var j = 1;
         while (thisNode) {
                  if(thisNode.textContent !== null && thisNode.textContent !== '') {
                     var key = validate_xpath('//div[@class="main-content"]/div[@id="j-product-tabbed-pane"]/div/div/div/div[2]/div[2]/ul/li['+j+']/span[1]',nDocument);
                     var value = validate_xpath('//div[@class="main-content"]/div[@id="j-product-tabbed-pane"]/div/div/div/div[2]/div[2]/ul/li['+j+']/span[2]',nDocument);
                  

                     make_list_obj = {
                                                "full_text":thisNode.textContent,
                                                "key":key,																												
                                                "value":value,																												
                                             };	

                  list_items[i] = make_list_obj;					 
                  thisNode = iterator.iterateNext();
                     i++; j++;
                  }
            } 
         }
         catch (e) {
         console.log( 'Error: Document tree modified during iteration ' + e );
         }
         return list_items;
   }

   function get_sku_details(nDocument){	
      response_obj = { "status":false}	
      if(validate_xpath_only("//div[@class='detail-wrap'][1]/script[1]",nDocument))
      {
         sku_details = document.evaluate("//div[@class='detail-wrap'][1]/script[1]", nDocument, null, XPathResult.ANY_TYPE, null).iterateNext().textContent;
         //console.log(sku_details);
         var sku_data = /(?<=skuProducts=)(.*)(?=;)/g.exec(sku_details);			
         // console.log(sku_data[0]);
         var sizing_info =  /(?<=window.runParams.title=)(.*)(?=;)/g.exec(sku_details);
         response_obj = {
            "status":true,
            "sku_details":sku_data[0],
            "sizing_details":sizing_info[0],
         }
      }		
      return response_obj;
         
   }

   function get_package_details(nDocument)
   {
      var iterator = document.evaluate('//div[@class="ui-box pnl-packaging-main"]/div[2]/ul[1]/li/span[@class="packaging-title"]', nDocument, null, XPathResult.ANY_TYPE, null );
      try {
         var thisNode = iterator.iterateNext();
         var list_items = [];		  
         var i = 0; var j = 1;
         while (thisNode) {				  
                  if(thisNode.textContent !== null && thisNode.textContent !== '') {
                     var value = validate_xpath('//div[@class="ui-box pnl-packaging-main"]/div[2]/ul[1]/li['+j+']/span[@class="packaging-des"]', nDocument);
                        make_list_obj = {
                                                   "key":thisNode.textContent,																																											
                                                   "value":value,																												
                                                };	

                  list_items[i] = make_list_obj;					 
                  thisNode = iterator.iterateNext();
                     i++; j++;
                  }
            } 
         }
         catch (e) {
         console.log( 'Error: Document tree modified during iteration ' + e );
         }
         return list_items;
   }

   function get_sold_by(nDocument)
   {
         var sold_by = validate_xpath('//div[@class="store-info-wrap"]/dl/dd/a',nDocument);
         var url = validate_xpath('//div[@class="store-info-wrap"]/dl/dd/a/@href',nDocument);
         var addr = validate_xpath('//div[@class="store-info-wrap"]/dl/dd[@class="store-address"]',nDocument);

         response_obj = {
               "sold_by":sold_by,
               "url":url,
               "address":addr,
         }

         return response_obj;
   }

   function get_breadcrumb_details(nDocument)
   {
      var iterator = document.evaluate('//div[@class="ui-breadcrumb"]/div[@class="container"]/a', nDocument, null, XPathResult.ANY_TYPE, null );
      try {
         var thisNode = iterator.iterateNext();
         var list_items = [];		  
         var i = 0;
         while (thisNode) {				  
                  if(thisNode.textContent !== null && thisNode.textContent !== '') {
                  list_items[i] = thisNode.textContent;					 
                  thisNode = iterator.iterateNext();
                     i++; 
                  }
            } 
         }
         catch (e) {
         console.log( 'Error: Document tree modified during iteration ' + e );
         }
         var last = validate_xpath('//div[@class="ui-breadcrumb"]/div[@class="container"]/h2',nDocument);
         list_items.push({"last":last});
         // console.log(list_items);
         return list_items;
   }

   function validate_xpath(xpath,nDocument)
   {
      var chk = document.evaluate(xpath, nDocument, null, XPathResult.ANY_TYPE, null).iterateNext() instanceof Node;  
      if(chk == true)
      {
         value = document.evaluate(xpath, nDocument, null, XPathResult.ANY_TYPE, null).iterateNext().textContent;
      }
      else
      {
         value = null;
      }
      return value;
   }

   function validate_xpath_only(xpath,nDocument)
   {
      return document.evaluate(xpath, nDocument, null, XPathResult.ANY_TYPE, null).iterateNext() instanceof Node;  
   }

  


  