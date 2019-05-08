<?php
      if(isset($_POST) && !empty($_POST))
      {
          $row = $_POST['row'];
          $column_num = $_POST['column_num'];
          if($column_num == 1)
          {
?>

          <button type="button" id="dynamic_form_<?php echo $row."_1_1"; ?>" onClick="dynamic_form(<?php echo $row; ?>,1,1)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button></br></br>

     <?php }else if($column_num == 2){ ?>
          <button type="button" id="dynamic_form_<?php echo $row."_2_1"; ?>" onClick="dynamic_form(<?php echo $row; ?>,2,1)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row."_2_2"; ?>" onClick="dynamic_form(<?php echo $row; ?>,2,2)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button></br></br>
     <?php }else if($column_num == 3){ ?>
          <button type="button" id="dynamic_form_<?php echo $row."_3_1"; ?>" onClick="dynamic_form(<?php echo $row; ?>,3,1)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row."_3_2"; ?>" onClick="dynamic_form(<?php echo $row; ?>,3,2)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row."_3_3"; ?>" onClick="dynamic_form(<?php echo $row; ?>,3,3)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button></br></br>
     <?php }else if($column_num == 4){ ?>
          <button type="button" id="dynamic_form_<?php echo $row."_4_1"; ?>" onClick="dynamic_form(<?php echo $row; ?>,4,1)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row."_4_2"; ?>" onClick="dynamic_form(<?php echo $row; ?>,4,2)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row."_4_3"; ?>" onClick="dynamic_form(<?php echo $row; ?>,4,3)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row."_4_4"; ?>" onClick="dynamic_form(<?php echo $row; ?>,4,4)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button></br></br>
     <?php }else if($column_num == 5){ ?>
          <button type="button" id="dynamic_form_<?php echo $row."_5_1"; ?>" onClick="dynamic_form(<?php echo $row; ?>,5,1)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row."_5_2"; ?>" onClick="dynamic_form(<?php echo $row; ?>,5,2)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row."_5_3"; ?>" onClick="dynamic_form(<?php echo $row; ?>,5,3)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row."_5_4"; ?>" onClick="dynamic_form(<?php echo $row; ?>,5,4)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row."_5_5"; ?>" onClick="dynamic_form(<?php echo $row; ?>,5,5)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button></br></br>
     <?php }else if($column_num == 6){ ?>
          <button type="button" id="dynamic_form_<?php echo $row."_6_1"; ?>" onClick="dynamic_form(<?php echo $row; ?>,6,1)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row."_6_2"; ?>" onClick="dynamic_form(<?php echo $row; ?>,6,2)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row."_6_3"; ?>" onClick="dynamic_form(<?php echo $row; ?>,6,3)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row."_6_4"; ?>" onClick="dynamic_form(<?php echo $row; ?>,6,4)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row."_6_5"; ?>" onClick="dynamic_form(<?php echo $row; ?>,6,5)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp;
          <button type="button" id="dynamic_form_<?php echo $row."_6_6"; ?>" onClick="dynamic_form(<?php echo $row; ?>,6,6)" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button></br></br>
     <?php } ?>


<?php } ?>

