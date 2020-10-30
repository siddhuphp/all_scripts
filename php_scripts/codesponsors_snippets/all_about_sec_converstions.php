<?php

    #Sec to decimal time convertion
    function sec_to_decimal($sec)
    {
        # Time to Decimal Conversion 
        $init = $sec;
        $hours = floor($init / 3600);
        $minutes = floor(($init / 60) % 60);
        $seconds = $init % 60;

        #coming to formula
        $hh = $hours * (1 / 1);
        $mm = $minutes / 60;
        $ss = $seconds / 3600;

        #so total hours in decimal
        $totalHours = $hh + $mm + $ss;
        return round($totalHours, 2);
    }

    #Sec to time convertion
    function convert_sec_to_hhmmss($second)
    {
        if(!is_numeric($second))
        {
            return "Wrong input";
        }
        $init = $second;
        $hours = floor($init / 3600);
        $minutes = floor(($init / 60) % 60);
        $seconds = $init % 60;
        $hours = ($hours < 10)?'0'.$hours:$hours;
        $minutes = ($minutes < 10)?'0'.$minutes:$minutes;
        $seconds = ($seconds < 10)?'0'.$seconds:$seconds;
        return "$hours:$minutes:$seconds";
    }


    #sec to mintute convertion
    function set_to_min($seconds)
    {
        if(!is_numeric($seconds))
        {
            return "Wrong input";
        }
        $minutes = floor($seconds/60);
        $secondsleft = $seconds%60;
        if($minutes<10)
        {
            $minutes = "0" . $minutes;
        }
           
        if($secondsleft<10)
        {
            $secondsleft = "0" . $secondsleft;
        }
           
        return "$minutes:$secondsleft Sec";
    }


    function sec_to_human_readable($secs)
    {
        $bit = array(
            'y' => $secs / 31556926 % 12,
            'w' => $secs / 604800 % 52,
            'd' => $secs / 86400 % 7,
            'h' => $secs / 3600 % 24,
            'm' => $secs / 60 % 60,
            's' => $secs % 60
            );
           
        foreach($bit as $k => $v)
            if($v > 0)$ret[] = $v . $k;
           
        return join(' ', $ret);
    }
       
    
    function sec_to_human_readable_with_names($secs)
    {
        $bit = array(
            ' year'        => $secs / 31556926 % 12,
            ' week'        => $secs / 604800 % 52,
            ' day'        => $secs / 86400 % 7,
            ' hour'        => $secs / 3600 % 24,
            ' minute'    => $secs / 60 % 60,
            ' second'    => $secs % 60
            );
           
        foreach($bit as $k => $v){
            if($v > 1)$ret[] = $v . $k . 's';
            if($v == 1)$ret[] = $v . $k;
            }
        array_splice($ret, count($ret)-1, 0, 'and');
        $ret[] = 'ago.';
       
        return join(' ', $ret);
    }


       
    #convert seconds to  days, hours, minutes and seconds
    function seconds_to_days($seconds) 
    {
        $dt1 = new DateTime("@0");
        $dt2 = new DateTime("@$seconds");
        return $dt1->diff($dt2)->format('%a days, %h hours, %i minutes and %s seconds');
    }
    
   
   
    echo "Seconds to Decimal ==>  ". sec_to_decimal(280000)."</br>";
    echo "Seconds to HH:MM:SS ==>  ". convert_sec_to_hhmmss(280000)."</br>";
    echo "Seconds to Minutes ==>  ". set_to_min(280000)."</br>";
    echo "Seconds to Human readable ==>  ". sec_to_human_readable(280000)."</br>";
    echo "Seconds to Human readable with names ==>  ". sec_to_human_readable_with_names(280000)."</br>";
    echo "Seconds to days, hours, minutes and seconds ==>  ". seconds_to_days(280000)."</br>";
   
    
?>