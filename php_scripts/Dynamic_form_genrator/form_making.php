
<?php if(isset($_POST['row']) && !empty($_POST['row'])){
     $row = $_POST['row'];
    ?>

    <button type="button" id="dynamic_form_<?php echo $row; ?>" onClick="dynamic_form(<?php echo $row; ?>)" data-index="<?php echo $row; ?>" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button></br></br>

    <?php } ?>

