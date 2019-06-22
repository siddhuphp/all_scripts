console.log(" Scraper Js running ");


function products(){

    let product_title = validate_xpath('//*[@id="j-product-detail-bd"]/div[1]/div/h1');
    let product_price = validate_xpath('//*[@id="j-sku-price"]');
    let product_discount_price = validate_xpath('//*[@id="j-sku-discount-price"]');
    let product_meta_keywords = validate_xpath('//html/head/meta[@name="keywords"]/@content');
    let product_meta_description = validate_xpath('//html/head/meta[@name="description"]/@content');
    let product_detail_title = validate_xpath('//div[@class="main-content"]/div[@id="j-product-tabbed-pane"]/ul/li[1]/a');
    let product_detail_sub_title = validate_xpath('//div[@class="main-content"]/div[@id="j-product-tabbed-pane"]/div/div/div/div[2]/div[@class="ui-box-title"]');
    let product_id = ($("#hid-product-id").val())?($("#hid-product-id").val()):0;
    //console.log("product_title"+product_title + "product_price"+product_price + "product_discount_price"+product_discount_price);
    
    let product_images = new Array();
      $("#j-image-thumb-list img").map(function() {
        product_images.push($(this).attr("src"));
      });
     // console.log(product_images);
    
    
      var data = {
          "product_id":product_id,
          "product_title":product_title,
          "product_price":product_price,
          "product_discount_price":product_discount_price,
          "product_images":product_images,
          "product_item_list":list_items(),
          "product_detail_title":product_detail_title,
          "product_detail_sub_title":product_detail_sub_title,
          "product_detail_list":get_product_details(),
          "product_sku_details":get_sku_details(),      
          "product_package_details":get_package_details(),      
          "product_sold_by_details":get_sold_by(),
          "product_breadcrumb_details":get_breadcrumb_details(),
          "product_meta_keywords":product_meta_keywords,
          "product_meta_description":product_meta_description,
        };
        // console.log(data);
        return data;	
    }

    // This is for item list details
    function list_items()
    {
        if(validate_xpath_only('//*[@id="j-product-info-sku"]')) // check exist or not
        {
            // take list of item options
            var iterator = document.evaluate('//*[@id="j-product-info-sku"]/dl/dt', document, null, XPathResult.ANY_TYPE, null );
            
            try {
            var thisNode = iterator.iterateNext();
            var list_items = [];		  
            var i = 1;
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
        return list_item_details(list_items);
        }
    }


    function list_item_details(list_items)
    {
        var final_list_items = [];
        list_items.forEach(function(value,key) {
            //console.log("key = "+key+ ": value = "+value);
            final_list_items.push({
                item_name: value, 
                item_type: check_type(key),
                item_values: get_item_values(key),
            });
        });
        return final_list_items;
    }


    function check_type(key)
    {
        type = null;
        if(validate_xpath_only('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li/a/img/@src'))
        {
            type = "IMAGE";
        }
        else if(validate_xpath_only('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li/a/span'))
        {
            type = "TEXT";
        }
        return type;
    }


    function get_item_values(key)
    {
        if(check_type(key) == "IMAGE")
        {
            return get_images_data(key);
        }
        else if(check_type(key) == "TEXT")
        {
            return get_text_data(key);
        }
    }

    function get_images_data(key)
    {
        var iterator = document.evaluate('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li/a/img/@src', document, null, XPathResult.ANY_TYPE, null );
        try {
                    var thisNode = iterator.iterateNext();
                    var list_items = [];		  
                    var i = 0; var j = 1;
                    while (thisNode) {
                            if(thisNode.textContent !== null && thisNode.textContent !== '') {
                            var id = validate_xpath('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li['+j+']/a/@id');
                            var data_sku_id = validate_xpath('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li['+j+']/a/@data-sku-id');
                            var title = validate_xpath('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li['+j+']/a/@title');

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

    function get_text_data(key)
    {
        var iterator = document.evaluate('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li/a/span', document, null, XPathResult.ANY_TYPE, null );
        try {
            var thisNode = iterator.iterateNext();
            var list_items = [];		  
            var i = 0; var j = 1;
            while (thisNode) {
                        if(thisNode.textContent !== null && thisNode.textContent !== '') {
                            var id = validate_xpath('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li['+j+']/a/@id');
                            var data_sku_id = validate_xpath('//*[@id="j-product-info-sku"]/dl['+key+']/dd/ul/li['+j+']/a/@data-sku-id');
                        

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



    function get_product_details()
    {
        var iterator = document.evaluate('//div[@class="main-content"]/div[@id="j-product-tabbed-pane"]/div/div/div/div[2]/div[2]/ul/li', document, null, XPathResult.ANY_TYPE, null );
        try {
            var thisNode = iterator.iterateNext();
            var list_items = [];		  
            var i = 0; var j = 1;
            while (thisNode) {
                        if(thisNode.textContent !== null && thisNode.textContent !== '') {
                            var key = validate_xpath('//div[@class="main-content"]/div[@id="j-product-tabbed-pane"]/div/div/div/div[2]/div[2]/ul/li['+j+']/span[1]');
                            var value = validate_xpath('//div[@class="main-content"]/div[@id="j-product-tabbed-pane"]/div/div/div/div[2]/div[2]/ul/li['+j+']/span[2]');
                        

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


    function get_sku_details()
    {	
        response_obj = { "status":false}	
        if(validate_xpath_only("//div[@class='detail-wrap'][1]/script[1]"))
        {
            sku_details = document.evaluate("//div[@class='detail-wrap'][1]/script[1]", document, null, XPathResult.ANY_TYPE, null).iterateNext().textContent;
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

    function get_package_details()
    {
        var iterator = document.evaluate('//div[@class="ui-box pnl-packaging-main"]/div[2]/ul[1]/li/span[@class="packaging-title"]', document, null, XPathResult.ANY_TYPE, null );
        try {
            var thisNode = iterator.iterateNext();
            var list_items = [];		  
            var i = 0; var j = 1;
            while (thisNode) {				  
                        if(thisNode.textContent !== null && thisNode.textContent !== '') {
                            var value = validate_xpath('//div[@class="ui-box pnl-packaging-main"]/div[2]/ul[1]/li['+j+']/span[@class="packaging-des"]');
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

    function get_sold_by()
    {
            var sold_by = validate_xpath('//div[@class="store-info-wrap"]/dl/dd/a');
            var url = validate_xpath('//div[@class="store-info-wrap"]/dl/dd/a/@href');
            var addr = validate_xpath('//div[@class="store-info-wrap"]/dl/dd[@class="store-address"]');

            response_obj = {
                    "sold_by":sold_by,
                    "url":url,
                    "address":addr,
            }

            return response_obj;
    }

    function get_breadcrumb_details()
    {
        var iterator = document.evaluate('//div[@class="ui-breadcrumb"]/div[@class="container"]/a', document, null, XPathResult.ANY_TYPE, null );
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
            var last = validate_xpath('//div[@class="ui-breadcrumb"]/div[@class="container"]/h2');
            list_items.push({"last":last});
            // console.log(list_items);
            return list_items;
    }

    products();