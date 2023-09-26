<?php

$string_to_encrypt = "Test";

$password = "password";

$encrypted_string = openssl_encrypt($string_to_encrypt, "AES-128-ECB", $password);

$decrypted_string = openssl_decrypt($encrypted_string, "AES-128-ECB", $password);



echo $encrypted_string;

echo "<br/>";

echo $decrypted_string;

echo "<br/>";

$data = [
	"5LaezWyRG1QgkZ4RPycWxI27U4P2L9hPODXIMl5OsWU=",
	"9xwX9qGDrCn2I1ybTzTE2Dfc/bzsKAikTxDxzKfTI7+xFcI56G40laTf3tZk4Do/",
	"zGgxBB/lT/T7FzNJF9imrJA4VezlGtcRaO61l2pX9aFYAP05xZBJ4pV4y/RsfNUL",
	"zGgxBB/lT/T7FzNJF9imrJA4VezlGtcRaO61l2pX9aEeykkS0LaDPuCMpJ88diDG",
	"nvTXTDpVorbYjkkQ0ZH6o7InKlc4ItLae6p23ikNFkicdZ4WREi9L3ClsrARju1o",
	"iWy9xQZ3wrqiB8TD5QDsDJpI/FEcHADxygt3i88m5hI=",
	"Yf3WJ3ohJQzQh/fcDwZYMiEDHa614Jqw1GFYZiiTan/1jPP5o7x5G+pYBzwOAZ+E",
	"nvTXTDpVorbYjkkQ0ZH6oz7aEZhjQjY6+u3DOuSQevc0dFT1R+dS1GrAbMFQtEIS9Yzz+aO8eRvqWAc8DgGfhA==",
	"nvTXTDpVorbYjkkQ0ZH6oxEyGT/297NPgYZ5b4GsgbCcdZ4WREi9L3ClsrARju1o",
	"lEQbM5jXBWFng5XlKvGIPvSi0ydXt6m72im01RmzGGg=",
	"LpF4et1S3cxv6bj04IlVyEa2qIUSdEEv2iJnBdS18XG35bnvPDn3C0BuclFBk9eT"
];
echo "<br/>";
$password = "siddhu007700";
foreach ($data as $d) {

	echo $d . "\n";
	echo "<br/>";
	echo openssl_decrypt($d, "AES-128-ECB", $password);
	echo "<br/>";
	echo "<br/>";
}
