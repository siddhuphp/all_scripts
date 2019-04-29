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
  $("#recipient-name").val(obj[row_index][0].name);
};

// var data = [];
var obj = {};


function make_data()
{
   
   var row_index = $("#row_index").val();// row order
   var column_num = $("#column_num").val(); // col-1....col-6
   var column_order = $("#column_order").val(); // in column input field order
   var name = $("#recipient-name").val();
   var msg = $("#message-text").val();
  //  console.log(row_index);
  //  console.log(name); 
   // obj[row_index]= [];        
    obj[row_index][column_num][column_order] = [{"name":name,"age":msg,"column_num":column_num,"column_order":column_order}];  
  //  obj[7]= [];  
  //  obj[7].push([{"name":788,"age":85}]);  
  //  obj[7].push([{"name":123,"age":45}]);  
  //  data.push(obj);  
   $('#configform')[0].reset();
   $('#exampleModal').modal('hide');
   $("#dynamic_form_"+row_index).replaceWith('<button type="button" id="dynamic_form_'+row_index+'" onClick="dynamic_form('+row_index+')" data-index="'+row_index+'" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">' +name+ '</button>'); 
   console.log(obj);
  //  console.log(data); 

  
}

