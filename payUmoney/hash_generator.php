<?php
$json=array();
/* We need to convert the inputs into HASH as per PayU alogrithem */
        
#Sequence
/* hashSequence = key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt;
$hash = hash("sha512", $hashSequence); */

/* Required Parameters for Translation */
    if(strcasecmp($_SERVER['REQUEST_METHOD'], 'POST') == 0){
        $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';	
	    if(strcasecmp($contentType, 'application/json') == 0){
                      	
            $salt = 'a3yMmYqqmA';           

            $data = json_decode(file_get_contents('php://input'));
            $hash=hash('sha512', $data->key.'|'.$data->txnid.'|'.$data->amount.'|'.$data->productinfo.'|'.$data->firstname.'|'.$data->email.'|||||'.$data->udf5.'||||||'.$salt);
            
            $json['success'] = $hash;
           
        }    
    }
    else
    {
        $json['error'] = "Failed";
    }

 echo json_encode($json);


?>