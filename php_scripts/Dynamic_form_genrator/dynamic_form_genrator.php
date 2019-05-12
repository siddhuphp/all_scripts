<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"
    />
    <title>Static Template</title>
  </head>
  <body>
    <h2>Dynamic form building</h2>
    <div class="container">
      <div class="row">
        <div class="col-sm-4">
          <h5>Select columns</h5>
          <button
            type="button"
            class="btn btn-outline-primary btn-sm column-index"
            id="column_1" data-column="1"
          >
            1 Column
          </button>
          <button
            type="button"
            class="btn btn-outline-primary btn-sm column-index"
            id="column_2" data-column="2"
          >
            2 Column
          </button>
          <button
            type="button"
            class="btn btn-outline-primary btn-sm column-index"
            id="column_3" data-column="3"
          >
            3 Column
          </button>
          <button
            type="button"
            class="btn btn-outline-primary btn-sm column-index"
            id="column_4" data-column="4"
          >
            4 Column
          </button>
          <button
            type="button"
            class="btn btn-outline-primary btn-sm column-index"
            id="column_5" data-column="5"
          >
            5 Column
          </button>
          <button
            type="button"
            class="btn btn-outline-primary btn-sm column-index"
            id="column_6" data-column="6"
          >
            6 Column
          </button>
        </div>
        <div class="col-sm-8">
          <span id="dynamic_form"></span>
        </div>
      </div>
    </div>


    <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="configform">
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Name:</label>
            <input type="text" class="form-control" id="recipient-name">
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Message:</label>
            <textarea class="form-control" id="message-text"></textarea>
          </div>
		  <input type="hidden" id="row_index" />        
		  <input type="hidden" id="column_num" />        
		  <input type="hidden" id="column_order" />        
		  <input type="hidden" id="arr_index" />        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="make_data()">Save changes</button>
      </div>
    </form>
    </div>
  </div>
</div>

    <?php
      $headers = apache_request_headers();
      $urlAddr;
      if (isset($headers['Referer']))
      {
          $urlAddr =  $headers['Referer'];
      }
    ?>
    <script>
     var url  = '<?php echo $urlAddr; ?>'
    </script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
      integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
      integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
      crossorigin="anonymous"
    ></script>
    <script src="./form.js"></script>
    <script type="text/javascript" src="https://codesandbox.io/public/sse-hooks/sse-hooks.js"></script>
  </body>
</html>



