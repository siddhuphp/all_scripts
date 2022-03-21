<!DOCTYPE html>
<html>
<body>

<form action="" method="post" enctype="multipart/form-data">
		<input type="file" name="files" id="_testFile">
		<input type="submit" name="submit" id="">
	</form>
  <pre></pre>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script>
  $("form").submit(function(e){
  alert();
		event.preventDefault();
		var form = new FormData();
		form.append("image", $('input[type=file]')[0].files[0]);

		var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": "https://api.imgur.com/3/image",
		  "method": "POST",
		  "headers": {
			"Authorization": "Client-ID 6f383a05a8eab0f"
		  },
		  "processData": false,
		  "contentType": false,
		  "mimeType": "multipart/form-data",
		  "data": form
		}

		$.ajax(settings).done(function (response) {
		  console.log(response);
      $("pre").text(response);
		});
});
  </script>

</body>
</html>