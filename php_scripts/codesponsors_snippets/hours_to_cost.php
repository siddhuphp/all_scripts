<?php
# Hours to cost Calculation
# My hour cost is = 200
# Suppose I consider total hours 03:20:45

# Formula $total_cost = ($amount_per_hour*($consumed_hours*3600 + $consumed_mins*60 + $consumed_secs))/3600;

$h = 3; $m = 20; $s = 45; 
$amount_per_hour = 200;
$consumed_hours = $h;
$consumed_mins = $m;
$consumed_secs = $s;

$total_cost = ($amount_per_hour*($consumed_hours*3600 + $consumed_mins*60 + $consumed_secs))/3600;


echo $total_cost;