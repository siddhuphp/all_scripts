<?php
// Set timezone
	date_default_timezone_set('UTC');
    function repeatEvent($startTime, $interval, $frequency, $endTime)
    {
     //make sure all paramters are valid
     $startTime = (int) $startTime;
     $endTime = (int) $endTime;
  if($startTime == 0)
      {
               user_error("repeatEvent(): invalid start time");
          return(FALSE);
       }
     
     if($endTime < $startTime)
       {
           user_error("repeatEvent(): invalid end time");
        }
            
     $interval = strtolower(trim($interval));
     if(!in_array($interval, array('day','week','month','year')))
       {
                 user_error("repeatEvent(): Invalid interval '$interval'");
                  return(FALSE);
           }
     $frequency = (int)$frequency;
    if($frequency < 1)
       {
                   user_error("repeatEvent(): Invalid frequency '$frequency'");
                   return(FALSE);
       }
     $schedule = array();
     for($time = $startTime; $time <= $endTime; $time = strtotime("+$frequency $interval", $time))
        {
              $schedule[] = $time;
        }
     return($schedule);
   }
   
   $start_date = "2020-10-10 04:05:00";
   $end_date = "2022-11-25 04:05:00";
   //$interval must be (case-insensitive): 'day', 'week', 'month', or 'year'
   $new_interval = 'day';
   // $frequency must be positive integer (1 = every, 2, = every other, 3 = every 3rd, 4 = every 4th. 5 = every 5th, 6 = every 6th)
   $new_frequency = 4;
   
   $sched = repeatEvent(strtotime($start_date), $new_interval, $new_frequency, strtotime($end_date));
//   echo "<pre>";
//   print_r($sched);
   
   foreach ($sched as $d)
   {
       echo date('d-M-Y h:i:s', $d).PHP_EOL;
   }
?>
                