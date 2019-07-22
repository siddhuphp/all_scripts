var global_token = "";
var categories = {};
var g_AttributeSetProductTypes = {};
var manfactures = {};
var wareHouseInternalName = '';
var attrbutes = [];


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
         global_token = this.responseText;
         get_categories_list(global_token);               
         get_manfacture_list(global_token);               
         get_vendor_details(global_token);               
         get_attributes_list(global_token);               
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

   //reciving request from content.js
   chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
         if (request.msg == "get_manf_cate") 
         {            
            sendResponse({status:true,cate:categories,manf:manfactures,attrProType:g_AttributeSetProductTypes,wareHouseInternalName:wareHouseInternalName}); 
         }   
         if (request.msg == "get_attributes") 
         {            
            // console.log(request.value);
            // console.log(g_AttributeSetProductTypes);
            // console.log(JSON.stringify(g_AttributeSetProductTypes));           
            // console.log(g_AttributeSetProductTypes[request.value].value);
            v = g_AttributeSetProductTypes[request.value].value;
            get_attributes_from_id(v, sendResponse );           
               return true; 
                      
         }
         if (request.msg == "product_data_from_scraping") 
         {            
            product_submit_process(request.data, sendResponse); 
         }  
         
   });


function get_manfacture_list(token)
{
   if(token)
   {
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function () {
         if (this.readyState === 4) {
            console.log(this.responseText);           
            if(this.response)
            {
               var s = JSON.parse(this.response);
               s.value.forEach(function(v,k){
                  // console.log(v.Name);
                  // console.log(v.Id);
                  manfactures[k] = {"key":v.InternalName,"value":v.Name};
               });
            }       
         }         
      });
      
      xhr.open("GET", "http://glocalkart.australiasoutheast.cloudapp.azure.com/odata/manufacturer");
      xhr.setRequestHeader("Authorization", "Bearer "+token);
      xhr.setRequestHeader("Content-Type", "application/json","charset=utf8");
      xhr.setRequestHeader("Access-Control-Allow-Origin", "*"); 
      xhr.send();
   }
   else
   {
      return false;
   }    
}

function get_vendor_details(token)
{
   if(token)
   {
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function () {
         if (this.readyState === 4) {
            console.log(this.responseText);           
            if(this.response)
            {
               var s = JSON.parse(this.response);
               console.log(s.WarehouseList);
               if(s.WarehouseList)
               {
                  d = s.WarehouseList.sort(function(a, b){ //sorting by Priority for take lowest value, and take that Warehouse name 
                     return a.Priority-b.Priority
                 });
                 wareHouseInternalName = d[0].Warehouse;
               }               
            }       
         }         
      });
      
      xhr.open("GET", "http://glocalkart.australiasoutheast.cloudapp.azure.com/odata/vendor/ravi_vendor");
      xhr.setRequestHeader("Authorization", "Bearer "+token);
      xhr.setRequestHeader("Content-Type", "application/json","charset=utf8");
      xhr.setRequestHeader("Access-Control-Allow-Origin", "*"); 
      xhr.send();
   }
   else
   {
      return false;
   }    
}

function get_categories_list(token)
{
   if(token)
   {
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function () {
         if (this.readyState === 4) {
            console.log(this.responseText);            
            if(this.response)
            {
               var s = JSON.parse(this.response);
                 s.value.forEach(function(v,k){
                  // console.log(v.Name);
                  // console.log(v.Id);                  
                  //  console.log(v.AttributeSetProductTypes.AttributeDataSetId);                  
                  categories[k] = {"key":v.InternalName,"value":v.Name};
                  if(v.AttributeSetProductTypes)
                  {
                     var att_data_set_id = get_AttributeDataSetId(v.AttributeSetProductTypes);
                     g_AttributeSetProductTypes[v.InternalName] = {"value":att_data_set_id};
                  }
                  
               });
            }     
         }         
      });
      
      xhr.open("GET", "http://glocalkart.australiasoutheast.cloudapp.azure.com/odata/category");
      xhr.setRequestHeader("Authorization", "Bearer "+token);
      xhr.setRequestHeader("Content-Type", "application/json","charset=utf8");
      xhr.setRequestHeader("Access-Control-Allow-Origin", "*"); 
      xhr.send();
   }
   else
   {
      return false;
   }   
     
}

function get_attributes_list(token)
{
   if(token)
   {
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function () {
         if (this.readyState === 4) {
            console.log(this.responseText);            
            if(this.response)
            {
               var s = JSON.parse(this.response);
               
            }     
         }         
      });
      
      xhr.open("GET", "http://glocalkart.australiasoutheast.cloudapp.azure.com/odata/AttributeDataSet");
      xhr.setRequestHeader("Authorization", "Bearer "+token);
      xhr.setRequestHeader("Content-Type", "application/json","charset=utf8");
      xhr.setRequestHeader("Access-Control-Allow-Origin", "*"); 
      xhr.send();
   }
   else
   {
      return false;
   }    
}


// You need to take 'SimpleProduct' ProductType only. For that below function will return that Id only :)
function get_AttributeDataSetId(data)
{
   if(data)
   {
      console.log(data);
      data.forEach(function(v,k){        
            if(v.ProductType == 'SimpleProduct')
            {
               id =  v.AttributeDataSetName;
            }
         });
   }
   else
   {
     id = null;
   }
   return id;
}


function get_attributes_from_id(v, sendResponse)
{
   if(v)
   {
      if(global_token)
      {
         var xhr = new XMLHttpRequest();
         xhr.withCredentials = true;
         
         xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
               console.log(this.responseText);           
               if(this.response)
               {
                  var s = JSON.parse(this.response);
                  attrbutes.push(s); 
                  sendResponse({status:true,attr:s});                                         
               }       
            }         
         });
         
         xhr.open("GET", "http://glocalkart.australiasoutheast.cloudapp.azure.com/odata/AttributeDataSet/"+v);
         xhr.setRequestHeader("Authorization", "Bearer "+global_token);
         xhr.setRequestHeader("Content-Type", "application/json","charset=utf8");
         xhr.setRequestHeader("Access-Control-Allow-Origin", "*"); 
         xhr.send();
      }
      else
      {
         return false;
      } 
   }    
}



/* 
   Product submit process

   You need to check productAttributesValues exist or not before hitting product submit.

   If productAttributesvalues not exit, You can add those values using 'PATCH' concept.
    After update only you can submit the product, bcoz it will generate error attributesvalues are not matched

   Here I'm bring 'ajax_check_proAttr_and_proAttrVal' from client side to check productAttributesValues easily.



    
*/

function product_submit_process(pro_data, sendResponse)
{
   if(pro_data)
   {
      // console.log(pro_data);
      var s = JSON.parse(pro_data);
      check_attribute_and_create(s);
      sendResponse({status:true,datas:s.ajax_check_proAttr_and_proAttrVal});//later work
          
   }
}


function check_attribute(productIntenal,attrInternalNAme,data)
{
   if(productIntenal,attrInternalNAme,data)
   {
      if(global_token)
      {
        return $.ajax({
            //url:"http://glocalkart.australiasoutheast.cloudapp.azure.com/odata/productattribute('"+attr+"')",
            url:"http://glocalkart.australiasoutheast.cloudapp.azure.com/odata/ProductAttribute('"+productIntenal+"')/UpsertProductAttributeValue?InternalName="+attrInternalNAme,
            headers: {
               'Authorization':"Bearer "+global_token,               
               'Content-Type':'application/json'
           },
            type: "POST",
            data:data,
            dataType: "json",           
         });  
      }   
      else
      {
         return false;
      } 
   }    
}


function check_attribute_and_create(s)
{
   /* 
      This function will change the 'ProductAttributeInternalName' value based on 'get_attributes_of_user_select'
      As well as it's change the 'ajax_check_proAttr_and_proAttrVal' object key name for preparing ajax call to check.

   */

   if(s)
   {
      //console.log(s.get_attributes_of_user_select);
      //console.log(s.ProductAttributes[0].ProductAttributeInternalName);

      if(s.get_attributes_of_user_select)
      {
         s.get_attributes_of_user_select.forEach(function(v,k){
            // console.log(v,k);
            //console.log(s.ProductAttributes[k].ProductAttributeInternalName);
            //console.log(s.ajax_check_proAttr_and_proAttrVal[s.ProductAttributes[k].ProductAttributeInternalName]);
            z = s.ajax_check_proAttr_and_proAttrVal[s.ProductAttributes[k].ProductAttributeInternalName];
            s.ajax_check_proAttr_and_proAttrVal[v] = z;
            delete s.ajax_check_proAttr_and_proAttrVal[s.ProductAttributes[k].ProductAttributeInternalName];
            s.ProductAttributes[k].ProductAttributeInternalName = v;
            add_or_update_productAttrVals(v,z);
         });
      }
      // console.log(s.ProductAttributes);
      // console.log(s.ajax_check_proAttr_and_proAttrVal);
      // console.log(JSON.stringify(s.ajax_check_proAttr_and_proAttrVal));
   }
}


function add_or_update_productAttrVals(productIntenal,attrVals)
{
   // console.log(productIntenal);    
   // console.log(JSON.stringify(attrVals));
   if(attrVals && productIntenal)
   {  
         attrVals.forEach(function(v1,k1){
         // console.log(v1); 
         data = {};
         data.ProductValueInternalName = v1.internalName;
         data.Name = v1.displayName;
         data.ColorSquaresRgb = '';
         data.IsPreSelected = false;
         data.DisplayOrder = k1;
         data.Locales = [];

         a1 = check_attribute(productIntenal,v1.internalName,JSON.stringify(data));
               $.when(a1).then(function( data, textStatus, jqXHR ) {
                  console.log(data); 
                  console.log(jqXHR.status);                              
               });
         
       });
   }
}