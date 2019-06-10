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
        <h5 class="modal-title" id="exampleModalLabel">Form feild</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="configform">
          <div class="form-group">
            <label for="label-name" class="col-form-label">Label:</label>
            <input type="text" class="form-control" id="label-name">
          </div>

          <div class="form-group">
          <label for="type">Type:</label>
            <select class="form-control" id="type">
              <option value=""> Select </option>
              <option value="1"> Text </option>
              <option value="2"> Radio </option>
              <option value="3"> Select </option>
              <option value="4"> Multi select </option>
              <option value="5"> Checkbox </option>
              <option value="6"> Description </option>           
              <option value="7"> Datepicker </option>           
              <option value="8"> File </option>           
              <option value="8"> Range </option>           
            </select>
          </div>

          <div class="form-group">
            <label for="name" class="col-form-label">Name:</label>
            <input type="text" class="form-control" id="name">
          </div>

          <!-- For check box -->
          <span  id="show_if_chk_or_radio" style="display:none;">
          <div class="input-group control-group after-add-more">
            <input type="text" name="options[]" class="form-control" placeholder="Enter Option Name Here">
            <div class="input-group-btn"> 
              <button class="btn btn-success add-more" type="button"><i class="glyphicon glyphicon-plus"></i> Add</button>
            </div>
          </div>

          <div class="form-check-inline">
            <label class="form-check-label">
              <input type="radio" class="form-check-input" name="options_appear">Inline 
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label">
              <input type="radio" class="form-check-input" name="options_appear">Vertical
            </label>
          </div>
          </span>

          <div class="form-group">
            <label for="placeholder" class="col-form-label">Placeholder:</label>
            <input type="text" class="form-control" id="placeholder">
          </div>

          <div class="form-group">
            <label for="default-value" class="col-form-label">Default value:</label>
            <input type="text" class="form-control" id="default-value">
          </div>

          <div class="form-group">
            <label for="help-text" class="col-form-label">Help text:</label>
            <textarea class="form-control" id="help-text"></textarea>
          </div>

          <div class="form-group">
            <label for="hover-text" class="col-form-label">Hover text:</label>
            <textarea class="form-control" id="hover-text"></textarea>
          </div>

          <div class="form-check-inline">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input" value="1" id="readonly">Readonly
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input" id="disable" value="1">Disable
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input" value="1" id="requiered">Requiered
            </label>
          </div>

          <!-- https://itsolutionstuff.com/post/simple-add-remove-input-fields-dynamically-using-jquery-with-bootstrapexample.html -->
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





<!-- Copy Fields -->
<div class="copy d-none">
  <div class="control-group input-group" style="margin-top:10px">
    <input type="text" name="options[]" class="form-control" placeholder="Enter Option Name Here">
    <div class="input-group-btn"> 
      <button class="btn btn-danger remove" type="button"><i class="glyphicon glyphicon-remove"></i> Remove</button>
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



