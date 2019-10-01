<!DOCTYPE html>
<!--
   To change this license header, choose License Headers in Project Properties.
   To change this template file, choose Tools | Templates
   and open the template in the editor.
   -->
<html>
   <head ></head>
   <body>
      <h1>PayUMoney Payment Request Form </h1>
      <form action="https://sandboxsecure.payu.in/_payment"  name="payuform" method="POST" id="payuform" >
         <input type="hidden" name="key" id="key" value="skGYhOaC" />
         <input type="hidden" name="hash_string" value="" />
         <input type="hidden" name="hash" id="hash" value="" />
         <input type="hidden" name="txnid" id="txnid" value="<?php echo  "Txn" . rand(10000,99999999)?>"/> <!--This is unique generated id from me-->
         <table>
            <tr>
               <td><b>Mandatory Parameters</b></td>
            </tr>
            <tr>
               <td>Amount: </td>
               <td><input name="amount" id="amount" value="5" /></td>
               <td>First Name: </td>
               <td><input name="firstname" id="firstname" value="Siddhu"  /></td>
            </tr>
            <tr>
               <td>Email: </td>
               <td><input name="email" id="email" value="siddharthaesunuri@gmail.com"   /></td>
               <td>Phone: </td>
               <td><input name="phone" id="phone" value="9912238386" /></td>
            </tr>
            <tr>
               <td>Product Info: </td>
               <td colspan="3"><textarea name="productinfo" id="productinfo" ></textarea></td>
            </tr>
            <tr>
               <td>Success URI: </td>
               <td colspan="3"><input name="surl"  size="64" value="http://localhost/all_scripts/payUmoney/success.php"  /></td>
            </tr>
            <tr>
               <td>Failure URI: </td>
               <td colspan="3"><input name="furl"  size="64" value="http://localhost/all_scripts/payUmoney/failed.php" /></td>
            </tr>
            <tr>
               <td colspan="3"><input type="hidden" name="service_provider" value="payu_paisa" /></td>
            </tr>
            <tr>
               <td><b>Optional Parameters</b></td>
            </tr>
            <tr>
               <td>Last Name: </td>
               <td><input name="lastname" id="lastname"  /></td>
               <td>Cancel URI: </td>
               <td><input name="curl" value="" /></td>
            </tr>
            <tr>
               <td>Address1: </td>
               <td><input name="address1" /></td>
               <td>Address2: </td>
               <td><input name="address2"  /></td>
            </tr>
            <tr>
               <td>City: </td>
               <td><input name="city"  /></td>
               <td>State: </td>
               <td><input name="state"  /></td>
            </tr>
            <tr>
               <td>Country: </td>
               <td><input name="country"  /></td>
               <td>Zipcode: </td>
               <td><input name="zipcode"  /></td>
            </tr>
            <tr>
               <td>UDF1: </td>
               <td><input name="udf1"  /></td>
               <td>UDF2: </td>
               <td><input name="udf2"  /></td>
            </tr>
            <tr>
               <td>UDF3: </td>
               <td><input name="udf3"   /></td>
               <td>UDF4: </td>
               <td><input name="udf4"  /></td>
            </tr>
            <tr>
               <td>UDF5: </td>
               <td><input name="udf5" id="udf5"  /></td>
               <td>PG: </td>
               <td><input name="pg"  /></td>
            </tr>
            <td colspan="4"><input type="submit" value="Submit"  /></td>
            </tr>
         </table>
      </form>


      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
      <script type="text/javascript">
         $('#payuform').bind('keyup blur', function(){
            $.ajax({
                     url: 'hash_generator.php',
                     type: 'post',
                     data: JSON.stringify({ 
                              key: $('#key').val(),                    
                              txnid: $('#txnid').val(),
                              amount: $('#amount').val(),
                              productinfo: $('#productinfo').val(),
                              firstname: $('#firstname').val(),
                              email: $('#email').val(),
                              phone: $('#phone').val(),
                              udf5: $('#udf5').val()
                           }),
                  contentType: "application/json",
                  dataType: 'json',
                  success: function(json) {
                     if (json['error']) {
                        alert(json['error']);
                     }
                     else if (json['success']) {	
                        $('#hash').val(json['success']);
                     }
                  }
               }); 
         });
         
         </script>

   </body>
</html>