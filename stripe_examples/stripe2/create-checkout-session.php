<?php

require 'vendor/autoload.php';
\Stripe\Stripe::setApiKey('sk_test_51JQ7B5SIfuNF32jtkdbUfTJAhP3vCsdupOzS56XhktiuVQWfM3DuYjGJniCtHSGsRtQpy2qjM47Nc9HTv2RCE3h800MocsFaj8');

header('Content-Type: application/json');

$YOUR_DOMAIN = 'http://localhost/all_scripts/stripe_examples/stripe2';

$checkout_session = \Stripe\Checkout\Session::create([
  'payment_method_types' => [
    'card',
  ],
  'line_items' => [[
    # TODO: replace this with the `price` of the product you want to sell
    'price' => 'price_1JQR3JSIfuNF32jtDH7pu005',
    'quantity' => 1,
	'tax_rates' => [
      'txr_1JQR2NSIfuNF32jt0GP6pJjE',
      'txr_1JQTraSIfuNF32jtWyqKN7qu',
    ],	
  ]],  
  'mode' => 'payment',
  'success_url' => $YOUR_DOMAIN . '/public/success.html',
  'cancel_url' => $YOUR_DOMAIN . '/public/cancel.html',
]);

header("HTTP/1.1 303 See Other");
header("Location: " . $checkout_session->url);