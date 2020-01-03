<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>bootstrap4</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote-bs4.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote-bs4.js"></script>
  </head>
  <body>
	<form onsubmit="return myFunction()">
		<!-- For Single editor -->
		<div id="summernote"></div>
		
		<!-- For Multiple editors -->
		<div class="summernote"></div>
		<div class="summernote"></div>
		<div class="summernote"></div>
		<div class="summernote"></div>
		<div class="summernote"></div>
			<input type="submit">
	</form>
    <script>
		// for Single
      $('#summernote').summernote({
        placeholder: 'Hello bootstrap 4',
        tabsize: 2,
        height: 100
      });
	  
		// for multiple
		$('.summernote').summernote({
        placeholder: 'Hello bootstrap 4',
        tabsize: 2,
        height: 100
      });
	  
	  function myFunction()
	  {
		  console.log($('#summernote').summernote('code'));
		  for_multiple();
		  return false;
	  }
	  
	  function for_multiple()
	  {
		  var markupStr1 = $('.summernote').eq(0).summernote('code');
		  var markupStr2 = $('.summernote').eq(1).summernote('code');
		  var markupStr3 = $('.summernote').eq(2).summernote('code');
		  var markupStr4 = $('.summernote').eq(3).summernote('code');
		  var markupStr5 = $('.summernote').eq(4).summernote('code');
		  
		  console.log(markupStr1);
		  console.log(markupStr2);
		  console.log(markupStr3);
		  console.log(markupStr4);
		  console.log(markupStr5);
	  }
    </script>
  </body>
</html>
