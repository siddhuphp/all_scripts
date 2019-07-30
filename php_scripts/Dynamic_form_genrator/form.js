var obj = {}; // Global object

var i = 1;
$(".column-index").click(function name(params) {
 var column_num = $(this).attr("data-column"); 
  $.ajax({
          method: 'POST',
          data: {"row":i,"column_num":column_num},
          dataType: 'html',
          url: url+'/form_making.php'
        }).done(function(data) {
           // If successful
          console.log(data);
          $("#dynamic_form").append(data);
        }).fail(function(jqXHR, textStatus, errorThrown) {
          // If fail
          console.log(textStatus + ': ' + errorThrown);
        }); 
      i++;  
});


function dynamic_form(row_index,column_num,column_order,arr_index=null) {  
  // alert(row_index);
  // alert(column_num);
  $('#configform')[0].reset();
  $("#row_index").val(row_index);
  $("#column_num").val(column_num);
  $("#column_order").val(column_order);
  $("#arr_index").val(arr_index);
 
  if((arr_index != null) && check_value_exists(obj[row_index][arr_index].name))
  {
    visable_nd_invisable(obj[row_index][arr_index].type); // So it will load correct html of that particular field
    $("#label-name").val(obj[row_index][arr_index].label);
    $("#type").val(obj[row_index][arr_index].type);
  }  
};

function make_data()
{
   var row_index = $("#row_index").val();// row order
   var column_num = $("#column_num").val(); // col-1....col-6
   var column_order = $("#column_order").val(); // in column input field order
   var label = $("#label-name").val();
   var type = $("#type").val();
   var name = $("#name").val();
   var placeholder = $("#placeholder").val();
   var defaultValue = $("#default-value").val();
   var helpText = $("#help-text").val();
   var hoverText = $("#hover-text").val();
   var readonly = $("#readonly").val();
   var disable = $("#disable").val();
   var requiered = $("#requiered").val();
   var array_index = $("#arr_index").val();// array index value
   
   var total_values_obj = {
                  "label":label,
                  "type":type,
                  "name":name,
                  "placeholder":placeholder,
                  "defaultValue":defaultValue,
                  "helpText":helpText,
                  "hoverText":hoverText,
                  "readonly":readonly,
                  "disable":disable,
                  "requiered":requiered,
                  "column_num":column_num,
                  "column_order":column_order,
                  "row_index":row_index,
                  "array_index":array_index,
              };

    final_obj_makes(total_values_obj);
   
}



function check_value_exists(val)
{
  if(val)
  {
    return true;
  }
  else
  {
    return false;
  }
}

// For checkbox and radio options
$(".add-more").click(function(){ 
  var html = $(".copy").html();
  $(".after-add-more").after(html);
});


$("body").on("click",".remove",function(){ 
  $(this).parents(".control-group").remove();
});


// For selecting field type
$('#type').on('change', function() {
     visable_nd_invisable(this.value);
});


function fun_text()
{
  //Text
  $("#show_if_text").show();
  $("#show_if_chk_or_radio").hide();
  $(".placeholder, .default-value").show();	
}

function fun_description()
{
  //description
  $("#show_if_text").show();
  $("#show_if_chk_or_radio").hide();
  $(".placeholder, .default-value").show();	
}

function fun_editior()
{
  //editior
  $("#show_if_text").show();
  $("#show_if_chk_or_radio").hide();
  $(".placeholder, .default-value").show();	
}

function fun_radio()
{
  //Radio
  $("#show_if_chk_or_radio").show();
  $("#show_if_text").hide();
  $(".placeholder, .default-value").hide();
}

function fun_checkbox()
{
  //Checkbox
  $("#show_if_chk_or_radio").show();
  $("#show_if_text").hide();
  $(".placeholder, .default-value").hide();
}

function fun_multi_select()
{
  //Multi_select
  $("#show_if_chk_or_radio").show();
  $("#show_if_text").hide();
  $(".placeholder, .default-value").hide();
}

function fun_select()
{
  //Select
  $("#show_if_chk_or_radio").show();
  $("#show_if_text").hide();
  $(".placeholder, .default-value").hide();
}

function fun_datepicker()
{
  //Datepicker
  $("#show_if_chk_or_radio").show();
  $("#show_if_text").hide();
  $(".placeholder, .default-value").hide();
}

function fun_timepicker()
{
  //Timepicker
  $("#show_if_chk_or_radio").show();
  $("#show_if_text").hide();
  $(".placeholder, .default-value").hide();
}

function fun_file()
{
  //File
  $("#show_if_chk_or_radio").show();
  $("#show_if_text").hide();
  $(".placeholder, .default-value").hide();
}

function fun_range()
{
  //Range
  $("#show_if_chk_or_radio").show();
  $("#show_if_text").hide();
  $(".placeholder, .default-value").hide();
}





function final_obj_makes(my_obj)
{
    if(typeof obj[my_obj.row_index] === 'undefined')
    {     
      // does not exist
      // alert('i created new');
      obj[my_obj.row_index] = [my_obj];
      var arr_index = 0;
    }
    else if(my_obj.array_index && (my_obj.array_index != null))
    {
        // remodified
        // alert('i modified');
        obj[my_obj.row_index][my_obj.array_index] = my_obj;
        arr_index = my_obj.array_index;
    }
    else
    {
      // pushed new array if the object key value exists
      // alert('i pushed');
      obj[my_obj.row_index].push(my_obj);
      arr_index = (obj[my_obj.row_index].length - 1);              
    } 
  
   $('#configform')[0].reset();
   $('#exampleModal').modal('hide');
   $("#dynamic_form_"+my_obj.row_index+"_"+my_obj.column_num+"_"+my_obj.column_order).replaceWith('<button type="button" id="dynamic_form_'+my_obj.row_index+'_'+my_obj.column_num+'_'+my_obj.column_order+'" onClick="dynamic_form('+my_obj.row_index+','+my_obj.column_num+','+my_obj.column_order+','+arr_index+')" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">' +my_obj.label+ '</button>'); 
   console.log(obj); 
   console.log(JSON.stringify(obj)); 
}


function visable_nd_invisable(v)
{
  switch (v) {
    case 'text':
      fun_text();
      break;    
    
    case 'radio':
      fun_radio();
      break;

    case 'select':
      fun_select();
      break;
    
    case 'multi_select':
      fun_multi_select();
      break;

    case 'checkbox':
      fun_checkbox();
      break;

    case 'description':
      fun_description();
      break;

    case 'editior':
      fun_editior();
      break;

    case 'datepicker':
      fun_datepicker();
      break;

    case 'timepicker':
      fun_timepicker();
      break;

    case 'file':
      fun_file();
      break;

    case 'range':
      fun_range();
      break;
  
    default:
      break;
  }
}