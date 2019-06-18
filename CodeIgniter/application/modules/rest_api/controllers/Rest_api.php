<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Rest_api extends MX_Controller 
{
   private $tbl_gnrl = "users";
   public function __construct()
	{
		parent::__construct();						
	}
	
	
	// Using the very simple PHP function file_get_contents(), you can perform a basic GET request. This is the most basic of all the methods but is worth mentioning for those "quick and dirty" moments.
	public function general_worst_call() // works but bad practice
	{		
		$users = json_decode(
			file_get_contents('http://localhost/all_scripts/CodeIgniter/Restapi/users/format/json')
		);
 
		print_r($users);
	}
	
	
	//Second worst call using basic auth
	public function general_worst_auth_call() // works but bad practice
	{		
		$users = json_decode(
			file_get_contents('http://localhost/all_scripts/CodeIgniter/Restapi/users/format/json')
		);
 
		print_r($users);
	}
	
}
?>