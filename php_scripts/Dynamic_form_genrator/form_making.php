<?php
      if(isset($_POST) && !empty($_POST))
      {
          $row = $_POST['row'];
          $column_num = $_POST['column_num'];
          if($column_num == 1)
          {
?>

          <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>,1)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button></br></br>

     <?php }else if($column_num == 2){ ?>
          <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>,2)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>,2)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button></br></br>
     <?php }else if($column_num == 3){ ?>
          <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>,3)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>,3)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>,3)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button></br></br>
     <?php }else if($column_num == 4){ ?>
          <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>,4)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>,4)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>,4)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>,4)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button></br></br>
     <?php }else if($column_num == 5){ ?>
          <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>,5)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>,5)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>,5)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>,5)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>,5)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button></br></br>
     <?php }else if($column_num == 6){ ?>
          <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>,6)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>,6)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>,6)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>,6)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>,6)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>,6)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button></br></br>
     <?php } ?>


<?php } ?>

