<!DOCTYPE html>
<html lang="en">
  <head>
  <title>ACE in Action</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Ace - The High Performance Code Editor for the Web</title>
        <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/css/bootstrap.no-icons.min.css" />
        <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/3.0/css/font-awesome.css" />
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <!--<link href="./api/resources/csses/ace_api.css" rel="stylesheet" type="text/css" /> 
        <link href="./doc/site/style.css" rel="stylesheet" type="text/css" />-->
        <link href="./doc/site/images/favicon.ico" rel="icon" type="image/x-icon" />

        <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.7/ace.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.7/ext-static_highlight.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.7/snippets/html.js"></script>
        <!--[if lt IE 9]>
            <script src="./build/src/ext-old_ie.js"></script>
        <![endif]-->
		

    </head>
	

<body>



<div class="container">
  <div class="row">    
  </br></br></br>
  <form onsubmit="return myFunction()">
  
	<!--Single editor value -->
    <div class="col-sm-12">      
      <pre id="editor"></pre>		
    </div>
	
	<!--Multiple editors value -->
    <div class="col-sm-12">      
      <pre class="editor"></pre>		
      <pre class="editor"></pre>		
      <pre class="editor"></pre>		
      <pre class="editor"></pre>		
      <pre class="editor"></pre>		
    </div>
	
	
	
		<input type="submit">
	</form>	
  </div>

</div>
    

<script>
   
	 var editor = ace.edit("editor");
	 
			editor.setTheme("ace/theme/monokai");
			editor.session.setMode("ace/mode/html");
			editor.setOptions({
				readOnly: false,
				highlightActiveLine: false,
				highlightGutterLine: false,
				maxLines:30,
				printMargin:false,
				enableBasicAutocompletion:true
			});
			  
	document.getElementById('editor').style.fontSize='32px';
	/*more help: https://github.com/ajaxorg/ace/wiki/Configuring-Ace*/
	
	
	 function myFunction()
	  {
		  var editor = ace.edit("editor");
		  console.log(editor.getValue());
		  for_multiple();
		  return false;
	  }
	  
	  /* For multiple instance */
	  
	  var editor_2;
		$('.editor').each(function( index ) {
			editor_2 = ace.edit(this);
			editor_2.setTheme("ace/theme/monokai");
			editor_2.session.setMode("ace/mode/html");
			editor_2.setOptions({
				readOnly: false,
				highlightActiveLine: false,
				highlightGutterLine: false,
				maxLines:30,
				printMargin:false,
				enableBasicAutocompletion:true
			});	
						
		});
		$('.editor').css('fontSize', '32px');
		
	  function for_multiple()
	  {
		$('.editor').each(function( index ) {
			 var editor = ace.edit(this);
			 console.log(editor.getValue());			
		});
	  }
</script>
</body>
</html>