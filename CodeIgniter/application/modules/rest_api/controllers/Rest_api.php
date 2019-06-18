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
	// There are a few problems with using this method: the only way to set extra HTTP headers is to set them manually using the PHP function stream_context_create(), which can be very complicated for developers who are new to the internal workings of HTTP requests. Another disadvantage is that you only receive the body of the HTTP response in its raw format, which means you need to handle conversion from very single request.
	public function general_worst_auth_call() // works but bad practice
	{		
		$users = json_decode(
			file_get_contents('http://admin:1234@localhost/all_scripts/CodeIgniter/Restapi/users/format/json')
		);
 
		print_r($users);
	}
	

	//Better use Curl
	// cURL
	// cURL is the most flexible way to interact with a REST API as it was designed for exactly this sort of thing. You can set HTTP headers, HTTP parameters and plenty more. Here is an example of how to update a user with our example_api and cURL to make a POST request:

	function native_curl()
	{
		$username = 'admin';
		$password = '1234';
			
		
		$curl_handle = curl_init();
		curl_setopt($curl_handle, CURLOPT_URL, 'http://localhost/all_scripts/CodeIgniter/Restapi/users');
		curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl_handle, CURLOPT_POST, 1);
		curl_setopt($curl_handle, CURLOPT_POSTFIELDS, array(
			'name' => $_POST['name'],
			'email' => $_POST['email']
		));
			
		// Optional, delete this line if your API is open
		curl_setopt($curl_handle, CURLOPT_USERPWD, $username . ':' . $password);
			
		$buffer = curl_exec($curl_handle);
		curl_close($curl_handle);
			
		$result = json_decode($buffer);		
		if(isset($result) && !empty($result))
		{
			echo 'User has been updated.';
			print_r($result);
		}
			
		else
		{
			echo 'Something has gone wrong';
		}
	}	
}
?>