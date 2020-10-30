<?php
function convert_url_to_iframe($url="")
{
    $res =["status"=>false,"msg"=>"failed to convert"];
    if(isset($url) && !empty($url))
    {
        $iframe = preg_replace("/\s*[a-zA-Z\/\/:\.]*youtube.com\/watch\?v=([a-zA-Z0-9\-_]+)([a-zA-Z0-9\/\*\-\_\?\&\;\%\=\.]*)/i","<iframe align=\"center\" width=\"730\" height=\"486\" src=\"//www.youtube.com/embed/$1\" frameborder=\"0\" allowfullscreen></iframe>",$url);
        $res =["status"=>true,"msg"=>"Coverted","data"=>$iframe];
        
        
    }
    return $res;
}
		
$s =  convert_url_to_iframe('https://www.youtube.com/watch?v=GrlMZ02Rmj8');
print_r($s);
?>               