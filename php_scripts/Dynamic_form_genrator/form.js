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
// alert(column);
  $('#configform')[0].reset();
  $("#row_index").val(row_index);
  $("#column_num").val(column_num);
  $("#column_order").val(column_order);
  $("#arr_index").val(arr_index);
 
  if((arr_index != null) && check_value_exists(obj[row_index][arr_index].name))
  {
    $("#label-name").val(obj[row_index][arr_index].name);
  }
  
};


var obj = {};


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
   var msg = $("#message-text").val();
   var array_index = $("#arr_index").val();

    if(typeof obj[row_index] === 'undefined')
    {     
      // does not exist
      obj[row_index] = [{"label":label,"type":type,"name":name,"placeholder":placeholder,"defaultValue":defaultValue,"helpText":helpText,"hoverText":hoverText,"readonly":readonly,"disable":disable,"requiered":requiered,"column_num":column_num,"column_order":column_order}];
      var arr_index = 0;
    }
    else if(array_index != null)
    {
        // remodified
        obj[row_index][array_index] = {"label":label,"type":type,"name":name,"placeholder":placeholder,"defaultValue":defaultValue,"helpText":helpText,"hoverText":hoverText,"readonly":readonly,"disable":disable,"requiered":requiered,"column_num":column_num,"column_order":column_order};
        arr_index = array_index;
    }
    else
    {
      // pushed new array if the object key value exists
      obj[row_index].push({"label":label,"type":type,"name":name,"placeholder":placeholder,"defaultValue":defaultValue,"helpText":helpText,"hoverText":hoverText,"readonly":readonly,"disable":disable,"requiered":requiered,"column_num":column_num,"column_order":column_order});
       arr_index = (obj[row_index].length - 1);              
    } 
  
   $('#configform')[0].reset();
   $('#exampleModal').modal('hide');
   $("#dynamic_form_"+row_index+"_"+column_num+"_"+column_order).replaceWith('<button type="button" id="dynamic_form_'+row_index+'_'+column_num+'_'+column_order+'" onClick="dynamic_form('+row_index+','+column_num+','+column_order+','+arr_index+')" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">' +label+ '</button>'); 
   console.log(obj); 
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
  ary = ['2','3','4','5'];  
  if(ary.indexOf(this.value) > -1)
  {
    $("#show_if_chk_or_radio").show();    
  }
  else
  {
    $("#show_if_chk_or_radio").hide();
  }
});