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

  <!-- prisam css -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/themes/prism.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/plugins/line-numbers/prism-line-numbers.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/plugins/toolbar/prism-toolbar.min.css" />
  <!-- prisam css -->
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

  <div class="row" id="prismCode" style="display:none;">
    <div class="col-sm-2"></div>
        <div class="col-sm-8">
        <div class="form-group">
            <label for="comment">Prism code:</label>
            <textarea class="form-control" rows="5" id="prism_code" name="prism_code" readonly></textarea>
        </div>
        </div>
    <div class="col-sm-2"></div>   
  </div>

  <div class="row">
    <div class="col-sm-2"></div>
        <div class="col-sm-8">
            <div id="preview"></div>
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
       $('#preview').html(data.data);
       $('#prismCode').show();
       Prism.highlightAll();
    
    }).fail(function(jqXHR, textStatus, errorThrown) {
        // If fail
        console.log(textStatus + ': ' + errorThrown);
    });
}    
</script>






<!-- prisam js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/prism.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/components/prism-markup.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/components/prism-php-extras.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/components/prism-php.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/components/prism-python.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/components/prism-javascript.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/components/prism-markup-templating.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/plugins/line-highlight/prism-line-highlight.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/plugins/line-numbers/prism-line-numbers.min.js"></script>


<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/plugins/toolbar/prism-toolbar.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/plugins/show-language/prism-show-language.min.js"></script>

<script>
        /* Prism copy to clipbaord for all pre with copytoclipboard class */
        $('pre.copytoclipboard').each(function () {
            $this = $(this);
            $button = $('<button>Copy</button>');
            $this.wrap('<div/>').removeClass('copytoclipboard');
            $wrapper = $this.parent();
            $wrapper.addClass('copytoclipboard-wrapper').css({position: 'relative'})
            $button.css({position: 'absolute', top: 10, right: 10}).appendTo($wrapper).addClass('copytoclipboard btn btn-default');
            /* */
            var copyCode = new Clipboard('button.copytoclipboard', {
                target: function (trigger) {
                    return trigger.previousElementSibling;
                }
            });
            copyCode.on('success', function (event) {
                event.clearSelection();
                event.trigger.textContent = 'Copied';
                window.setTimeout(function () {
                    event.trigger.textContent = 'Copy';
                }, 2000);
            });
            copyCode.on('error', function (event) {
                event.trigger.textContent = 'Press "Ctrl + C" to copy';
                window.setTimeout(function () {
                    event.trigger.textContent = 'Copy';
                }, 2000);
            });
        });
</script>
​<!-- prisam js -->
</body>
</html>
​
