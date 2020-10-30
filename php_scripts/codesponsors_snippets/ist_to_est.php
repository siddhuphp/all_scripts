<?php
 $dt = new DateTime('2011-02-22 16:15:20', new DateTimeZone('Asia/Kolkata'));
 echo "Indian time(IST): ".$dt->format('r') . PHP_EOL;
 
 $dt->setTimezone(new DateTimeZone('US/Eastern'));
 echo "US time(EST): ".$dt->format('r') . PHP_EOL;
 
 //Second example
 echo "2nd Example (UTC to IST)". PHP_EOL;
 $time = new DateTime('now', new DateTimeZone('UTC'));
    // then convert it to IST by
    $time->setTimezone(new DateTimeZone('IST'));
 echo $dt->format('r');
?>