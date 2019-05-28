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
        $("#product_id").text(request.final.product_id);
        $("#product_title").text(request.final.product_title);
        $("#product_price").text(request.final.product_price);
        $("#product_discount_price").text(request.final.product_discount_price); 

        $.each(request.final.product_images, function( index, value ) {
            $("#product_images").append('<img src="'+value+'">&nbsp;&nbsp;');
          });
          
          
          $.each(request.final.product_item_list, function( index, value ) {                      
            if(value.item_values)
            {
              $.each(value.item_values, function( k, v ) {
                if(value.item_type == "TEXT")
                {
                  $("#product_text").text(value.item_name);
                  $("#text_type").text('Item Type:'+value.item_type);
                  $("#product_text_details  tr:last").after(`<tr>
                                                    <td>`+v.text+`</td>                                                    
                                                    <td> `+v.id+` </td>
                                                    <td> `+v.data_sku_id+` </td>                                                    
                                                  </tr>`
                                                );
                }
                else if(value.item_type == "IMAGE")
                {
                  $("#product_image").text(value.item_name);
                  $("#image_type").text('Item Type:'+value.item_type);
                  $("#product_image_details  tr:last").after(`<tr>
                                                    <td><img src='`+v.img+`'/></td>                                                    
                                                    <td> `+v.id+` </td>
                                                    <td> `+v.data_sku_id+` </td> 
                                                    <td> `+v.title+` </td>
                                                  </tr>`
                                                );
                }                
              });
            }
            //$("#products_item_options").append('<p><b>Item Type: </b>'+value.item_type+'</p>');
          });         

          // Product details
          $("#product_details_list_text").text(request.final.product_detail_title);
          $("#product_details_list_text_type").text(request.final.product_detail_sub_title);
          $.each(request.final.product_detail_list, function( index, value ) {
            $("#product_details_list  tr:last").after(`<tr>
                                                    <td>`+value.key+`</td>                                                    
                                                    <td> `+value.value+` </td>                                                   
                                                  </tr>`
                                                );
          });
          
          //India Shipping Details
          if(request.final.product_id)
          {
            $.ajax({
              url: "https://freight.aliexpress.com/ajaxFreightCalculateService.htm?productid="+request.final.product_id+"&country=IN",
              type: 'GET',
              contentType: "application/json; charset=utf-8", 
              dataType: "html",           
              success: function( res ) {
                // covert string format to json              
               var a =  JSON.parse(res.replace(/[()]/g, ''));
               $("#products_item_options").append( make_shipping_details_frame(a) );             
              }
            });
          }
      }

      $("#sizing_info").append( make_sizing_info_frame(request.final.product_sku_details.sizing_details) );
      $("#package_info").append( make_package_info_frame(request.final.product_package_details) );
      $("#sold_by_info").append( make_sold_by_info_frame(request.final.product_sold_by_details) );
      $("#breadcrumb_info").append( make_breadcrumb_info_frame(request.final.product_breadcrumb_details) );
     
        
    });


    function make_shipping_details_frame(data)
    {
        var html = '<table style="width:100%"><tr><th>Shipping Company</th><th>Shipping Cost</th><th>Estimated Delivery Time</th><th>Tracking Information</th></tr>';
        if(data)
        {
          
           $.each(data['freight'], function( index, value ) {
            html += '<tr><td>'+value.companyDisplayName+'</td>';
            html += '<td>'+value.localPriceFormatStr+'</td>';
            html += '<td>'+value.time+' days </td>';
            var isTracked = (value.isTracked == true)?"Available":"NO";
            html += '<td>'+isTracked+'</td></tr>';
           });

        }       
        html += '</table>';
        return html;
    }

    function make_sizing_info_frame(data)
    {
        var html = '<table style="width:100%">';       
        data = JSON.parse(data); //convert string to json object           
                   
        if(data)
        {         
          html += '<tr>';
          $.each(data.sizeAttr.title, function( k, v ) {
            html += '<th>'+v+'</th>';
          });
          html += '</tr>';

          
           $.each(data.sizeAttr.list, function( index, value ) {
            html += '<tr>';
            html += '<td>'+value[0]+'</td>';
            html += '<td>'+value[1]+'</td>';
            html += '<td>'+value[2]+'</td>';
            html += '<td>'+value[3]+'</td>';
            html += '<td>'+value[4]+'</td>';
            html += '</tr>';
           });
         

        }       
        html += '</table>';
        return html;
    }

    function make_package_info_frame(data)
    {
        var html = '<table style="width:100%">';       
        //data = JSON.parse(data); //convert string to json object           
                 
        if(data)
        {
          html += '<tr><th colspan="2"> Package Details </th></tr>';
          html += '<tr>';          
          html += '<th> Keys </th>';         
          html += '<th> Values </th>';         
          html += '</tr>';

          
           $.each(data, function( index, value ) {
             if((value.key != null) && (value.value != null))
             {
              html += '<tr>';
              html += '<td>'+value.key+'</td>';
              html += '<td>'+value.value+'</td>';           
              html += '</tr>';
             }
            
           });
         

        }       
        html += '</table>';
        return html;
    }


    function make_sold_by_info_frame(data)
    {
        var html = '<table style="width:100%">';       
        //data = JSON.parse(data); //convert string to json object           
                   
        if(data)
        {
          html += '<tr><th colspan="2"> Sold by </th></tr>';
          html += '<tr>';          
          html += '<th> Sold by </th>';         
          html += '<th> URL </th>';         
          html += '<th> Address </th>';         
          html += '</tr>';
         
              html += '<tr>';
              html += '<td>'+data.sold_by+'</td>';
              html += '<td>'+data.url+'</td>';           
              html += '<td>'+data.address+'</td>';           
              html += '</tr>';
        }       
        html += '</table>';
        return html;
    }


    function make_breadcrumb_info_frame(data)
    {
        var html = '<table style="width:100%">';       
        //data = JSON.parse(data); //convert string to json object           
        console.log(data);           
        if(data)
        {
          html += '<tr><th> bread crumb </th></tr>';        
          $.each(data, function( index, value ) {
            if(typeof value != 'object')
            {
              html += '<tr>';                     
              html += '<td>'+value+'</td>';           
              html += '</tr>';
            }else if(typeof value === 'object')
            {
              html += '<tr>';                     
              html += '<td>'+value.last+'</td>';           
              html += '</tr>';
            }
            
          });
        }       
        html += '</table>';
        return html;
    }