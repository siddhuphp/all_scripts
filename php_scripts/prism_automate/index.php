<!DOCTYPE html>
<html lang="en">
<head>
  <title>Siddhu's Code</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href='https://www.codesponsors.com/favicon.ico' rel='icon' type='image/x-icon'/>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</head>
<body>
​
<div class="container">
  <h4>Prism Automated</h4>
  <div class="row">
    <div class="col-sm-2"></div>
    <div class="col-sm-8">
        <form action="#" id="myForm">
        <div class="form-group">
            <label for="comment">Paste code:</label>
            <textarea class="form-control" rows="5" id="pasted_code" name="pasted_code"></textarea>
        </div>
        <div class="form-group">
            <label for="language">Select language:</label>
            <select class="form-control" id="language" name="language">
                <option value='php'>PHP</option>
                <option value='python'>Python</option>
                <option value='javascript'>JavaScript</option>               
            </select>
        </div>
            <button type="button" onClick="fn_submit();" class="btn btn-primary float-right">Submit</button>
        </form>
    </div>  
    <div class="col-sm-2"></div>  
  </div>

  <div class="row">
    <div class="col-sm-2"></div>
        <div class="col-sm-8">
        <div class="form-group">
            <label for="comment">Prism code:</label>
            <textarea class="form-control" rows="5" id="prism_code" name="prism_code" readonly></textarea>
        </div>
        </div>
    <div class="col-sm-2"></div>
  </div>
</div>

<script>
function fn_submit()
{
    var URL = '<?php echo  $_SERVER['REQUEST_URI'].'action_page.php'; ?>';
    $.ajax({
        data: $('#myForm').serialize(),
        dataType: 'json',
        url: URL,
        type: 'POST',
    }).done(function(data) {
        // If successful
        // console.log(data);
       $('#prism_code').val(data.data);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        // If fail
        console.log(textStatus + ': ' + errorThrown);
    });
}    
</script>
​
</body>
</html>
​
