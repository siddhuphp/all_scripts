<?php
    $status=false; $message=""; $errors=array();
    if(isset($_POST) && !empty($_POST))
    {
        if(isset($_POST['pasted_code']) && !empty($_POST['pasted_code']))
        {
            $data = make_automate_prism();
            $status = true;
            $message = "Replaced your code into prism code format";
        }
        else
        {
            $errors['Error'] = "Please paste your code ";
        }

        $output = array(
            "status"=>$status,
            "msg"=>$message,
            "data"=>$data,
            "errors"=>$errors,
         );
        header('Content-type: application/json');
        echo json_encode($output);
    }


    function make_automate_prism()
    {
        $language = (isset($_POST['language']))?$_POST['language']:'';        
        $code = '<pre>';
        $code .= '<code class="language-'.$language.' line-numbers">';
        $code .= replace_prisam_format();
        $code .= '</code></pre>';
        return $code;       
    }

    function replace_prisam_format()
    {
        $pasted_code  = (isset($_POST['pasted_code']))?$_POST['pasted_code']:'';
        $code = ["<", ">"];
        $replace_with = ["&lt;", "&gt;"];
        return $newPhrase = str_replace($code, $replace_with, $pasted_code);
    }
?>