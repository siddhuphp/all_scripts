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
	"bb7JqwtYlD87hpB2g7QR7Yo0AbfH05ZFHcMzFi29hGr1Rxb9UVC+Wq8pw9isXSGNxiR7MFKMlQZxa/Z0cQsfSQ==",
	"xpezMvgxitksAX8/lgZNlC4eajNMS2D+b+vUXZe27Wk=",
	"YW4ga9XEV6E+4rbyM9OJrXFPtB295C5t/e/fu3PAj1A=",
	"oaMOEeqQXyyJKze3PXhqKxi7HLnHkDRSldzCL+SfThideApFVG7sXle33mFX7iNB",
	"c/UveID86Ht9X9hBApTzi/VHFv1RUL5arynD2KxdIY3GJHswUoyVBnFr9nRxCx9J",
	"U80/u89Laq9hCFjmeaeQgnFPtB295C5t/e/fu3PAj1A=",
	"vkCnncjQwSR3DHKDEMfEAroQRjbgihg+TW1m1P97XvI=",
	"CBfc1wCk4A5ZXySQOxR55zR7adRq7JPGl3fpPUfxJrk=",
	"N8TeyXAsly5aFfzWCl9Z+wu2Q/0dc/DNEJOsBLrfGXk=",
	"EgZfeFSFmqLEn3Czg9HydQ==",
	"F3Z/3ROLZnAA0ivDLlW8LZ+iwkd1EH2X2qNvIUJuD3Of+T9G/lrT01HRX7tw15E1"
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
