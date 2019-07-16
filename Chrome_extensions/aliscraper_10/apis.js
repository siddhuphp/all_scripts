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
         //get_attributes_list(global_token);               
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
            sendResponse({status:true,cate:categories,manf:manfactures,wareHouseInternalName:wareHouseInternalName}); 
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



function get_AttributeDataSetId(data)
{
   if(data)
   {
      data.forEach(function(v,k){        
            if(v.ProductType == 'SimpleProduct')
            {
               id =  v.AttributeDataSetId;
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