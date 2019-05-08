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


function dynamic_form(row_index,column_num,column_order) {  
// alert(row_index);
// alert(column);
  $('#configform')[0].reset();
  $("#row_index").val(row_index);
  $("#column_num").val(column_num);
  $("#column_order").val(column_order);
  console.log(obj);
  //alert(obj[row_index][0].name);
  //$("#recipient-name").val(obj[row_index][0].name);
};


var obj = {};


function make_data()
{
   var row_index = $("#row_index").val();// row order
   var column_num = $("#column_num").val(); // col-1....col-6
   var column_order = $("#column_order").val(); // in column input field order
   var name = $("#recipient-name").val();
   var msg = $("#message-text").val();

    if(typeof obj[row_index] === 'undefined')
    {
      // does not exist
      obj[row_index] = [{"name":name,"age":msg,"column_num":column_num,"column_order":column_order}];
    }
    else
    {
        // does exist
        obj[row_index].push({"name":name,"age":msg,"column_num":column_num,"column_order":column_order});        
    } 
  
   $('#configform')[0].reset();
   $('#exampleModal').modal('hide');
   $("#dynamic_form_"+row_index+"_"+column_num+"_"+column_order).replaceWith('<button type="button" id="dynamic_form_'+row_index+'_'+column_num+'_'+column_order+'" onClick="dynamic_form('+row_index+','+column_num+','+column_order+')" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">' +name+ '</button>'); 
   console.log(obj); 
}

