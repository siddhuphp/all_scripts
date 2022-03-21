<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <style type="text/css">
        body
        {
            font-family: Arial;
            font-size: 10pt;
        }
    </style>
	  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

</head>
<body>

    
	<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAXkP7Z7L54odTOQJshVFVvQSt-FkAd77I&sensor=false&libraries=places"></script>   <script type="text/javascript">



	  google.maps.event.addDomListener(window, 'load', function () {
			
			
            var places = new google.maps.places.Autocomplete(document.getElementById('txtPlaces'));
			
            google.maps.event.addListener(places, 'place_changed', function () {
                var place = places.getPlace();
				 console.log(place);
				/* console.log(place);
				console.log(place.address_components[0]['types'][0]); */
				
				var address = place.formatted_address;
				document.getElementById("formatted_address").value = address;
				
				var name = place.name;
				document.getElementById("name").value = name;								
                
                var url = place.url;
				document.getElementById("url").value = url;				
              
                var latitude = place.geometry.location.lat();
				document.getElementById("latitude").value = latitude;	
				
                var longitude = place.geometry.location.lng();
				document.getElementById("longitude").value = longitude;	

				var website = place.website;
				document.getElementById("website").value = website;
				
				var place_id = place.place_id;
				document.getElementById("Place_id").value = place_id; 			
				

				$( place.address_components ).each(function( index, value ) {
					// console.log( index, value );
					
					 $( value.types ).each(function( key, mainvalue ) {
						//console.log( key, mainvalue );
							if(mainvalue === 'locality')
							{
								//console.log( "siddhu", value.long_name );
								document.getElementById("client_location").value = value.long_name;  
							}
							if(mainvalue === 'postal_code')
							{
								//console.log( "siddhu", value.long_name );
								document.getElementById("postal_code").value = value.long_name;  
							}
							if(mainvalue === 'administrative_area_level_1')
							{
								//console.log( "siddhu", value.long_name );
								document.getElementById("state").value = value.long_name;  
							}
							if(mainvalue === 'country')
							{
								//console.log( "siddhu", value.long_name );
								document.getElementById("country").value = value.long_name;  
							}
						}); 
				});
                
            });			
			
        });
		
		


    </script>
	

    
	
   


<div class="container">
  <h2>Google Location autocomplete made by Siddhu</h2>
  <form>
    <div class="form-group">
      <label for="email">Location:</label>
		<input type="text"  class="form-control" id="txtPlaces"  placeholder="Enter a location" name="map" autocomplete="off"		/>
    </div>
	
    <div class="form-group">
      <label for="formatted_address">formatted_address:</label>
      <input type="text" class="form-control" id="formatted_address" >
    </div>
	
	<div class="form-group">
      <label for="formatted_address">name:</label>
      <input type="text" class="form-control" id="name" >
    </div>
	
	<div class="form-group">
      <label for="formatted_address">url:</label>
      <input type="text" class="form-control" id="url" >
    </div>
	
	<div class="form-group">
      <label for="formatted_address">latitude:</label>
      <input type="text" class="form-control" id="latitude" >
    </div>
	
	<div class="form-group">
      <label for="formatted_address">longitude:</label>
      <input type="text" class="form-control" id="longitude" >
    </div>
	
	<div class="form-group">
      <label for="formatted_address">website:</label>
      <input type="text" class="form-control" id="website" >
    </div>
	
	<div class="form-group">
      <label for="formatted_address">city:</label>
      <input type="text" class="form-control" id="client_location" name="city" >
    </div>
	
	<div class="form-group">
      <label for="formatted_address">state:</label>
      <input type="text" class="form-control" id="state" name="state" >
    </div>
	
	<div class="form-group">
      <label for="formatted_address">country:</label>
      <input type="text" class="form-control" id="country" name="country" >
    </div>
	
	<div class="form-group">
      <label for="formatted_address">postal_code:</label>
      <input type="text" class="form-control" id="postal_code" name="postal_code" >
    </div>
	
	<div class="form-group">
      <label for="formatted_address">PlaceId:</label>
      <input type="text" class="form-control" id="Place_id" name="Place_id" >
    </div>
   

  
  </form>
</div>

</body>
</html>