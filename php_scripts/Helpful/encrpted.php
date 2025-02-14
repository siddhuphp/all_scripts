<?php

$string_to_encrypt = 'test';

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
	"nvTXTDpVorbYjkkQ0ZH6o7InKlc4ItLae6p23ikNFkicdZ4WREi9L3ClsrARju1o",
	"iWy9xQZ3wrqiB8TD5QDsDJpI/FEcHADxygt3i88m5hI=",
	"Yf3WJ3ohJQzQh/fcDwZYMiEDHa614Jqw1GFYZiiTan/1jPP5o7x5G+pYBzwOAZ+E",
	"nvTXTDpVorbYjkkQ0ZH6oz7aEZhjQjY6+u3DOuSQevc0dFT1R+dS1GrAbMFQtEIS9Yzz+aO8eRvqWAc8DgGfhA==",
	"nvTXTDpVorbYjkkQ0ZH6oxEyGT/297NPgYZ5b4GsgbCcdZ4WREi9L3ClsrARju1o",
	"lEQbM5jXBWFng5XlKvGIPvSi0ydXt6m72im01RmzGGg=",
	"LpF4et1S3cxv6bj04IlVyEa2qIUSdEEv2iJnBdS18XG35bnvPDn3C0BuclFBk9eT",
	"bb7JqwtYlD87hpB2g7QR7efgj15/mRyU6r54LDy85FsMeJi1U/QfPDzUFfCZLPtNrzzVZn6Yu+TU4/rf3YBL4A==",
	"xpezMvgxitksAX8/lgZNlC4eajNMS2D+b+vUXZe27Wk=",
	"YW4ga9XEV6E+4rbyM9OJrXFPtB295C5t/e/fu3PAj1A=",
	"oaMOEeqQXyyJKze3PXhqKxi7HLnHkDRSldzCL+SfThideApFVG7sXle33mFX7iNB",
	"U80/u89Laq9hCFjmeaeQgnFPtB295C5t/e/fu3PAj1A=",
	"vkCnncjQwSR3DHKDEMfEAroQRjbgihg+TW1m1P97XvI=",
	"CBfc1wCk4A5ZXySQOxR55zR7adRq7JPGl3fpPUfxJrk=",
	"N8TeyXAsly5aFfzWCl9Z+wu2Q/0dc/DNEJOsBLrfGXk=",
	"EgZfeFSFmqLEn3Czg9HydQ==",
	"F3Z/3ROLZnAA0ivDLlW8LZ+iwkd1EH2X2qNvIUJuD3Of+T9G/lrT01HRX7tw15E1",
	"Q8uuDtkL3luN2MbwJ5yDv+dBe3H6vuXJHusQQvr2W4Q=",
	"ZIgGLQqFwxl1yxKw0TdWmZW2MMXIJlANEaRFWTg5Q34=",
	"DfnOtS5/po9O4srw3HdogAAQvmVENwfBtUFp4ApXx60=",
	"8q8Ftp6pHbkIexAHhApbY/ha5tFviCApCyAwYNF+Oy0=",
	"Wadvv9KLz0A8KVLXzCps7+qoXFkQz8obZgkj6yL5ndk5ilQpMvkOKKX8bNw0DtoattTB34Htaf4Di3FRYmci1bu0N/lhUfLdNaDYo2qZwtKFZAM1JwbzqfnJSxH/ebxwtCyPdQPaBbkMPTDl8UrGC8r5rEfOY+D7QOShijpYrtGDoJjTGv/1s7saHaBX1Z/LC2iHqyqgL5Msj9ojT8V7BCAt2O2ldzaBBwoSOAmzFlsa4GzOfSoKrPml8gBr018F/aAW9B1JuqMuCwv3lzbd8A=="
];
echo "<br/>";
$password = "password";
foreach ($data as $d) {

	echo $d . "\n";
	echo "<br/>";
	echo openssl_decrypt($d, "AES-128-ECB", $password);
	echo "<br/>";
	echo "<br/>";
}
