var i = 1;
$("#column_1").click(function name(params) {
   $("#dynamic_form").append(
    '<button type="button" id="dynamic_form_'+i+'" onClick="dynamic_form('+i+')" data-index="'+i+'" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button></br><div class="clearfix">..</div>'
  );
  i++;  
});


function dynamic_form(row_index) {  
  console.log(row_index);
  $("#row_index").val(row_index);
};

var data = [];
var obj = {};


function make_data()
{
   
   var row_index = $("#row_index").val();
   var name = $("#recipient-name").val();
   var msg = $("#message-text").val();
   console.log(row_index);
   console.log(name);     
   obj[row_index] = [{"name":name,"age":msg}];  
   data.push(obj);  
   $('#configform')[0].reset();
   $('#exampleModal').modal('hide');
   $("#dynamic_form_"+row_index).replaceWith('<button type="button" id="dynamic_form_'+row_index+'" onClick="dynamic_form('+i+')" data-index="'+row_index+'" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">' +name+ '</button></br><div class="clearfix">..</div>'); 
   console.log(obj);
   console.log(data); 

  
}