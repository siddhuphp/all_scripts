var i = 1;
$("#column_1").click(function name(params) {
   $("#dynamic_form").append(
    '<span id="dynamic_form_'+i+'"><button type="button" onClick="dynamic_form('+i+')" data-index="'+i+'" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button></br></br></span>'
  );
  i++;  
});


function dynamic_form(row_index) {  
 alert(row_index);
  $('#configform')[0].reset();
  $("#row_index").val(row_index);
  console.log(obj);
  alert(obj[1][0].name);
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
   $("#dynamic_form_"+row_index).replaceWith('<span id="dynamic_form_'+row_index+'"><button type="button" id="dynamic_form_'+row_index+'" onClick="dynamic_form('+row_index+')" data-index="'+row_index+'" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">' +name+ '</button></br></br></span>'); 
   console.log(obj);
  //  console.log(data); 

  
}




var i_2 = 9991;
var i_2i = 99992;
$("#column_2").click(function name(params) {
   $("#dynamic_form").append(
    '<span id="dynamic_form_'+i_2+'"><button type="button" onClick="dynamic_form('+i_2+')" data-index="'+i_2+'" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button><button type="button" onClick="dynamic_form('+i_2i+')" data-index="'+i_2i+'" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModal">+ Add </button></br></br></span>'
  );
  i++;  
});
