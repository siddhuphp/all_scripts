

var i = 1;
$("#column_1").click(function name(params) {

  $.ajax({
    method: 'POST',
    data: {"row":i},
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


function dynamic_form(row_index) {  
 alert(row_index);
  $('#configform')[0].reset();
  $("#row_index").val(row_index);
  console.log(obj);
  alert(obj[row_index][0].name);
  $("#recipient-name").val(obj[row_index][0].name);
};

// var data = [];
var obj = {};


function make_data()
{
   
   var row_index = $("#row_index").val();
   var name = $("#recipient-name").val();
   var msg = $("#message-text").val();
  //  console.log(row_index);
  //  console.log(name);     
   obj[row_index] = [{"name":name,"age":msg}];  
  //  data.push(obj);  
   $('#configform')[0].reset();
   $('#exampleModal').modal('hide');
   $("#dynamic_form_"+row_index).replaceWith('<button type="button" id="dynamic_form_'+row_index+'" onClick="dynamic_form('+row_index+')" data-index="'+row_index+'" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">' +name+ '</button>'); 
   console.log(obj);
  //  console.log(data); 

  
}




$("#column_2").click(function name(params) {
  $("#dynamic_form").append(
    '<button type="button" id="dynamic_form_'+i+'_1" onClick="dynamic_form('+i+'_1)" data-index="'+i+'" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button> &nbsp; &nbsp; <button type="button" id="dynamic_form_'+i+'_2" onClick="dynamic_form('+i+'_2)" data-index="'+i+'" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button></br></br>'
  );
  i++;  
});
