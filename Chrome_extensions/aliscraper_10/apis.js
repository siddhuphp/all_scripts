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
      toCheck = s.ajax_check_proAttr_and_proAttrVal;
      sendResponse({status:true,datas:s.ajax_check_proAttr_and_proAttrVal});//later work
      if(toCheck)
      {
         for (var key in toCheck) {
            // console.log(key);
            // console.log(toCheck[key]);
            //ajax fire                     
            if(key == 'Color')
            {
               attrVal = toCheck[key];
               a1 = check_attribute(key.toLocaleLowerCase());
               $.when(a1).then(function( data, textStatus, jqXHR ) {
                  console.log(data); 
                  console.log(jqXHR.status);
                  if(jqXHR.status != 500)
                  {
                     check_serverData_and_clientSideData(data,attrVal);
                  }               
               });
            }           
         }
         
      }      
   }
}


function check_attribute(attr)
{
   if(attr)
   {
      if(global_token)
      {
        return $.ajax({
            url:"http://glocalkart.australiasoutheast.cloudapp.azure.com/odata/productattribute('"+attr+"')",
            headers: {
               'Authorization':"Bearer "+global_token,               
               'Content-Type':'application/json'
           },
            type: "GET",
            data:'',
            dataType: "json",           
         });  
      }   
      else
      {
         return false;
      } 
   }    
}


function check_serverData_and_clientSideData(serverData,clientSideData)
{
   // console.log(serverData.PredefinedProductAttributeValues);
   h = serverData.PredefinedProductAttributeValues;
   if(h)
   {
      server_attr_vals = [];
      h.forEach(function(v,k){
         //console.log(v.ProductValueInternalName);
         server_attr_vals.push(v.ProductValueInternalName);
      });
      console.log(server_attr_vals);
      console.log(clientSideData);

      array1 = ["g_m", "g_l", "g_xl", "g_xxl", "g_xxxl","ddd"];  //client
      array2 = ["g_m", "g_l", "g_xl", "g_xxl", "g_xxxl","ssss"]; // server

      var unique = [];
      for(var i = 0; i < array1.length; i++)
      {
         var found = false;

         for(var j = 0; j < array2.length; j++){ // j < is missed;
         if(array1[i] == array2[j]){
            found = true;
            break; 
         }
         }
         if(found === false)
         {
          unique.push(array1[i]);
         }
      }

      console.log(unique);


   }
   
}