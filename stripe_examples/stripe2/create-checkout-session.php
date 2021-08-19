<?php

require 'vendor/autoload.php';
\Stripe\Stripe::setApiKey('sk_test_51JQ7B5SIfuNF32jtkdbUfTJAhP3vCsdupOzS56XhktiuVQWfM3DuYjGJniCtHSGsRtQpy2qjM47Nc9HTv2RCE3h800MocsFaj8');

header('Content-Type: application/json');

$YOUR_DOMAIN = 'http://localhost/stripe2';

$checkout_session = \Stripe\Checkout\Session::create([
  'payment_method_types' => [
    'card',
  ],
  'line_items' => [[
    # TODO: replace this with the `price` of the product you want to sell
    'price' => 'price_1JQ9pmSIfuNF32jtxLTLzq2B',
    'quantity' => 1,
  ]],
  'automatic_tax' => [
    'enabled' => true,
  ],
  'mode' => 'payment',
  'success_url' => $YOUR_DOMAIN . '/public/success.html',
  'cancel_url' => $YOUR_DOMAIN . '/public/cancel.html',
]);

header("HTTP/1.1 303 See Other");
header("Location: " . $checkout_session->url);