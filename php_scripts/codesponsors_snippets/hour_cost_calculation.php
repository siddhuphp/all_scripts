<?php
    # Hours to cost Calculation
    # My hour cost is = 200
    # Suppose I consider total hours 03:20:45
    
    # 3 hours is 3 hours * (1 hour) = 3 hours
    # 20 minutes is 20 minutes * (60 minutes means (1 hour)) = 20/60 hours = 0.33 hours
    # 45 seconds is 45 seconds * (3600 seconds  means (1 hour)) = 45/3600 hours = 0.0125 hours
    # Adding them all together we have 3 hours + 0.33 hours + 0.0125 hours = 2.3425 hours
    # Formula $total_cost = ($amount_per_hour*($consumed_hours*3600 + $consumed_mins*60 + $consumed_secs))/3600;
    
    $h = 3; $m = 20; $s = 45; 
    $amount_per_hour = 200;
    $consumed_hours = $h;
    $consumed_mins = $m;
    $consumed_secs = $s;
    
    $total_cost = ($amount_per_hour*($consumed_hours*3600 + $consumed_mins*60 + $consumed_secs))/3600;
    
    
    echo "Total Cost: ". round($total_cost,2);
?>