function goto_login()
{
   var data = JSON.stringify({
      "email": "09trimurthulu81@gmail.com",
      "password": "YWRtaW4="
   });
   
   var xhr = new XMLHttpRequest();
   xhr.withCredentials = true;
   
   xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
      console.log(this.responseText);
      }
   });
   
   xhr.open("POST", "http://glocalkart.australiasoutheast.cloudapp.azure.com/api/token/create");
   xhr.setRequestHeader("Content-Type", "application/json","charset=utf8");
   xhr.setRequestHeader("Access-Control-Allow-Origin", "*"); 
   xhr.send(data);     
}



goto_login();