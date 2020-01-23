<?php
/* get data between in text */

public function getInbetweenStrings($start, $end, $str){
		$matches = array();
		$regex = "/$start(.*?)$end/im";
		preg_match_all($regex, $str, $matches);
	   // print_r($matches);
	   if(isset($matches[1][0]) && !empty($matches[1][0]))
	   {
		   $res = strip_tags($matches[1][0]);
	   }
	   else
	   {
		   $res = '';
	   }
		return $res;
	}

?>